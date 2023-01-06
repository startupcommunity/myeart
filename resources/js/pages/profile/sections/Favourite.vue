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
                    class="lg:border-r-2 lg:border-gray-800 lg:px-4 w-full lg:w-auto border-b border-b-gray-300 lg:border-b-0"
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
                <div
                    class="lg:border-r-2 lg:border-gray-800 lg:px-4 w-full lg:w-auto border-b border-b-gray-300 lg:border-b-0"
                >
                    <v-btn
                        text
                        depressed
                        block
                        class="uppercase tracking-wide"
                        :class="states.events ? 'font-bold' : 'font-light'"
                        @click.stop="changeType(TYPEFAV.events)"
                    >
                        Eventos
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
                        :class="states.collectives ? 'font-bold' : 'font-light'"
                        @click.stop="changeType(TYPEFAV.collectives)"
                    >
                        Colectivos
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
                        v-for="art in artists"
                        :key="art.id"
                        :artist="art"
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
                        v-for="(art, index) in artworks"
                        :key="art?.id"
                        :artwork="art"
                        class="w-full md:w-1/2 lg:w-1/2"
                        :class="index % 2 == 0 ? 'lg:pr-4' : 'lg:pl-4'"
                        :router-link="true"
                        classCard="min-h-[32rem] bg-gray-50"
                        v-else
                    />
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
                    <CardRelease
                        v-for="(release, index) in news"
                        :key="release.id"
                        :release="release"
                        :artist="release.creator"
                        :show-actions="false"
                        :showShortInfo="true"
                        :showArtist="true"
                        :show-comments="true"
                        class="w-full md:w-1/2"
                        :class="index % 2 == 0 ? 'lg:pr-4' : 'lg:pl-4'"
                        @showCommentDialog="activeCommentModal"
                        v-else
                    />

                    <!-- modal de comentarios -->
                    <ReleaseCommentsDialog
                        :show="showCommentDialog"
                        :releaseID="release?.id"
                        @close-comments="showCommentDialog = false"
                    />
                </div>
            </div>
            <!-- /publicaciones -->

            <!-- eventos -->
            <div class="py-6 w-full" v-if="states.events">
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch"
                >
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
                    <CardEvent
                        v-for="evt in events"
                        :key="evt.id"
                        :event="evt"
                        class="w-full animate-fade-in-down md:mb-10"
                        @interested="openReservationInfo"
                    />
                    <InfoReservationModal
                        :event="event"
                        :show="showReservation"
                        @close-info="showReservation = false"
                    />
                </div>
            </div>
            <!-- /eventos -->

            <!-- eventos -->
            <div class="py-6 w-full" v-if="states.collectives">
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch"
                >
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />
                    <CardCollective
                        v-for="col in collectives"
                        :key="col.id"
                        :collective="col.collective"
                        :follow-btn="true"
                        class="w-full animate-fade-in-down md:mb-10"
                    />
                </div>
            </div>
            <!-- /eventos -->
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
import CardRelease from "../components/CardRelease.vue";
import ReleaseCommentsDialog from "../../release/components/ReleaseCommentsDialog.vue";
import CardEvent from "../../event/components/CardEvent.vue";
import InfoReservationModal from "../../event/components/InfoReservationModal.vue";
import CardCollective from "../../collective/components/CardCollective.vue";

// cantidad de obras en aumento
let counterArtists = 4;

export default {
    name: "Artwork",
    components: {
        LoadingTailwind,
        CardArtist,
        CardArtwork,
        CardRelease,
        ReleaseCommentsDialog,
        CardEvent,
        InfoReservationModal,
        CardCollective,
    },
    mixins: [getDataMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            loading: false,
            showCommentDialog: false,
            showReservation: false,
            release: {},
            event: {},
            states: {
                artist: false,
                artwork: false,
                news: false,
                events: false,
                collectives: false,
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
        news() {
            return this.$store.getters.getFollowReleases || [];
        },
        events() {
            return this.$store.getters.getFollowEvents || [];
        },
        artists() {
            const data = this.$store.getters.getFollowArtists || [];

            // sacar los artistas  de following
            return data.map((item) => item.following);
        },
        collectives() {
            return this.$store.getters.getFollowCollectives || [];
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
            this.states.events = state === this.TYPEFAV.events;
            this.states.collectives = state === this.TYPEFAV.collectives;
        },

        /**
         * Activa el modal de comentarios
         *
         * @param {Object} release
         */
        activeCommentModal(release) {
            this.release = release;
            this.showCommentDialog = true;
        },

        /**
         * Activa el modal de info reservation
         *
         * @param {Object} event
         */
        openReservationInfo(event) {
            this.event = event;
            this.showReservation = true;
        },
    },
    watch: {
        showSection(val) {
            if (val) {
                this.$store.dispatch("userFollowArtists");
                this.$store.dispatch("userFollowArtworks");
                this.$store.dispatch("userFavoriteReleases");
                this.$store.dispatch("userFavoriteEvents");
                this.$store.dispatch("userFollowCollectives");
            }
        },
    },
};
</script>
