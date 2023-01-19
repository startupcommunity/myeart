<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="obras"
        v-show="showSection"
    >
        <div class="sm:px-5">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-center block sm:hidden"> Mis Obras </span>
                <span class="text-left hidden sm:block"> Obras </span>
            </h3>
            <div
                class="mt-4 py-4 border-t border-gray-900 hidden sm:block"
            ></div>
            <div class="flex flex-wrap mt-4 sm:mt-0">
                <div
                    class="lg:border-r-2 lg:border-gray-800 lg:pr-4 w-full lg:w-auto border-b border-b-gray-300 lg:border-b-0"
                >
                    <v-btn
                        text
                        depressed
                        block
                        class="uppercase tracking-wide"
                        :class="stateActivePub ? 'font-bold' : 'font-light'"
                        @click.stop="filterToState(STATEARTWORK.published)"
                    >
                        Publicadas
                    </v-btn>
                </div>
                <div
                    class="lg:border-r-2 lg:border-gray-800 lg:px-4 w-full lg:w-auto border-b border-b-gray-300 lg:border-b-0"
                >
                    <v-btn
                        text
                        depressed
                        block
                        class="uppercase tracking-wide"
                        :class="stateActiveSold ? 'font-bold' : 'font-light'"
                        @click.stop="filterToState(STATEARTWORK.sold)"
                    >
                        Vendidas
                    </v-btn>
                </div>
                <div
                    class="w-full lg:w-auto lg:px-4 border-b border-b-gray-300 lg:border-b-0"
                >
                    <v-btn
                        text
                        depressed
                        block
                        class="uppercase tracking-wide"
                        :class="stateActiveDraft ? 'font-bold' : 'font-light'"
                        @click.stop="filterToState(STATEARTWORK.draft)"
                    >
                        Borradores
                    </v-btn>
                </div>
            </div>
            <div class="py-6 w-full sm:w-3/5">
                <router-link
                    class="uppercase btn btn-outline-dark btn-lg btn-block"
                    :to="{ name: 'createArtwork' }"
                >
                    <i class="fas fa-plus"></i>
                    Subir obra
                </router-link>
            </div>

            <!-- obras -->
            <div class="py-6 w-full">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
                    <div
                        v-for="(art, index) in artworks"
                        :key="art.id"
                        class="w-full md:w-1/2 mb-10 animate-swing-in-top-fwd"
                        :class="index % 2 == 0 ? 'sm:pr-8' : ''"
                        v-else
                    >
                        <div class="rounded-md shadow-md w-full">
                            <router-link :to="getPathDetailArtwork(art.id)">
                                <img
                                    :src="setPathGallery(art)"
                                    :alt="art.title"
                                    class="object-cover object-center w-full h-72"
                                />
                            </router-link>
                            <div
                                class="flex flex-col justify-between space-y-8 bg-gray-50"
                            >
                                <div class="space-y-2 px-2">
                                    <h3
                                        class="text-xl font-semibold tracking-wide text-gray-900 pt-3"
                                    >
                                        {{ art.title }}
                                    </h3>
                                    <p class="text-primary">
                                        {{ getDimensions(art) }}
                                        {{ setCategoryName(art.categories) }}
                                        {{ setSubCategory(art.labels) }}
                                    </p>
                                    <div
                                        class="w-full border-t-2 border-gray-800 my-4"
                                    ></div>
                                    <p class="text-gray-900">
                                        {{ art.price ?? 0 }} {{ symbol }}
                                    </p>
                                </div>
                                <div
                                    class="flex flex-wrap py-4 justify-between items-center px-2"
                                    v-if="art.state !== STATEARTWORK.sold"
                                >
                                    <div class="w-full xl:w-1/2 mb-4 xl:pr-2">
                                        <router-link
                                            class="uppercase font-bold tracking-wide border-[1.5px] border-gray-900 text-center px-9 h-11 flex min-w-full max-w-none justify-center items-center hover:animate-bg-gray-light text-black rounded-sm"
                                            id="btn-edit"
                                            :to="getPathEditArtwork(art.id)"
                                        >
                                            Editar
                                        </router-link>
                                    </div>
                                    <div class="w-full xl:w-1/2 mb-4 xl:pl-2">
                                        <v-btn
                                            outlined
                                            block
                                            large
                                            class="uppercase font-bold tracking-wide"
                                            @click.stop="deleteArtwork(art.id)"
                                        >
                                            Eliminar
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="w-full text-center"
                        v-if="remainingArtworks.length"
                    >
                        <button
                            class="w-auto px-6 py-3 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                            type="button"
                            @click.stop="showMoreArtworks(SHOW_ARTWORKS)"
                        >
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
            <!-- /obras -->
        </div>
    </div>
</template>
<script>
// componentes
import LoadingTailwind from "./../../../components/LoadingTailwind.vue";

// mixin
import getDataMixin from "./../../../mixins/getDataMixin";

// cantidad de obras en aumento
let counterArtworks = 4;

