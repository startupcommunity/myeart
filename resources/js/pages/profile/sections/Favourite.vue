<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="fav"
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
                        :class="states.artist ? 'font-bold' : 'font-light'"
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
                        :class="states.artwork ? 'font-bold' : 'font-light'"
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
                        :class="states.news ? 'font-bold' : 'font-light'"
                        @click.stop="filterToState(TYPEFAV.news)"
                    >
                        Noticias
                    </v-btn>
                </div>
            </div>

            <!-- artistas -->
            <div class="py-6 w-full">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
                    <CardArtist
                        v-for="followArt in following_artists"
                        :key="followArt.id"
                        :artist="followArt.following"
                        class="md:w-1/2"
                    />
                </div>
            </div>
            <!-- /artistas -->
        </div>
    </div>
</template>
<script>
// componentes
import LoadingTailwind from "./../../../components/LoadingTailwind.vue";
import CardArtist from "./../components/CardArtist.vue";

// mixin
import getDataMixin from "./../../../mixins/getDataMixin";

// cantidad de obras en aumento
let counterArtists = 4;

export default {
    name: "Artwork",
    components: { LoadingTailwind, CardArtist },
    mixins: [getDataMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            loading: false,
            states: {
                artist: false,
                artwork: false,
                news: false,
            },
            following_artists: [],
            originalArtists: [],
            remainingArtists: [],
        };
    },
    methods: {
        /**
         * Filtrar obras según el estado recibido como parámetro
         *
         * @param Number state
         */
        filterToState(state) {
            counterArtists = 4;

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

        /**
         * Carga los artistas seguidos del usuario
         */
        loadArtist() {
            this.loading = true;
            this.axios
                .get(this.ep.user.getFollowArtists)
                .then((resp) => (this.following_artists = resp.data))
                .catch((error) => console.error(error))
                .finally(() => (this.loading = false));
        },
    },
    watch: {
        showSection(val) {
            if (val) {
                this.loadArtist();
            }
        },
    },
};
</script>
