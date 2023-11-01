<template>
    <div class="sm:py-12">
        <div class="container mb-2 sm:mb-8">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <h2 class="font-black text-xl lg:text-3xl leading-10">
                        Mi comunidad
                    </h2>
                    <LoadingTailwind class="mt-5" v-if="loading" />
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="flex flex-wrap justify-center mb-5">
                        <div
                            class="w-full sm:w-1/2 lg:w-3/12 pr-3 mb-2 sm:mb-0"
                            v-for="release in releases"
                            :key="release.id"
                        >
                            <CardRelease
                                :release="release"
                                :artist="release.creator"
                                :showActions="false"
                                :showArtist="true"
                                :showCompleteInfo="true"
                                :isOwner="
                                    authUser &&
                                    authUser?.id === release.creator.id
                                "
                                class="hover:shadow-2xl px-2 transition-all duration-500"
                                @showCommentDialog="openComments"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <button
                        class="bg-zinc-900 text-gray-100 py-3 px-7 rounded-lg hover:animate-shadow-and-color-app w-4/5 sm:w-auto"
                        @click.stop="showMore"
                        v-if="releases.length < original.length"
                    >
                        VER MAS
                    </button>
                </div>
            </div>
        </div>

        <!-- modal de comentarios -->
        <ReleaseCommentsDialog
            :show="showComments"
            :releaseID="release?.id"
            @close-comments="showComments = false"
        />
    </div>
</template>
<script>
import CardRelease from "../../profile/components/CardRelease.vue";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import ReleaseCommentsDialog from "../../release/components/ReleaseCommentsDialog.vue";
import utilMixin from "../../../mixins/utilMixin";

const INIT_RELEASES = 4;
const SHOW_MORE = 4;

export default {
    name: "Community",
    components: { LoadingTailwind, CardRelease, ReleaseCommentsDialog },
    mixins: [utilMixin],
    data() {
        return {
            loading: false,
            showComments: false,
            releases: [],
            original: [],
            release: {},
        };
    },

    created() {
        this.loadReleases();
    },

    methods: {
        /**
         * load releases - publicaciones
         */
        loadReleases() {
            const ep = this.isUserGuest
                ? this.ep.guest.getAllReleases
                : this.ep.releases.getAll;

            this.loading = true;
            this.axios
                .get(ep)
                .then((response) => {
                    this.releases = response.data.slice(0, INIT_RELEASES);
                    this.original = JSON.parse(JSON.stringify(response.data));
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Cargar mas publicaciones
         */
        showMore() {
            const total = this.releases.length + SHOW_MORE;
            this.releases = this.original.slice(0, total);
        },

        /**
         * Abrir modal de comentarios
         */
        openComments(release) {
            this.release = release;
            this.showComments = true;
        },
    },
};
</script>
