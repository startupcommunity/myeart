<template>
    <div
        class="w-full sm:w-3/5 bg-white px-12 sm:py-20 h-full sm:h-screen animate-fade-in-down"
        id="obras"
        v-show="showSection"
    >
        <h3 class="font-black text-3xl tracking-tight uppercase text-gray-900">
            Obras
        </h3>
        <div class="mt-4 py-4 border-t border-gray-900"></div>
        <div class="flex flex-wrap">
            <div
                class="lg:border-r-2 lg:border-gray-800 lg:pr-4 w-full lg:w-auto"
            >
                <v-btn
                    text
                    depressed
                    block
                    class="uppercase font-bold tracking-wide"
                    @click.stop="filterToState(STATEARTWORK.published)"
                >
                    Publicadas
                </v-btn>
            </div>
            <div
                class="lg:border-r-2 lg:border-gray-800 lg:px-4 w-full lg:w-auto"
            >
                <v-btn
                    text
                    depressed
                    block
                    class="uppercase font-bold tracking-wide"
                    @click.stop="filterToState(STATEARTWORK.sold)"
                >
                    Vendidas
                </v-btn>
            </div>
            <div class="w-full lg:w-auto lg:px-4">
                <v-btn
                    text
                    depressed
                    block
                    class="uppercase font-bold tracking-wide"
                    @click.stop="filterToState(STATEARTWORK.draft)"
                >
                    Borradores
                </v-btn>
            </div>
        </div>
        <div class="py-6 w-full sm:w-3/5">
            <v-btn outlined block class="uppercase font-bold tracking-wide">
                <i class="fas fa-plus"></i>
                Subir obra
            </v-btn>
        </div>

        <!-- obras -->
        <div class="py-6 w-full">
            <div
                class="flex flex-wrap sm:overflow-y-auto h-full sm:h-[30rem] lg:h-[36rem] items-stretch"
            >
                <LoadingTailwind
                    v-if="loading"
                    css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                />
                <div
                    v-for="art in artworks"
                    :key="art.id"
                    class="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    v-else
                >
                    <div class="rounded-md shadow-md w-full">
                        <img
                            :src="art.galery[0].picture"
                            :alt="art.title"
                            class="object-cover object-center w-full rounded-t-md h-72"
                        />
                        <div
                            class="flex flex-col justify-between p-6 space-y-8 bg-gray-100"
                        >
                            <div class="space-y-2">
                                <h3
                                    class="text-3xl font-semibold tracking-wide text-gray-900"
                                >
                                    {{ art.title }}
                                </h3>
                                <p class="text-primary">
                                    {{ art.dimension }} {{ art.category.name }}
                                    {{ art.techniques[0].name }}
                                </p>
                                <div
                                    class="w-full border-t-2 border-gray-800 my-4"
                                ></div>
                                <p class="text-gray-900">
                                    {{ art.price }} {{ symbol }}
                                </p>
                            </div>
                            <div class="flex flex-wrap py-4">
                                <div class="w-full xl:w-1/2 mb-4 xl:px-4">
                                    <v-btn
                                        outlined
                                        block
                                        class="uppercase font-bold tracking-wide"
                                    >
                                        Editar
                                    </v-btn>
                                </div>
                                <div class="w-full xl:w-1/2 mb-4 xl:px-4">
                                    <v-btn
                                        outlined
                                        block
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
            </div>
        </div>
        <!-- /obras -->
    </div>
</template>
<script>
// componentes
import LoadingTailwind from "./../../../components/LoadingTailwind.vue";

// mixin
import getDataMixin from "./../../../mixins/getDataMixin";

export default {
    name: "Artwork",
    props: {
        showSection: {
            type: Boolean,
        },
    },
    components: { LoadingTailwind },
    mixins: [getDataMixin],
    data() {
        return {
            artworks: [],
            originalArtworks: [],
            symbol: "€",
            loading: false,
        };
    },
    methods: {
        /**
         * devuelve las obras del usuario logueado
         */
        getArtworks() {
            this.loading = true;
            this.axios
                .get("/api/artworks")
                .then((resp) => {
                    if (resp.status === 200) {
                        this.artworks = resp.data;
                        this.originalArtworks = resp.data;
                    }
                })
                .catch((error) => console.log(error))
                .finally((res) => (this.loading = false));
        },

        /**
         * Filtrar obras según el estado recibido como parámetro
         *
         * @param Number state
         */
        filterToState(state) {
            const artworks = this.originalArtworks.filter(
                (art) => art.state === state
            );
            this.artworks = artworks;
        },

        /**
         * Elimina de form saft una obra del usuario
         *
         * @params id Number
         */
        deleteArtwork(id) {
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
    },
    watch: {
        showSection(val) {
            if (val) {
                this.getArtworks();
            }
        },
    },
};
</script>
