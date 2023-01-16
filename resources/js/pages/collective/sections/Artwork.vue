<template>
    <section class="animate-fade-in-down">
        <!-- title -->
        <div
            class="flex flex-col md:flex-row md:justify-between items-center border-b border-zinc-800 pb-5 gap-5"
        >
            <h3 class="text-lg md:text-3xl text-zinc-900 font-bold">
                Obras del colectivo
            </h3>
            <v-btn
                color="#B2794C"
                @click.stop="goToCreate"
                outlined
                large
                v-if="isCreatorOrMember"
            >
                <i class="fas fa-plus"></i> Agregar obra
            </v-btn>
        </div>
        <!-- /title -->

        <!-- filtro -->
        <div class="flex items-center justify-end" v-if="isOwner">
            <span
                class="uppercase text-zinc-900 tracking-widest text-xs font-bold w-full text-right"
            >
                Filtrar por:
            </span>
            <v-select
                :items="options"
                item-text="text"
                item-value="val"
                color="#B2794C"
                item-color="brown darken-2"
                class="pl-2"
                v-model="option"
            ></v-select>
        </div>
        <!-- /filtro -->

        <!-- listado de obras -->
        <div class="py-8 py-md-0 pb-md-10" v-if="artworks.length">
            <LoadingTailwind v-if="globalLoading" />
            <div
                class="grid grid-cols-1 md:grid-cols-2 xl:md:grid-cols-3 gap-5 py-5"
                v-else
            >
                <CardArtwork
                    v-for="art in artworks"
                    :key="art.id"
                    :artwork="art"
                    :type="2"
                    :collectiveID="collective.id"
                    :showButtonEdit="canEdit(art)"
                    :showButtonDelete="canDelete(art)"
                    @deleted="getArtworks"
                />
            </div>

            <!-- show more -->
            <div
                class="flex flex-col items-center justify-center"
                v-if="artworks.length < original.length"
            >
                <v-btn
                    color="grey darken-4"
                    @click.stop="showMore"
                    depressed
                    large
                    class="text-white"
                >
                    <i class="fas fa-plus"></i> Ver más obras
                </v-btn>
            </div>
        </div>

        <!-- no hay obras -->
        <div class="py-8 py-md-0 py-md-10" v-else>
            <div class="flex flex-col items-center justify-center">
                <h3 class="text-lg md:text-3xl text-zinc-900 font-bold">
                    No hay obras para mostrar
                </h3>
            </div>
        </div>
        <!-- /no hay obras -->
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardArtwork from "../components/CardArtwork.vue";

const INIT_ARTWORK = 9;
const ADD_ARTWORK = 3;

export default {
    name: "ArtworkSectionCollective",
    components: { LoadingTailwind, CardArtwork },
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            option: 1,
            artworks: [],
            original: [],
            options: [
                { text: "Todas", val: 1 },
                { text: "Solo mías", val: 2 },
                { text: "Miembros", val: 3 },
            ],
        };
    },

    mounted() {
        this.getArtworks();

        // scroll top
        window.scrollTo(0, 0);
    },

    computed: {
        creatorID() {
            return this.collective?.user_id || 0;
        },
        members() {
            return this.collective?.members || [];
        },
        user() {
            return this.$store.getters.getProfile;
        },
        isOwner() {
            return this.creatorID === this.user?.id;
        },

        /**
         * verifica si el usuario es el creador del colectivo
         * o si es miembro del colectivo
         */
        isCreatorOrMember() {
            return (
                this.isOwner ||
                this.members.some((m) => m.user_id === this.user?.id)
            );
        },
    },

    watch: {
        option(val) {
            this.getFilterArtworks();
        },
    },

    methods: {
        /**
         * Devuelve las obras del colectivo
         */
        getArtworks() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.collectives.artworks + this.collective.id)
                .then((res) => {
                    this.original = JSON.parse(JSON.stringify(res.data));
                    this.artworks = this.original.slice(0, INIT_ARTWORK);
                })
                .catch((err) => this.manageError(err))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Devuelve las obras del colectivo filtradas por las opciones
         */
        getFilterArtworks() {
            this.globalLoading = true;

            const params = {
                option: this.option,
                user_id: this.user?.id || 0,
            };

            const ep = this.ep.collectives.filterArtworks + this.collective.id;

            this.axios
                .get(ep, { params })
                .then((res) => {
                    this.original = JSON.parse(JSON.stringify(res.data));
                    this.artworks = this.original.slice(0, INIT_ARTWORK);
                })
                .catch((err) => this.manageError(err))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * LLeva a la vista de creación de obras
         */
        goToCreate() {
            this.$router.push({
                name: "createArtwork",
                params: { type: 2, collectiveID: this.collective.id },
            });
        },

        /**
         * Muestra mas obras
         */
        showMore() {
            const total = this.artworks.length + ADD_ARTWORK;
            this.artworks = this.original.slice(0, total);
        },

        /**
         * Si el usuario puedo editar una obra
         * para editar la obra debe ser el creador de la obra
         *
         * @param {Object} artwork
         */
        canEdit(artwork) {
            return artwork.user_id === this.user?.id;
        },

        /**
         * Si el usuario puedo eliminar una obra
         * para eliminar la obra debe ser el creador de la obra
         * o el creador del colectivo
         *
         * @param {Object} artwork
         */
        canDelete(artwork) {
            return (
                artwork.user_id === this.user?.id ||
                this.creatorID === this.user?.id
            );
        },
    },
};
</script>
