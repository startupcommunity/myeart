<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 sm:min-h-[43rem] h-full animate-fade-in-down"
        id="favoritos"
        v-show="showSection"
    >
        <div class="sm:px-5">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-left hidden sm:block"> Mis Favoritos </span>
                <span class="text-center block sm:hidden"> Favoritos </span>
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
                        @click.stop="filterToState(TYPEFAV.artist)"
                    >
                        Artistas
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
                        @click.stop="filterToState(TYPEFAV.artwork)"
                    >
                        Obras
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
                        @click.stop="filterToState(TYPEFAV.news)"
                    >
                        Noticias
                    </v-btn>
                </div>
            </div>

            <!-- obras -->
            <div class="py-6 w-full">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
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
    methods: {
        /**
         * Filtrar obras según el estado recibido como parámetro
         *
         * @param Number state
         */
        filterToState(state) {
            counterArtworks = 4;

            // activar la clase según el state
            // this.stateActivePub = state === this.TYPEFAV.published;
            // this.stateActiveSold = state === this.TYPEFAV.sold;
            // this.stateActiveDraft = state === this.TYPEFAV.draft;

            // filtrar por estado
            // const artworks = this.originalArtworks.filter(
            //     (art) => art.state === state
            // );

            // // tomar las restantes
            // this.artworks = artworks;
            // const remaining = this.artworks.splice(counterArtworks);

            // this.loadRemainingArtworks(remaining);
            // this.changeStateArtwork(state);
        },
    },
    watch: {
        showSection(val) {
            if (val) {
            }
        },
    },
};
</script>
