<template>
    <section class="bg-white">
        <div class="container">
            <div class="w-full border-b pb-4 border-zinc-800">
                <h2
                    class="text-primary text-2xl leading-5 tracking-widest uppercase text-left"
                >
                    <span v-if="title"> {{ title }} </span>
                    <span v-else>Mas publicaciones de {{ artist?.name }}</span>
                </h2>
            </div>
            <div class="py-10">
                <LoadingTailwind
                    v-show="loading"
                    css="w-full animate-swing-in-top-fwd"
                />
                <div class="py-10">
                    <div class="flex flex-wrap">
                        <CardRelease
                            class="w-full md:w-1/2 pr-4 mb-4 animate-swing-in-top-fwd"
                            v-for="(release, index) in releases"
                            :artist="artist"
                            :key="index"
                            :release="release"
                        />
                    </div>
                </div>

                <div class="py-10 flex justify-center" v-if="releases.length">
                    <button
                        class="bg-app-brown-1 px-6 py-4 uppercase text-gray-50 hover:animate-shadow-and-color-app rounded"
                        @click="loadMore()"
                    >
                        Mostrar más
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardRelease from "../components/CardRelease.vue";

const LIMIT = 2;
const LOAD_MORE = 2;

export default {
    name: "Release",
    components: { CardRelease, LoadingTailwind },
    props: {
        artist: {
            type: Object,
            default: {},
        },
        title: {
            type: String,
            default: null,
        },
        loadComponent: {
            type: Boolean,
            default: true,
            description:
                "define si el componente debe cargarse/cuando debe cargarse de data",
        },
    },
    data() {
        return {
            loading: false,
            releases: [],
            originalReleases: [],
            reminders: [],
        };
    },
    mounted() {
        this.loadReleases();
    },
    methods: {
        /**
         * carga las publicaciones de un artista
         */
        loadReleases() {
            // this.loading = true;
            // const response = await this.$axios.get(
            //     `/api/artist/${this.artist.id}/releases`
            // );
            // this.releases = response.data;

            // mockup de prueba para releases
            const mockup = [
                {
                    id: 1,
                    title: "Exposición de esculturas",
                    text: "Mi nueva exposición de esculturas",
                    date: "2021-05-25",
                    time: "10:00",
                    place: "Madrid, España",
                    image: "https://picsum.photos/200/300",
                    hashtag: "#arte #escultura",
                    museum: 'Roma',
                },
                {
                    id: 2,
                    title: "Exposición de esculturas",
                    text: "Otra forma de hacer esculturas",
                    date: "2021-05-25",
                    time: "10:00",
                    place: "Madrid, España",
                    image: "https://picsum.photos/600/400",
                    hashtag: "#arte #pintura",
                    museum: 'Madrid',
                },
                {
                    id: 3,
                    title: "Exposición de esculturas",
                    text: "Amar es compartir",
                    date: "2021-05-25",
                    time: "10:00",
                    place: "Madrid, España",
                    image: "https://picsum.photos/100/100",
                    hashtag: "#dibujo #oleo",
                    museum: 'París',
                },
                {
                    id: 4,
                    title: "Exposición de esculturas",
                    text: "El arte de la escultura",
                    date: "2021-05-25",
                    time: "10:00",
                    place: "Madrid, España",
                    image: "https://picsum.photos/200/200",
                    hashtag: "#dibujo #literatura",
                    museum: 'Londres',
                },
            ];

            // original releases
            this.originalReleases = JSON.parse(JSON.stringify(mockup));

            // mostrar las releases
            this.releases = this.originalReleases.slice(0, LIMIT);

            // reminders
            this.reminders = JSON.parse(
                JSON.stringify(this.originalReleases.slice(LIMIT))
            );
        },

        /**
         * carga mas publicaciones
         */
        loadMore() {
            const limit = this.releases.length + LOAD_MORE;
            this.releases = this.originalReleases.slice(0, limit);
            this.reminders = JSON.parse(
                JSON.stringify(this.originalReleases.slice(limit))
            );
        },
    },
};
</script>
