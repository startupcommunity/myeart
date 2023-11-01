<template>
    <section class="bg-white" v-show="loadComponent">
        <div class="py-7 py-md-16" :class="fluid">
            <div
                class="w-full mx-auto"
                :class="fluid == 'container-fluid' ? 'md:w-4/5' : ''"
            >
                <div class="mx-auto border-b pb-1 pb-md-2 border-zinc-800">
                    <h2
                        class="text-primary text-lg md:text-2xl tracking-widest uppercase text-left font-bold"
                    >
                        <span v-if="title"> {{ title }} </span>
                        <span v-else>Mas obras de {{ user?.name }}</span>
                    </h2>
                </div>
            </div>
            <div class="pt-10 md:-mr-60">
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
        user: {
            type: Object,
            default: {},
        },
        title: {
            type: String,
            default: null,
        },
        ignoreArtworkID: {
            type: Number | String,
            default: "",
        },
        loadComponent: {
            type: Boolean,
            default: true,
            description:
                "define si el componente debe cargarse/cuando debe cargarse de data",
        },
        fluid: {
            type: String,
            default: "container-fluid",
            description: "define si el componente debe ser fluido o no",
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
                .catch((err) => this.$manageError(err))
                .finally(() => (this.loading = false));
        },

        /**
         * Iniciar el carousel
         */
        showTNS() {
            const countArt = this.userArtworks.length;
            tns({
                container: "#slider-user-artworks",
                mode: "carousel",
                center: countArt > 4 ? true : false,
                speed: 400,
                gutter: 20,
                items: 5,
                autoplay: false,
                mouseDrag: true,
                lazyload: true,
                controls: false,
                responsive: {
                    0: {
                        items: 1,
                        edgePadding: 50,
                    },
                    700: {
                        items: 3,
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
