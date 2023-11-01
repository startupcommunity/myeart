<template>
    <section class="bg-white">
        <div class="container">
            <div class="w-full border-b pb-1 pb-md-2 border-zinc-800">
                <h2
                    class="text-primary text-lg md:text-2xl font-bold tracking-widest uppercase text-left"
                >
                    <span v-if="title"> {{ title }} </span>
                    <span v-else>Mas publicaciones de {{ artist?.name }}</span>
                </h2>
            </div>
            <div class="md:py-10">
                <LoadingTailwind
                    v-show="loading"
                    css="w-full animate-swing-in-top-fwd"
                />
                <div class="md:py-10">
                    <div class="flex flex-wrap">
                        <CardRelease
                            v-for="release in releases"
                            :key="release.id"
                            :release="release"
                            :artist="artist"
                            :showArtist="true"
                            :showActions="false"
                            :showShortInfo="false"
                            :showCompleteInfo="true"
                            :showComments="false"
                            :showBtnComment="false"
                            class="w-full md:w-1/2 md:pr-4 mb-4 animate-swing-in-top-fwd"
                        />
                    </div>
                </div>

                <div class="py-10 flex justify-center" v-if="hasMore">
                    <button
                        class="bg-app-brown-1 px-6 py-4 uppercase text-gray-50 hover:animate-shadow-and-color-app rounded"
                        @click.stop="loadMore()"
                        :disabled="loading"
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
import CardRelease from "../../profile/components/CardRelease.vue";

const INIT_RELEASES = 2;
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
            original: [],
        };
    },
    mounted() {
        this.loadReleases();
    },

    computed: {
        /**
         * Verifica si hay mas publicaciones que cargar
         */
        hasMore() {
            return this.releases.length < this.original.length;
        },
    },
    methods: {
        /**
         * carga las publicaciones de un artista
         */
        loadReleases() {
            const ep = this.$isUserGuest
                ? this.ep.guest.getAllUserForID
                : this.ep.releases.getAllUserForID;

            this.loading = true;
            this.axios
                .get(ep + this.artist.id)
                .then((resp) => {
                    this.original = JSON.parse(JSON.stringify(resp.data));
                    this.releases = resp.data.slice(0, INIT_RELEASES);
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * carga mas publicaciones
         */
        loadMore() {
            const total = this.releases.length + LOAD_MORE;
            this.releases = this.original.slice(0, total);
        },
    },
};
</script>
