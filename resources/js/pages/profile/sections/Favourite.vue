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
                        @click.stop="changeType(TYPEFAV.artist)"
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
                        @click.stop="changeType(TYPEFAV.artwork)"
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
                        @click.stop="changeType(TYPEFAV.news)"
                    >
                        Noticias
                    </v-btn>
                </div>
            </div>

            <!-- artistas -->
            <div class="py-6 w-full" v-if="states.artist">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
                    <CardArtist
                        v-for="followArt in artists"
                        :key="followArt.id"
                        :artist="followArt.following"
                        class="md:w-1/2"
                        :router-link="true"
                        classCard="min-h-[32rem] bg-gray-50"
                        v-else
                    />
                </div>
            </div>
            <!-- /artistas -->

            <!-- obras -->
            <div class="py-6 w-full" v-if="states.artwork">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
                    <CardArtwork
                        v-for="(obj, index) in artworks"
                        :key="obj.artwork?.id"
                        :artwork="obj.artwork"
                        class="w-full md:w-1/2 lg:w-1/2"
                        :class="index % 2 == 0 ? 'lg:pr-4' : 'lg:pl-4'"
                        :router-link="true"
                        classCard="min-h-[32rem] bg-gray-50"
                        v-else
                    />
                    <!-- <CardArtwork
                        v-for="obj in artworks"
                        :key="3 + 1"
                        :artwork="obj.artwork"
                        class="w-full md:w-1/2"
                        :router-link="true"
                        classCard="min-h-[32rem] bg-gray-50"
                    /> -->
                </div>
            </div>
            <!-- /artistas -->

            <!-- publicaciones -->
            <div class="py-6 w-full" v-if="states.news">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
                </div>
            </div>
            <!-- /publicaciones -->
        </div>
    </div>
</template>
<script>
// componentes
import LoadingTailwind from "./../../../components/LoadingTailwind.vue";
import CardArtist from "./../components/CardArtist.vue";

// mixin
import getDataMixin from "./../../../mixins/getDataMixin";
import CardArtwork from "../../artwork/sections/CardArtwork.vue";

// cantidad de obras en aumento
let counterArtists = 4;

export default {
    name: "Artwork",
    components: { LoadingTailwind, CardArtist, CardArtwork },
    mixins: [getDataMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            loading: false,
            artists: [],
            // artworks: [],
            news: [],
            states: {
                artist: false,
                artwork: false,
                news: false,
            },
        };
    },
    mounted() {
        this.states.artist = true;
    },
    computed: {
        artworks() {
            return this.$store.getters.getFollowArtworks || [];
        },
    },
    methods: {
        /**
         * Filtrar obras según el estado recibido como parámetro
         *
         * @param Number state
         */
        changeType(state) {
            // activar la clase según el state
            this.states.artist = state === this.TYPEFAV.artist;
            this.states.artwork = state === this.TYPEFAV.artwork;
            this.states.news = state === this.TYPEFAV.news;
        },

        /**
         * Carga los artistas seguidos del usuario
         */
        loadArtist() {
            this.loading = true;
            this.axios
                .get(this.ep.user.getFollowArtists)
                .then((resp) => (this.artists = resp.data))
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Carga los obras favoritas del usuario
         */
        loadArtworks() {
            // this.artworks = this.$store.getters.getFollowArtworks || [];
            // console.log(this.artworks);
        },

        /**
         * Carga las publicaciones favoritas del usuario
         */
        loadNews() {
            this.news = [];
        },
    },
    watch: {
        showSection(val) {
            if (val) {
                // validar que mostrar
                if (this.states.artist) {
                    this.loadArtist();
                } else if (this.states.artwork) {
                    // this.loadArtworks();
                } else if (this.states.news) {
                    this.loadNews();
                }
            }
        },
    },
};
</script>
