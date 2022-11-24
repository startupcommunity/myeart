<template>
    <div class="w-full h-full animate-swing-in-top-fwd">
        <div class="rounded-md hover:animate-shadow-drop-center">
            <router-link :to="routerPath">
                <img
                    :src="getPathGallery(artwork)"
                    :alt="artwork.title"
                    class="object-cover object-center w-60 h-60"
                />
            </router-link>
            <div class="flex flex-col">
                <div class="space-y-2">
                    <h3
                        class="text-xl font-medium tracking-wide text-gray-900 pt-3"
                    >
                        {{ artwork.title }}
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "RowArtwork",
    props: {
        artwork: {
            type: Object,
            default: {},
        },
    },
    computed: {
        routerPath() {
            return {
                name: "showArtwork",
                params: {
                    id: this.artwork?.id,
                },
            };
        },
    },
    methods: {
        /**
         * Devuelve el path de la imagen de portada de la obra
         *
         * @param {Object} artwork
         * @returns
         */
        getPathGallery(artwork) {
            if (!artwork.gallery.length) return this.getURLDefaultFrontArtwork;

            const front_page = artwork.gallery.filter(
                (pic) => pic.front_page === 1
            );

            return `${this.pathArtworkGallery + front_page[0]?.picture}`;
        },
    },
};
</script>
