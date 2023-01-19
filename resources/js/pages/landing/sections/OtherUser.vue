<template>
    <div class="user-section sm:py-12">
        <div class="container mb-4 sm:mb-8">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <h2
                        class="font-black text-xl lg:text-3xl leading-10 text-white"
                    >
                        Artistas que quizás te puedan interesar...
                    </h2>
                    <LoadingTailwind class="text-white mt-5" v-if="loading" />
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row md:-mr-60">
                <div class="col-12">
                    <div id="slider-user" class="mb-5">
                        <div v-for="artist in artists" :key="artist.id">
                            <CardArtist
                                :routerLink="true"
                                :showButtonFollow="true"
                                :artist="artist"
                                class="bg-white sm:max-w-[240px] rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { tns } from "tiny-slider";
import CardArtist from "../../profile/components/CardArtist.vue";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
export default {
    name: "OtherUser",
    components: { CardArtist, LoadingTailwind },
    data() {
        return {
            artists: [],
            loading: false,
        };
    },

    created() {
        this.loadArtists();
    },

    methods: {
        /**
         * Load artistas
         */
        loadArtists() {
            const params = { all: 1, limit: 10 };
            this.loading = true;
            this.axios
                .get(this.ep.user.getRandomArtists, { params })
                .then((response) => {
                    this.artists = response.data;
                })
                .then(() => this.loadTNS())
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Load TNS
         */
        loadTNS() {
            tns({
                container: "#slider-user",
                mode: "carousel",
                speed: 800,
                gutter: 20,
                items: 7,
                autoplay: true,
                mouseDrag: true,
                autoplayButtonOutput: false,
                autoplayHoverPause: true,
                lazyload: true,
                controls: false,
                responsive: {
                    0: {
                        items: 2,
                        edgePadding: 10,
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
                        edgePadding: 30,
                    },
                    1100: {
                        items: 5,
                        edgePadding: 30,
                    },
                    1300: {
                        items: 7,
                        edgePadding: 0,
                    },
                },
            });
        },
    },
};
</script>
