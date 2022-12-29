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

        <!-- no hay miembros -->
        <div
            v-if="!members.length"
            class="flex flex-col items-center justify-center py-5"
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
            <div class="flex justify-center w-full">
                <v-text-field
                    label="Buscar miembro de este colectivo"
                    filled
                    color="#B2794C"
                ></v-text-field>
                <button
                    class="bg-app-brown-1 hover:text-gray-100 px-5 rounded-tr-md rounded-br-md h-14"
                    @click.stop=""
                >
                    <i class="fas fa-search text-white"></i>
                </button>
            </div>

            <LoadingTailwind v-if="globalLoading" />
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-5 py-5"
                v-else
            ></div>

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
import AddMemberModal from "../components/AddMemberModal.vue";

export default {
    name: "ReleaseCollective",
    components: { LoadingTailwind, AddMemberModal },
    mixins: [utilMixin],
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
        profile: {
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
        };
    },

    // created() {
    //     this.getReleasesAccordingToUser();
    // },

    computed: {
        likes() {
            return this.collective?.likes?.length || 0;
        },
        followers() {
            return this.collective?.followers?.length || 0;
        },
        // members() {
        //     return this.collective?.members || [];
        // },
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

    watch: {
        // option(val) {
        //     this.getFilterReleases(val);
        // },
    },

    methods: {
        /**
         * carga las publicaciones del creador del colectivo
         * y de los miembros del colectivo
         */
        // getFilterReleases() {
        //     this.showDialog = false;
        //     this.globalLoading = true;
        //     const path = this.ep.collectives.getReleaseByOption;
        //     const ep = path + this.collective.id;
        //     const val = option || this.option;
        //     const params = {
        //         params: { option: val, creatorID: this.creatorID },
        //     };

        //     this.axios
        //         .get(ep, params)
        //         .then((resp) => {
        //             this.original = JSON.parse(JSON.stringify(resp.data));
        //             this.releases = resp.data.slice(0, INIT_RELEASES);
        //         })
        //         .catch((error) => this.manageError(error))
        //         .finally(() => (this.globalLoading = false));
        // },

        /**
         * Muestra más publicaciones
         */
        showMore() {},
    },
};
</script>
