<template>
    <div class="w-full animate-fade-in-down">
        <div v-if="showProfile" class="mb-3">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-center gap-2">
                    <Avatar :artist="creator" custom="w-12 h-12 border" />
                    <span class="text-sm text-gray-900">
                        {{ creator.name }}
                    </span>
                </div>
                <div>
                    <FollowArtistButton :artist="creator" />
                </div>
            </div>
        </div>
        <router-link :to="getPathDetailArtwork">
            <img
                :src="setPathGallery"
                :alt="artwork.title"
                class="object-cover object-center w-full h-72"
            />
        </router-link>
        <div class="flex flex-col justify-between space-y-8">
            <div class="space-y-2 px-2">
                <h3
                    class="text-lg font-semibold tracking-wide text-gray-900 pt-3"
                >
                    {{ artwork.title }}
                </h3>
                <p class="text-primary text-xs flex gap-3">
                    <span>{{ getDimensions }}</span>
                    <span>{{ setCategoryName }}</span>
                    <span>{{ setSubCategory }}</span>
                </p>
                <div class="w-full border-t-2 border-gray-800 my-4"></div>
                <p class="text-gray-900">{{ artwork.price ?? 0 }} {{ euro }}</p>
            </div>
            <div class="flex flex-wrap py-4 justify-between items-center px-2">
                <div class="w-full xl:w-1/2 mb-4 xl:pr-2" v-if="showButtonEdit">
                    <router-link
                        class="text-sm uppercase font-bold tracking-wide border-[1.5px] border-gray-900 text-center px-9 h-11 flex min-w-full max-w-none justify-center items-center hover:animate-bg-gray-light text-black rounded-sm hover:no-underline"
                        :to="getPathEditArtwork"
                    >
                        Editar
                    </router-link>
                </div>
                <div
                    class="w-full xl:w-1/2 mb-4 xl:pl-2"
                    v-if="showButtonDelete"
                >
                    <v-btn
                        outlined
                        block
                        large
                        class="uppercase font-bold tracking-wide text-sm"
                        @click.stop="deleteArtwork"
                    >
                        Eliminar
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "../../../components/Avatar.vue";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";

export default {
    name: "CardArtwork",
    components: { FollowArtistButton, Avatar },
    props: {
        artwork: {
            type: Object,
            required: true,
        },
        showButtonDelete: {
            type: Boolean,
            default: true,
        },
        showButtonEdit: {
            type: Boolean,
            default: true,
        },
        showProfile: {
            type: Boolean,
            default: true,
        },
        type: {
            type: Number | String,
            default: 1,
        },
        collectiveID: {
            type: Number | String,
            default: null,
        },
    },
    computed: {
        /**
         * Devuelve el path del detalle de la obra
         */
        getPathDetailArtwork() {
            return {
                name: "showArtwork",
                params: { id: this.artwork.id,title:this.artwork.title.toLowerCase().replace(/ /g, '-') },
            };
        },
        /**
         * Path completo de galeria
         */
        setPathGallery() {
            const artwork = this.artwork;
            if (!artwork.gallery.length) return this.getURLDefaultFrontArtwork;
            const front_page = artwork.gallery.filter(
                (pic) => pic.front_page === 1
            );
            return `${this.pathArtworkGallery + front_page[0]?.picture}`;
        },
        /**
         * Devuelve las dimensiones de la obra
         */
        getDimensions() {
            const artwork = this.artwork;
            const width = artwork.width ?? 0;
            const large = artwork.large ?? 0;
            return `${width + "X" + large + " " + this.artSize}`;
        },
        /**
         * Setear el nombre de una categoría de una obra
         */
        setCategoryName() {
            const categories = this.artwork.categories;
            return categories.length ? categories[0].name : "";
        },
        /**
         * Setear el nombre de una técnica de una obra
         */
        setSubCategory() {
            const labels = this.artwork.labels;
            return labels.length ? labels[0].name : "";
        },
        /**
         * Devuelve el path paras editar la obra
         */
        getPathEditArtwork() {
            return {
                name: "editArtwork",
                params: {
                    id: this.artwork.id,
                    type: this.type,
                    collectiveID: this.collectiveID,
                },
            };
        },

        /**
         * Devuelve el creador de la obra
         */
        creator() {
            return this.artwork.user;
        },

        /**
         * user logueado
         */
        // user() {
        //     return this.$store.getters.getProfile;
        // },

        /**
         * Verifica si es el creador de la obra
         */
        // isCreator() {
        //     return this.user?.id === this.creator?.id;
        // },
    },
    methods: {
        /**
         * Elimina de forma saft una obra del usuario
         */
        deleteArtwork() {
            const noty = this.confirmedDialog();
            noty.then((result) => {
                if (result.isConfirmed) {
                    this.globalLoading = true;
                    const id = this.artwork.id;
                    const endpoint = `${this.ep.artworks.delete + id}`;
                    this.axios
                        .post(endpoint, { _method: "delete" })
                        .then((res) => {
                            if (res.status === 200) {
                                this.$noty("Obra eliminada con éxito.");
                                this.$emit("deleted");
                            }
                        })
                        .catch((error) => this.$manageError(error))
                        .finally(() => (this.globalLoading = false));
                }
            });
        },
    },
};
</script>
