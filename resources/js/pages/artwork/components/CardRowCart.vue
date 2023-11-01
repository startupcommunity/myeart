<template>
    <div class="flex flex-wrap justify-between items-start">
        <div class="w-full md:w-3/4 mb-4 md:mb-0">
            <div class="flex flex-col md:flex-row items-start gap-4">
                <div class="w-full md:w-80 h-80 md:h-60">
                    <img
                        :src="getPathImage"
                        class="w-full h-full object-cover object-center"
                        alt="imagen-obra-de-arte"
                    />
                </div>
                <div class="flex flex-col justify-start space-y-3 w-full">
                    <h3 class="text-lg md:text-2xl font-bold text-zinc-900">
                        {{ artwork.title }}
                    </h3>
                    <div>
                        <p class="uppercase text-base leading-8 font-bold">
                            Medida: {{ measures }}
                        </p>
                        <p
                            class="uppercase text-base leading-8 font-bold -mt-5"
                        >
                            Peso: {{ weight }}
                        </p>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between md:justify-start">
                            <div class="flex justify-start">
                                <Avatar
                                    :artist="creator"
                                    custom="w-14 h-14 border"
                                />
                                <div class="flex-col pl-2 hidden md:flex">
                                    <span class="py-0">
                                        {{ creator?.name }}
                                    </span>
                                    <FollowArtistButton
                                        :artist="creator"
                                        class="w-40 py-2 rounded-md"
                                    />
                                </div>
                                <div class="flex-col justify-center pl-2 flex md:hidden">
                                    <span class="py-0 font-bold">
                                        {{ creator?.name }}
                                    </span>
                                    <span>
                                        {{ getArtistQualifying(creator, null, 1) }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex justify-end items-center md:hidden">
                                <FollowArtistButton
                                    :artist="creator"
                                    class="w-32 h-7 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full md:w-1/4">
            <div class="flex flex-col items-start md:items-end">
                <div class="md:mb-3">
                    <h4 class="text-2xl font-bold text-zinc-900 uppercase">
                        {{ artwork.total }} {{ euro }}
                    </h4>
                </div>
                <div class="md:mb-3">
                    <v-btn text @click.stop="deleteItem">Eliminar</v-btn>
                </div>
                <div v-if="!isAvailable">
                    <p class="text-red-500 text-sm">
                        <i class="fa fa-warning"></i>
                        Esta obra ya no se encuentra disponible
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "../../../components/Avatar.vue";
import FollowArtistButton from "./FollowArtistButton.vue";

// utilmixin
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "CardRowCart",
    components: { Avatar, FollowArtistButton },
    mixins: [utilMixin],
    props: {
        artwork: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        /**
         * Devuelve el creador de la obra
         */
        creator() {
            return this.artwork?.user || {};
        },
        /**
         * Devuelve las medidas de la obra
         */
        measures() {
            const width = this.artwork.width ?? 0;
            const large = this.artwork.large ?? 0;
            return `${width} X ${large} ${this.artSize}`;
        },
        /**
         * Devuelve el peso de la obra
         */
        weight() {
            const weight = this.artwork.weight ?? 0;
            return `${weight} ${this.ArtWeight}`;
        },
        /**
         * Devuelve las dimensiones y peso de la obra
         */
        dimensionsAndWeight() {
            const width = `Ancho ${this.artwork.width + this.artSize}`;
            const large = `Largo ${this.artwork.large + this.artSize}`;
            const weight = this.weight;
            return `${width} | ${large} | ${weight}`;
        },

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

    methods: {
        /**
         * Elimina un item del carrito
         */
        deleteItem() {
            const dialog = {
                title: "¿Deseas eliminar este producto de tu carrito?",
                text: "Eliminaras el producto de tu carrito",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, Eliminar",
                cancelButtonText: "Cancelar",
            };

            this.confirmedDialog(dialog).then((resp) => {
                if (resp.isConfirmed) {
                    this.loading = true;

                    // data
                    const _method = {
                        _method: "DELETE",
                    };

                    // ep
                    const ep = this.ep.carts.deleteItem + this.artwork.id;

                    // request axios
                    this.axios
                        .post(ep, _method)
                        .then((resp) => this.successMsj())
                        .catch((error) => this.$manageError(error))
                        .finally(() => (this.loading = false));
                }
            });
        },

        /**
         * Avisar al usuario que se ha eliminado el item del carrito
         *
         */
        successMsj() {
            this.notySwal({
                title: "Eliminado",
                text: "El producto se ha eliminado de tu carrito",
                icon: "success",
                showConfirmButton: false,
            });

            this.$emit("deleteItemSuccess");
        },
    },
};
</script>
