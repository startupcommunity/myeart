<template>
    <MainLayout :showHeader="false" :loadingOverlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32" v-if="isModalClose">
            <Header class="mt-5" />
        </div>

        <CreateReleaseSection
            @open-modal-create-release="isModalClose = false"
            @close-modal-create-release="isModalClose = true"
        />

        <!-- section title -->
        <Title :hashtag="hashtag" />

        <!-- section filters -->
        <Filters @filters="getReleaseFollowArtists" />

        <!-- content -->
        <section class="bg-white">
            <div class="container pt-5 pb-20">
                <div class="flex flex-wrap justify-between items-start">
                    <!-- eventos -->
                    <div class="w-full md:w-1/4 hidden md:block">
                        <h3 class="text-zinc-900 font-bold text-base uppercase">
                            Eventos
                        </h3>
                        <div class="flex flex-col py-5 mt-3">
                            <div v-if="events.length">
                                <CardEvent
                                    v-for="event in events"
                                    :key="event.id"
                                    :event="event"
                                    class="w-full animate-fade-in-down md:mb-8"
                                    @interested="openReservationInfo"
                                />
                                <InfoReservationModal
                                    :event="event"
                                    :show="showReservation"
                                    @close-info="showReservation = false"
                                />
                            </div>
                            <div v-else>
                                <span class="text-zinc-400 text-sm">
                                    No hay eventos próximos
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- /eventos -->

                    <!-- publicaciones -->
                    <div class="w-full md:w-1/2 px-5">
                        <div class="flex flex-col -mt-5 pb-5 md:px-10">
                            <div v-if="releases.length">
                                <CardRelease
                                    v-for="release in releases"
                                    :key="release.id"
                                    :release="release"
                                    :artist="release?.creator"
                                    :showArtist="true"
                                    :showCompleteInfo="true"
                                    :showShortInfo="false"
                                    :show-actions="false"
                                    class="mb-5"
                                    @showCommentDialog="activeCommentDialog"
                                />

                                <div
                                    class="py-5 flex justify-center"
                                    v-if="isMoreReleasesToShow"
                                >
                                    <button
                                        class="bg-zinc-900 px-5 py-3 uppercase text-gray-50 hover:animate-shadow-and-color-app rounded text-sm"
                                        @click="showMoreReleases"
                                    >
                                        Ver más publicaciones
                                    </button>
                                </div>
                            </div>
                            <div v-else class="md:pt-5">
                                <span class="text-zinc-400 text-sm">
                                    No hay publicaciones de tus amigos para
                                    mostrar
                                </span>
                            </div>
                            <LoadingTailwind
                                v-if="loadingReleases"
                                class="pt-3"
                            />
                        </div>
                    </div>
                    <!-- /publicaciones -->

                    <!-- artistas -->
                    <div class="w-full md:w-1/4 hidden md:block">
                        <h3 class="text-zinc-900 font-bold text-base uppercase">
                            Artistas que te pueden interesar
                        </h3>
                        <div class="flex flex-col space-y-5 mt-3">
                            <div v-if="artists.length">
                                <MiniCardArtist
                                    v-for="artist in artists"
                                    :key="artist.id"
                                    :artist="artist"
                                />
                            </div>
                            <div v-else>
                                <span class="text-zinc-400 text-sm">
                                    No hay artistas que te puedan interesar
                                </span>
                            </div>
                        </div>
                        <div>
                            <v-btn> Enviar mensaje </v-btn>
                        </div>
                    </div>
                    <!-- /artistas -->
                </div>
            </div>
        </section>

        <!-- modal de comentarios de las publicaciones -->
        <ReleaseCommentsDialog
            :show="show"
            :releaseID="release.id"
            @close-comments="show = false"
        />
    </MainLayout>
</template>
<script>
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Title from "./sections/index/Title.vue";
import Filters from "./sections/index/Filters.vue";
import MiniCardArtist from "./components/MiniCardArtist.vue";
import ReleaseCommentsDialog from "../release/components/ReleaseCommentsDialog.vue";
import CardRelease from "../profile/components/CardRelease.vue";
import CardEvent from "../event/components/CardEvent.vue";
import InfoReservationModal from "../event/components/InfoReservationModal.vue";
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import CreateReleaseSection from "./sections/index/CreateReleaseSection.vue";

const MAX_EVENTS = 3;
const RANDOM_ARTIST = 6;
const MAX_INIT_RELEASES = 4;
const SHOW_MORE_RELEASES = 2;

export default {
    name: "Index",
    components: {
        MainLayout,
        Header,
        Title,
        Filters,
        CardEvent,
        MiniCardArtist,
        ReleaseCommentsDialog,
        CardRelease,
        CardEvent,
        InfoReservationModal,
        LoadingTailwind,
        CreateReleaseSection,
    },
    data() {
        return {
            events: [],
            artists: [],
            releases: [],
            original: [],
            release: {},
            event: {},
            showReservation: false,
            loading: false,
            loadingReleases: false,
            show: false,
            isModalClose: true,
            hashtag: "",
        };
    },
    created() {
        const filters = { sortBy: 1 };
        this.getEvents();
        this.getRandomArtists();
        this.getReleaseFollowArtists(filters);
    },
    computed: {
        user() {
            return this.$store.getters.getProfile;
        },
        isMoreReleasesToShow() {
            return this.releases.length < this.original.length;
        },
    },
    methods: {
        /**
         * Obtiene los Artistas de forma random
         */
        getRandomArtists() {
            this.loading = true;
            this.axios
                .get(this.ep.user.getRandomArtists)
                .then(async (resp) => (this.artists = await resp.data))
                .then(() => this.artists.slice(0, RANDOM_ARTIST))
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Obtiene los publicaciones de los artistas seguidos
         */
        getReleaseFollowArtists(filters = null) {
            // si se esta indicando un hashtag en la url
            if (this.$route.params.hashtag) {
                filters.hashtag = this.$route.params.hashtag;
                this.hashtag = this.$route.params.hashtag;
            }

            this.loadingReleases = true;
            this.axios
                .get(this.ep.releases.followArtists, { params: filters })
                .then(async (resp) => {
                    // si la respuesta es un objeto, se convierte a array
                    if (typeof resp.data === "object") {
                        resp.data = Object.values(resp.data);
                    }

                    this.releases = resp.data.slice(0, MAX_INIT_RELEASES);
                    this.original = JSON.parse(JSON.stringify(await resp.data));
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loadingReleases = false));
        },

        /**
         * Obtiene los eventos
         */
        getEvents() {
            this.loading = true;

            this.axios
                .get(this.ep.events.getAll, { params: { sortBy: 1 } })
                .then((resp) => {
                    this.events = resp.data.slice(0, MAX_EVENTS);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Muestra más publicaciones
         */
        showMoreReleases() {
            const backup = JSON.parse(JSON.stringify(this.original));
            const add = this.releases.length + SHOW_MORE_RELEASES;
            this.releases = backup.slice(0, add);
        },

        /**
         * Muestra el modal de comentarios de la publicación
         */
        activeCommentDialog(release) {
            this.release = release;
            this.show = true;
        },

        openReservationInfo(event) {
            this.event = event;
            this.showReservation = true;
        },
    },
};
</script>
