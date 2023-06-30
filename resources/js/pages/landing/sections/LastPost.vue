<template>
    <div class="sm:py-12 rounded-t-3xl sm:rounded-t-none -mt-10 bg-white">
        <!-- title -->
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12 sm:text-start">
                    <h2 class="font-black text-xl lg:text-3xl leading-10">
                        ¿Aún no te decides?
                    </h2>
                    <p class="py-2 text-sm sm:text-base leading-7 font-normal">
                        Echa un vistazo a las últimas obras...
                    </p>

                    <LoadingTailwind class="mt-5" v-if="loading" />
                </div>
            </div>
        </div>

        <!-- content -->
        <div class="container">
            <div class="row md:-mr-60">
                <div class="col-12">
                    <!-- slider -->
                    <div id="slider-publish" class="mb-5">
                        <div v-for="art in artworks" :key="art.id">
                            <CardArtwork
                                :artwork="art"
                                principal-class="w-full animate-fade-in-down"
                                classCard="min-h-[34rem] bg-gray-50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { tns } from "tiny-slider/src/tiny-slider";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardArtwork from "../../artwork/sections/CardArtwork.vue";
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "LastPost",
    components: { LoadingTailwind, CardArtwork },
    mixins: [utilMixin],
    data() {
        return {
            loading: false,
            artworks: [],
        };
    },

    created() {
        this.loadArtworks();
    },

    methods: {
        /**
         * load artworks
         */
        loadArtworks() {
            const ep = this.isUserGuest
                ? this.ep.guest.getPublishedArtworks
                : this.ep.artworks.getPublish;

            this.loading = true;
            this.axios
                .get(ep)
                .then((resp) => (this.artworks = resp.data))
                .then(() => this.loadTNS())
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * load tNS
         */
        loadTNS() {
            tns({
                container: "#slider-publish",
                mode: "carousel",
                speed: 800,
                gutter: 20,
                items: 4,
                autoplay: true,
                mouseDrag: true,
                autoplayButtonOutput: false,
                autoplayHoverPause: true,
                lazyload: true,
                controls: false,
                responsive: {
                    0: {
                        items: 1,
                        edgePadding: 50,
                    },
                    500: {
                        items: 2,
                        edgePadding: 30,
                    },
                    700: {
                        items: 3,
                        edgePadding: 30,
                    },
                    900: {
                        items: 4,
                        edgePadding: 0,
                    },
                },
            });
        },
    },
};
</script>
