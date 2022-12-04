<template>
    <MainLayout :showHeader="false" :loadingOverlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- section title -->
        <Title />

        <!-- section filters -->
        <Filters />

        <!-- content -->
        <section class="bg-white">
            <div class="container pt-5">
                <div class="flex flex-wrap justify-between items-start">
                    <!-- eventos -->
                    <div class="w-full md:w-1/4">
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
                    <div class="w-full md:w-1/2 md:px-16">
                        <div class="flex flex-col -mt-5">
                            <CardRelease
                                v-for="release in releases"
                                :key="release.id"
                                :release="release"
                                :artist="release?.creator"
                                :optionButton="false"
                                :menuButton="false"
                                :menuDate="true"
                                class="mb-5"
                            />
                        </div>
                    </div>
                    <!-- /publicaciones -->

                    <!-- artistas -->
                    <div class="w-full md:w-1/4">
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
const MAX_INIT_RELEASES = 4;
const RANDOM_ARTIST = 6;

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
        this.getReleaseFollowArtists();
    },
    computed: {
        user() {
            return this.$store.getters.getProfile;
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
        getReleaseFollowArtists() {
            this.loading = true;
            this.axios
                .get(this.ep.releases.followArtists)
                .then(async (resp) => (this.releases = await resp.data))
                .then(() => this.releases.slice(0, MAX_INIT_RELEASES))
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },


        // TODO: Realizar la paginación
    },
};
</script>
