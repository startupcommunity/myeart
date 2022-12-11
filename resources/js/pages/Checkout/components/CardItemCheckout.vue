<template>
    <div class="flex flex-col md:flex-row items-start justify-start">
        <div class="">
            <img
                :src="getPathImage"
                class="w-full md:w-36 md:h-36 object-cover object-center"
                alt="imagen-obra-de-arte"
            />
        </div>
        <div class="md:pl-3">
            <h3 class="text-lg md:text-3xl font-bold text-zinc-900 text-left">
                {{ artwork.title }}
                <div class="font-light text-lg" v-if="title">
                    {{ title }}
                </div>
            </h3>
            <div v-if="!isAvailable && showAlert">
                <p class="text-red-500 text-base">
                    <i class="fa fa-warning"></i>
                    Esta obra ya no se encuentra disponible, debe eliminarla de
                    su carrito de compras antes de continuar
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardItemCheckout",
    props: {
        artwork: {
            type: Object,
            default: () => ({}),
        },
        showAlert: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: "",
        },
    },

    computed: {
        /**
         * devuelve el path completo de la imagen de la obra
         */
        getPathImage() {
            const artwork = this.artwork;
            const gallery = artwork?.gallery || [];
            if (!artwork?.gallery.length) return this.getURLDefaultFrontArtwork;
            const front_page = gallery.filter((pic) => pic.front_page === 1);
            return `${this.pathArtworkGallery + front_page[0]?.picture}`;
        },

        /**
         * Si el producto no esta disponible
         * notificar al usuario
         */
        isAvailable() {
            return this.artwork?.state === 1;
        },
    },
};
</script>
