<template>
    <MainLayout :showHeader="false" :loadingOverlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- section title -->
        <Title />

        <!-- section filters -->
        <Filters @filters="getReleaseFollowArtists" />

        <!-- content -->
        <section class="bg-white">
            <div class="container pt-5">
                <div class="flex flex-wrap justify-between items-start">
                    <!-- eventos -->
                    <div class="w-full md:w-1/4 hidden md:block">
                        <h3 class="text-zinc-900 font-bold text-base uppercase">
                            Eventos
                        </h3>
                        <div class="flex flex-col py-5 mt-3">
                            <CardEvent
                                v-for="event in events"
                                :key="event.id"
                                :event="event"
                                class="mb-8"
                            />
                        </div>
                    </div>
                    <!-- /eventos -->

                    <!-- publicaciones -->
                    <div class="w-full md:w-1/2 px-5">
                        <div class="flex flex-col -mt-5 pb-5 md:px-10">
                            <CardRelease
                                v-for="release in releases"
                                :key="release.id"
                                :release="release"
                                :artist="release?.creator"
                                :optionButton="false"
                                :menuButton="false"
                                :menuDate="true"
                                class="mb-5 animate-fade-in-down"
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
                    </div>
                    <!-- /publicaciones -->

                    <!-- artistas -->
                    <div class="w-full md:w-1/4 hidden md:block">
                        <h3 class="text-zinc-900 font-bold text-base uppercase">
                            Artistas que te pueden interesar
                        </h3>
                        <div class="flex flex-col space-y-5 mt-3">
                            <MiniCardArtist
                                v-for="artist in artists"
                                :key="artist.id"
                                :artist="artist"
                            />
                        </div>
                    </div>
                    <!-- /artistas -->
                </div>
            </div>
        </section>
    </MainLayout>
</template>
<script>
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Title from "./sections/index/Title.vue";
import Filters from "./sections/index/Filters.vue";
import CardEvent from "./components/CardEventCol.vue";
import MiniCardArtist from "./components/MiniCardArtist.vue";
import CardRelease from "../artist/components/CardRelease.vue";

const MAX_EVENTS = 6;
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
        CardRelease,
    },
    data() {
        return {
            events: [],
            artists: [],
            releases: [],
            original: [],
            loading: false,
        };
    },
    mounted() {
        // mockup para eventos
        this.events = [
            {
                id: 1,
                title: "Evento 1",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.",
                created_at: "2022-05-01",
                time: "12:00",
                image: "https://picsum.photos/200/300",
                location: "Calle 1 # 2, Colonia 3, Ciudad 4",
                creator: {
                    id: 1,
                    name: "Juan Pérez",
                },
            },
            {
                id: 2,
                title: "Evento 2",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.",
                created_at: "2022-08-01",
                time: "12:00",
                image: "https://picsum.photos/400/600",
                location: "Calle oliva, 11 Marbella",
                creator: {
                    id: 2,
                    name: "Lucía García",
                },
            },
            {
                id: 3,
                title: "Evento 3",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.",
                created_at: "2022-10-22",
                time: "12:00",
                image: "https://picsum.photos/600/800",
                location: "Calle limón, 9 Fuengirola",
                creator: {
                    id: 3,
                    name: "María López",
                },
            },
        ];

        // máximo 3 eventos
        this.events = this.events.slice(0, MAX_EVENTS);

        // artistas
        this.getRandomArtists();

        // publicaciones
        const filters = { sortBy: 1 };
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
            this.loading = true;
            this.axios
                .get(this.ep.releases.followArtists, { params: filters })
                .then(async (resp) => {
                    this.original = JSON.parse(JSON.stringify(await resp.data));
                    this.releases = resp.data.slice(0, MAX_INIT_RELEASES);
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
    },
};
</script>