export default {
    name: "Artwork",
    components: { LoadingTailwind },
    mixins: [getDataMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            symbol: "€",
            loading: false,
            stateActivePub: false,
            stateActiveSold: false,
            stateActiveDraft: false,
            artworks: [],
            originalArtworks: [],
            remainingArtworks: [],
            loadState: [
                {
                    published: false,
                    sold: false,
                    draft: false,
                },
            ],
        };
    },

    computed: {
        /**
         * Obtiene el estado que se encuentra en true
         * puede ser publicado, vendido o borrador
         */
        getStateActive() {
            if (this.stateActivePub) {
                return this.STATEARTWORK.published;
            }

            if (this.stateActiveSold) {
                return this.STATEARTWORK.sold;
            }

            if (this.stateActiveDraft) {
                return this.STATEARTWORK.draft;
            }
        },
    },

    methods: {
        /**
         * devuelve las obras del usuario logueado
         */
        getArtworks() {
            this.loading = true;
            return this.axios
                .get("/api/artworks")
                .then(async (resp) => {
                    if (resp.status === 200) {
                        // datos originales
                        this.originalArtworks = await JSON.parse(
                            JSON.stringify(resp.data)
                        );

                        // cargar y solo mostrar 3
                        this.artworks = await resp.data;
                        const remaining = this.artworks.splice(counterArtworks);

                        // obras restantes
                        this.loadRemainingArtworks(remaining);
                    }
                })
                .then((_) => this.filterToState(this.getStateActive))
                .catch((error) => console.log(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Filtrar obras según el estado recibido como parámetro
         *
         * @param Number state
         */
        filterToState(state) {
            counterArtworks = 4;

            // activar la clase según el state
            this.stateActivePub = state === this.STATEARTWORK.published;
            this.stateActiveSold = state === this.STATEARTWORK.sold;
            this.stateActiveDraft = state === this.STATEARTWORK.draft;

            // filtrar por estado
            const artworks = this.originalArtworks.filter(
                (art) => art.state === state
            );

            // tomar las restantes
            this.artworks = artworks;
            const remaining = this.artworks.splice(counterArtworks);

            this.loadRemainingArtworks(remaining);
            this.changeStateArtwork(state);
        },

        /**
         * Cambia el valor de un estado según el
         * estado recibido, esto para manipular
         * los filtro para cada caso especifico
         *
         * STATEARTWORK: ubicado en mixin
         */
        changeStateArtwork(state = 0) {
            const states = this.loadState[0];
            states.draft = this.STATEARTWORK.draft === state;
            states.published = this.STATEARTWORK.published === state;
            states.sold = this.STATEARTWORK.sold === state;
        },

        /**
         * Path completo de galeria
         */
        setPathGallery(artwork) {
            if (!artwork.gallery.length) return this.getURLDefaultFrontArtwork;

            const front_page = artwork.gallery.filter(
                (pic) => pic.front_page === 1
            );

            return `${this.pathArtworkGallery + front_page[0]?.picture}`;
        },

        /**
         * Setear el nombre de una categoría de una obra
         */
        setCategoryName(categories) {
            return categories.length ? categories[0].name : "";
        },

        /**
         * Setear el nombre de una técnica de una obra
         */
        setSubCategory(labels) {
            return labels.length ? labels[0].name : "";
        },

        /**
         * Va mostrando en cantidad($count) las obras cargadas
         * - solo para mobile
         */
        showMoreArtworks(count) {
            // counter de obras +3
            counterArtworks += count;

            // obras originales
            const originalData = JSON.parse(
                JSON.stringify(this.originalArtworks)
            );

            // estado seleccionado
            // si huno algún filtro seleccionado
            const states = this.loadState[0];
            if (states.published || states.sold || states.draft) {
                const state = states.published ? 1 : states.sold ? 2 : 3;
                const data = originalData.filter((art) => art.state === state);
                const remaining = data.splice(counterArtworks);
                this.artworks = data;

                this.loadRemainingArtworks(remaining);
                return;
            }

            // si no el proceso ocurre general - sin filtros
            const remaining = originalData.splice(counterArtworks);
            this.artworks = originalData;

            this.loadRemainingArtworks(remaining);
        },

        /**
         * Cargar las obras restantes cada vez que se actualiza
         * la lista de obras por medio de algún evento
         */
        loadRemainingArtworks(remaining) {
            this.remainingArtworks = remaining;
        },

        /**
         * Elimina de form saft una obra del usuario
         *
         * @params id Number
         */
        deleteArtwork(id) {
            console.log(this.getStateActive);
            this.$swal
                .fire({
                    title: "¿Desea eliminar definitivamente?",
                    text: "Esta opción no se puede revertir.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar",
                    cancelButtonText: "Cancelar",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        const endpoint = `/api/artworks/delete/${id}`;
                        this.axios
                            .post(endpoint, { _method: "delete" })
                            .then((res) => {
                                if (res.status === 200) {
                                    this.$notify({
                                        group: "container",
                                        text: "Obra eliminada con éxito.",
                                        type: "success",
                                    });

                                    // cargar obras
                                    this.getArtworks();
                                }
                            })
                            .catch((error) => console.error(error));
                    }
                });
        },

        /**
         * Devuelve los datos al estado original
         */
        resetData() {
            this.artworks = [];
            this.originalArtworks = [];
            this.remainingArtworks = [];
            counterArtworks = this.SHOW_ARTWORKS;
        },

        /**
         * Devuelve las dimensiones de la obra
         */
        getDimensions(artwork) {
            const width = artwork.width ?? 0;
            const large = artwork.large ?? 0;
            return `${width + "X" + large + " " + this.artSize}`;
        },

        /**
         * Devuelve el path del detalle de la obra
         */
        getPathDetailArtwork(id) {
            return {
                name: "showArtwork",
                params: { id },
            };
        },

        /**
         * Devuelve el path paras editar la obra
         */
        getPathEditArtwork(id) {
            return {
                name: "editArtwork",
                params: { id },
            };
        },
    },
    watch: {
        showSection(val) {
            if (val) {
                this.stateActivePub = true;
                this.resetData();
                this.getArtworks();
            }
        },
    },
};
</script>
<style scoped>
.v-application a {
    color: #0f0f0f !important;
}
.v-application a:hover {
    color: #fefefe !important;
}

#btn-edit {
    color: #0f0f0f !important;
}

#btn-edit:hover {
    color: #0f0f0f !important;
    text-decoration: none;
}
</style>
