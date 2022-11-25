<template>
    <section class="bg-gray-100" v-show="loadComponent">
        <div class="container-fluid py-7 py-md-16">
            <div class="w-full md:w-4/5 mx-auto">
                <div
                    class="w-full mx-auto border-b pb-1 pb-md-2 border-zinc-800"
                >
                    <h2
                        class="text-primary text-lg md:text-2xl font-bold tracking-widest uppercase text-left"
                    >
                        Otras obras que te pueden interesar
                    </h2>
                </div>
            </div>
            <div class="pt-10 md:-mr-60">
                <LoadingTailwind
                    v-show="loading"
                    css="w-full animate-swing-in-top-fwd"
                />
                <div id="slider-other-artworks">
                    <CardArtwork
                        v-for="art in otherArtworks"
                        :artwork="art"
                        :showProfile="false"
                        :key="art.id"
                        classCard="min-h-[30rem] bg-gray-50"
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
        categoryID: {
            type: Number | String,
            default: "",
        },
        ignoreUser: {
            type: Object,
            default: {},
            description: "usuario a ignorar en las obras",
        },
        loadComponent: {
            type: Boolean,
            default: true,
            description:
                "define si el componente debe cargarse/cuando debe cargarse de data",
        },
    },
    watch: {
        ignoreUser(val) {
            if (val.id) {
                this.getArtworks();
            }
        },
    },
    data() {
        return {
            loading: false,
            otherArtworks: [],
        };
    },
    methods: {
        /**
         * Obtener otras obras del autor de la obra seleccionada
         * ignorando la obra actual mostrada
         */
        getArtworks() {
            this.loading = true;
            const promise = this.getPublishForCategory(
                parseInt(this.categoryID),
                this.ignoreUser.id
            );
            promise
                .then(async (data) => {
                    if (data) {
                        this.otherArtworks = await data;
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
                container: "#slider-other-artworks",
                mode: "carousel",
                speed: 800,
                gutter: 20,
                items: 5,
                autoplay: false,
                mouseDrag: true,
                autoplayButtonOutput: false,
                autoplayHoverPause: true,
                lazyload: true,
                controls: false,
                responsive: {
                    0: {
                        items: 1,
                        edgePadding: 30,
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
