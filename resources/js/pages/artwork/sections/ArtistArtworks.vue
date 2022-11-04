<template>
    <section class="bg-white" v-show="loadComponent">
        <div class="container pt-20">
            <div class="w-full">
                <h2
                    class="text-primary text-2xl leading-5 tracking-widest uppercase text-center"
                >
                    Mas obras de {{ user?.name }}
                </h2>
            </div>
            <div class="py-10">
                <LoadingTailwind
                    v-show="loading"
                    css="w-full animate-swing-in-top-fwd"
                />
                <div id="slider-user-artworks">
                    <CardArtwork
                        v-for="art in userArtworks"
                        :artwork="art"
                        :showProfile="false"
                        :key="art.id"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { tns } from "tiny-slider";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardArtwork from "./CardArtwork.vue";
import getDataMixin from "../../../mixins/getDataMixin";

export default {
    components: { CardArtwork, LoadingTailwind },
    name: "ArtistArtwork",
    mixins: [getDataMixin],
    props: {
        user: {
            type: Object,
            default: {},
        },
        ignoreArtworkID: {
            type: Number | String,
            default: null,
        },
        loadComponent: {
            type: Boolean,
            default: true,
            description:
                "define si el componente debe cargarse/cuando debe cargarse de data",
        },
    },
    watch: {
        user(val) {
            if (val.id) {
                this.getArtworks();
            }
        },
    },
    data() {
        return {
            loading: false,
            userArtworks: [],
        };
    },
    methods: {
        /**
         * Obtener otras obras del autor de la obra seleccionada
         * ignorando la obra actual mostrada
         */
        getArtworks() {
            this.loading = true;
            const userID = this.user.id;
            const promise = this.getUserArtworks(userID, this.ignoreArtworkID);
            promise
                .then(async (data) => {
                    if (data) {
                        this.userArtworks = await data;
                        return true;
                    }
                })
                .then(() => this.showTNS())
                .finally(() => (this.loading = false));
        },

        /**
         * Iniciar el carousel
         */
        showTNS() {
            tns({
                container: "#slider-user-artworks",
                mode: "carousel",
                speed: 800,
                gutter: 20,
                items: 5,
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
                        edgePadding: 30,
                    },
                    1200: {
                        items: 5,
                        edgePadding: 0,
                    },
                },
            });
        },
    },
};
</script>
