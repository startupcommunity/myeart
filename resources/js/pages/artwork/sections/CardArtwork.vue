<template>
    <div class="w-full md:w-1/2 lg:w-1/3 mb-10 animate-swing-in-top-fwd">
        <div class="rounded-md w-full hover:animate-shadow-drop-center">
            <img
                :src="getPathGallery(artwork)"
                :alt="artwork.title"
                class="object-cover object-center w-full h-72"
            />
            <div class="flex flex-col justify-between space-y-8 bg-gray-50">
                <div class="space-y-2">
                    <h3
                        class="text-xl md:text-base xl:text-xl font-semibold tracking-wide text-gray-900 pt-3"
                    >
                        {{ artwork.title }}
                    </h3>
                    <p class="text-primary text-xs">
                        {{ getDimensions(artwork) }}
                        {{ getCategoryName(artwork.categories) }}
                        {{ getSubCategory(artwork.labels) }}
                    </p>
                    <div class="flex justify-start items-center">
                        <img
                            :src="
                                getProfilePhoto(artwork.user) ??
                                '/img/avatar.png'
                            "
                            class="img-thumbnail border w-14 h-14 rounded-full"
                            alt="profile-picture"
                        />
                        <div class="flex flex-col pl-2">
                            <span class="py-0">
                                {{ artwork.user?.name }}
                            </span>
                            <button
                                class="btn btn-primary btn-sm text-xs px-4 uppercase w-20"
                            >
                                Seguir
                            </button>
                        </div>
                    </div>
                    <div class="w-full border-t border-gray-800 my-4"></div>
                    <div class="flex justify-between items-center pb-4 px-2">
                        <div class="text-gray-900 font-black">
                            {{ artwork.price }}
                            {{ euro }}
                        </div>
                        <div class="text-gray-400">
                            <button class="px-2" @click.stop="share()">
                                <i class="fa-regular fa-bookmark"></i>
                            </button>
                            <button @click.stop="likeOrDislike(artwork.id)">
                                <i
                                    class="fa-regular fa-heart"
                                    :class="
                                        isLike
                                            ? 'border rounded-full p-1 text-red-800'
                                            : ''
                                    "
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <loading-overlay
            :active="loadLiked"
            :is-full-page="true"
            loader="bars"
        />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import utilMixin from "../../../mixins/utilMixin";
export default {
    name: "CardArtwork",
    mixins: [utilMixin],
    data() {
        return {
            loadLiked: false,
            isLike: false,
        };
    },
    mounted() {
        this.isLiked();
    },
    props: {
        artwork: {
            type: Object,
            default: {},
        },
    },
    computed: {
        /**
         * Acceder a los getters necesarios
         * user profile
         */
        ...mapGetters({
            user: "getProfile",
        }),
    },
    methods: {
        /**
         * Path completo de la foto de portada
         */
        getPathGallery(artwork) {
            if (!artwork.gallery.length) return "/";

            const front_page = artwork.gallery.filter(
                (pic) => pic.front_page === 1
            );

            return `${this.pathArtworkGallery + front_page[0].picture}`;
        },

        /**
         * Devuelve el path completo de la foto de perfil del usuario
         */
        getProfilePhoto(user = null) {
            if (!user || !user?.profile_photo) return null;

            return `${this.pathProfilePhoto + user.profile_photo}`;
        },

        /**
         * Si la obra ha sido likeada para el usuario logueado
         * se muestra en rojo el botón de me gusta
         */
        isLiked() {
            this.isLike = this.artwork.likes.some(
                (like) => like.user_id === this.user.id
            );
        },

        /**
         * Agrega o elimina un me gusta por parte del usuario
         * a la obra seleccionada
         */
        likeOrDislike(id) {
            this.loadLiked = true;
            const endpoint = this.isLike
                ? this.ep.artworks.disliked
                : this.ep.artworks.liked;

            this.axios
                .post(endpoint + id)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.isLike = !this.isLike;
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loadLiked = false));
        },

        /**
         * Crea y copia un link al portapapeles
         */
        share() {
            const url = this.secureUrl;
            const slug = this.artwork.slug ?? "";
            const route = "/obra/" + slug;
            const text = url + route;
            this.copyToClipboard(text);
        },

        /**
         * Devuelve las dimensiones de la obra
         */
        getDimensions(artwork) {
            const width = artwork.width ?? 0;
            const large = artwork.large ?? 0;
            return `${width + "X" + large + " " + this.artSize}`;
        },

        /**
         * devuelve el nombre de una categoría de una obra
         */
        getCategoryName(categories) {
            return categories.length ? categories[0].name : "";
        },

        /**
         * devuelve el nombre de una sub categoría de una obra
         */
        getSubCategory(labels) {
            return labels.length ? labels[0].name : "";
        },
    },
};
</script>
