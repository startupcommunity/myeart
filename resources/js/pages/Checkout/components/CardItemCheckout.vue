<template>
    <div class="flex flex-col md:flex-row items-start justify-start">
        <div class="">
            <img
                :src="getPathImage"
                class="w-full md:max-w-36 md:max-h-36 object-cover object-center aspect-square"
                alt="imagen-obra-de-arte"
            />
        </div>
        <div class="md:pl-3">
            <h3 class="text-lg md:text-xl font-bold text-zinc-900 text-left">
                {{ artwork?.title || event.name }}
                <div class="font-light text-lg" v-if="title">
                    {{ title }}
                </div>
            </h3>
            <div v-if="!isAvailable && showAlert && artwork">
                <p class="text-red-500 text-base">
                    <i class="fa fa-warning"></i>
                    Esta obra ya no se encuentra disponible, debe eliminarla de
                    su carrito de compras antes de continuar
                </p>
            </div>
            <div v-if="!isAvailableEvent && showAlert && event">
                <p class="text-red-500 text-base">
                    <i class="fa fa-warning"></i>
                    La cantidad de ticket excede la disponibilidad del evento
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
        event: {
            type: Object,
            default: () => ({}),
        },
        item: {
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
        isAvailableEvent() {
            return ((this.item.quantity + this.item.event?.tickets.length) <= this.item.event?.stock);
        },
                    
    },
};
</script>
