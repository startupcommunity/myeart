<template>
    <section class="animate-fade-in-down">
        <!-- title -->
        <div
            class="flex flex-col md:flex-row md:justify-between items-center border-b border-zinc-800 pb-5 gap-5"
        >
            <h3 class="text-lg md:text-3xl text-zinc-900 font-bold">
                Integrantes del colectivo
            </h3>
            <v-btn
                color="#B2794C"
                @click.stop="showModal = true"
                outlined
                large
            >
                <i class="fas fa-plus"></i> Agregar miembro
            </v-btn>
        </div>
        <!-- /title -->

        <!-- search -->
        <div class="flex justify-center w-full mt-5">
            <v-text-field
                label="Buscar miembro de este colectivo"
                filled
                color="#B2794C"
                @input="search"
            ></v-text-field>
        </div>
        <!-- /search -->

        <!-- no hay miembros -->
        <div
            v-if="!members.length && !searchVal.length"
            class="flex flex-col items-center justify-center py-5 md:mt-20"
        >
            <p class="text-lg md:text-3xl text-zinc-900 font-bold text-center">
                Aun no ha agregado miembros a su colectivo
            </p>
            <p
                class="text-lg md:text-3xl text-zinc-900 font-extra-light text-center"
            >
                ¿Por qué no empieza ahora?
            </p>
            <v-btn
                color="#B2794C"
                @click.stop="showModal = true"
                outlined
                large
            >
                <i class="fas fa-plus"></i> Agregar miembro
            </v-btn>
        </div>

        <!-- listado de miembros -->
        <div class="py-8 py-md-0 pb-md-10" v-else>
            <!-- artist -->
            <LoadingTailwind v-if="globalLoading" />
            <div
                class="grid grid-cols-1 md:grid-cols-2 xl:md:grid-cols-4 gap-5 py-5"
                v-else
            >
                <CardArtist
                    v-for="m in members"
                    :key="m?.id"
                    :artist="m?.user"
                    :routerLink="true"
                    :showButtonDeleteCollective="isOwner"
                    @remove-from-collective="removeMember"
                />
            </div>

            <!-- show more -->
            <div
                class="flex flex-col items-center justify-center"
                v-if="members.length < original.length"
            >
                <v-btn
                    color="grey darken-4"
                    @click.stop="showMore"
                    depressed
                    large
                    class="text-white"
                    v-if="!searchVal.length"
                >
                    <i class="fas fa-plus"></i> Ver más integrantes
                </v-btn>
            </div>
        </div>
        <!-- /listado de publicaciones -->

        <!-- modal add miembro -->
        <AddMemberModal
            :show="showModal"
            :collectiveID="collective.id"
            @close="showModal = false"
        />
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import utilMixin from "../../../mixins/utilMixin";
import CardArtist from "../../profile/components/CardArtist.vue";
import AddMemberModal from "../components/AddMemberModal.vue";

const INIT_ARTIST = 4;
const ADD_ARTIST = 4;

export default {
    name: "ReleaseCollective",
    components: { LoadingTailwind, AddMemberModal, CardArtist },
    mixins: [utilMixin],
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            showModal: false,
            members: [],
            original: [],
            member: {},
            searchVal: "",
        };
    },

    computed: {
        likes() {
            return this.collective?.likes?.length || 0;
        },
        followers() {
            return this.collective?.followers?.length || 0;
        },
        creatorID() {
            return this.collective?.user_id || 0;
        },
        user() {
            return this.$store.getters.getProfile;
        },
        isOwner() {
            return this.creatorID === this.user?.id;
        },
    },

    created() {
        this.getMembers();
    },

    mounted() {
        window.scrollTo(0, 0);
    },

    methods: {
        /**
         * carga las publicaciones del creador del colectivo
         * y de los miembros del colectivo
         */
        getMembers() {
            this.globalLoading = true;
            const collectiveID = this.collective.id;

            this.axios
                .get(this.ep.collectives.members + collectiveID)
                .then((res) => {
                    this.original = JSON.parse(JSON.stringify(res.data));
                    this.members = this.original.slice(0, INIT_ARTIST);
                })
                .catch((err) => this.manageError(err))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Elimina un miembro del colectivo
         *
         * @param {Object} member
         */
        removeMember(member) {
            const dialog = this.confirmedDialog({
                title: "¿Está seguro?",
                text: "Se eliminará al miembro del colectivo",
                confirmText: "Eliminar",
                confirmColor: "red",
            });

            dialog.then((res) => {
                if (res.isConfirmed) {
                    this.globalLoading = true;
                    const data = {
                        collective_id: this.collective.id,
                        user_id: member.id,
                    };

                    this.axios
                        .post(this.ep.collectives.removeMember, data)
                        .then((resp) => {
                            if (resp.status !== 200) {
                                this.noty(
                                    "No se pudo eliminar el miembro",
                                    "error"
                                );
                                return;
                            }

                            this.members = this.members.filter(
                                (m) => m.user.id !== member.id
                            );
                            this.original = this.original.filter(
                                (m) => m.user.id !== member.id
                            );

                            this.notySwal({
                                title: "Eliminado",
                                text: "El miembro fue eliminado del colectivo",
                            });

                            this.$store.dispatch(
                                "getUserCollective",
                                this.collective.id
                            );
                        })
                        .catch((err) => this.manageError(err))
                        .finally(() => (this.globalLoading = false));
                }
            });
        },

        /**
         * Busca un miembro del colectivo
         *
         * @param {String} val
         */
        search(val) {
            const text = val.toString().toLowerCase();
            this.searchVal = val;

            if (text.length > 0) {
                this.members = this.original.filter((m) => {
                    const user = m.user;
                    return user.name.toLowerCase().includes(text);
                });
            } else {
                this.members = JSON.parse(JSON.stringify(this.original));
            }
        },

        /**
         * Muestra más publicaciones
         */
        showMore() {
            const start = this.members.length;
            const end = start + ADD_ARTIST;
            this.members = this.original.slice(0, end);
        },
    },
};
</script>
