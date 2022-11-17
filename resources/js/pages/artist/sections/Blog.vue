<template>
    <section class="bg-white">
        <div class="container">
            <div class="w-full border-b pb-4 border-zinc-800">
                <h2
                    class="text-primary text-2xl leading-5 tracking-widest uppercase text-left"
                >
                    <span v-if="title"> {{ title }} </span>
                    <span v-else>Mas blogs de {{ artist?.name }}</span>
                </h2>
            </div>
            <div class="py-10 md:-mr-60">
                <LoadingTailwind
                    v-show="loading"
                    css="w-full animate-swing-in-top-fwd"
                />
                <div id="slider-artist-blog" class="py-10">
                    <CardBlog
                        :post="{}"
                        :artist="artist"
                        class="w-full animate-swing-in-top-fwd"
                        key="1"
                    />
                    <CardBlog
                        :post="{}"
                        :artist="artist"
                        class="w-full animate-swing-in-top-fwd"
                        key="2"
                    />
                    <CardBlog
                        :post="{}"
                        :artist="artist"
                        class="w-full animate-swing-in-top-fwd"
                        key="3"
                    />
                    <CardBlog
                        :post="{}"
                        :artist="artist"
                        class="w-full animate-swing-in-top-fwd"
                        key="4"
                    />
                    <CardBlog
                        :post="{}"
                        :artist="artist"
                        class="w-full animate-swing-in-top-fwd"
                        key="5"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { tns } from "tiny-slider";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardBlog from "../components/CardBlog.vue";

export default {
    name: "ArtistBlog",
    components: { CardBlog, LoadingTailwind },
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
            post: [],
        };
    },
    // watch: {
    //     loadComponent() {
    //         // this.getBlog();
    //         // this.showTNS();
    //     },
    // },
    mounted() {
        this.showTNS();
    },
    methods: {
        /**
         * Obtiene los post del usuario
         */
        getBlog() {},

        /**
         * Muestra el slider de los post del usuario
         */
        showTNS() {
            tns({
                container: "#slider-artist-blog",
                mode: "carousel",
                speed: 800,
                gutter: 20,
                items: 3,
                autoplay: true,
                mouseDrag: true,
                autoplayButtonOutput: false,
                autoplayHoverPause: true,
                lazyload: true,
                controls: false,
                responsive: {
                    0: {
                        items: 1,
                        edgePadding: 10,
                    },
                    500: {
                        items: 2,
                        edgePadding: 10,
                    },
                    700: {
                        items: 3,
                        edgePadding: 0,
                    },
                    // 900: {
                    //     items: 4,
                    //     edgePadding: 30,
                    // },
                    // 1200: {
                    //     items: 5,
                    //     edgePadding: 0,
                    // },
                },
            });
        },
    },
};
</script>
