<template>
    <div class="w-full md:w-1/2 lg:w-1/3 mb-10 animate-swing-in-top-fwd">
        <div
            class="rounded-md w-full hover:animate-shadow-drop-center relative"
            :class="classCard"
        >
            <router-link :to="getPathDetailArtwork" v-if="routerLink">
                <img
                    :src="getPathGallery"
                    :alt="artwork.title"
                    class="object-cover object-center w-full h-72"
                    :class="classImage"
                />
            </router-link>
            <div class="flex flex-col justify-between space-y-8 bg-gray-50">
                <div class="space-y-2">
                    <div class="w-full px-2">
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
                    </div>

                    <div
                        class="flex flex-wrap pb-4 px-2 bottom-0 inset-x-0 absolute"
                    >
                        <div
                            class="flex justify-end items-center"
                            v-show="showProfile"
                        >
                            <Avatar :artist="artwork?.user" custom="border w-12 h-12"/>
                            <div class="flex flex-col pl-2">
                                <span class="py-0">
                                    {{ artwork.user?.name }}
                                </span>
                                <FollowArtistButton
                                    :artist="artwork.user"
                                    class="w-3/5"
                                />
                            </div>
                        </div>
                        <div class="w-full border-t border-gray-800 my-4"></div>
                        <div class="w-full flex justify-between items-center">
                            <div class="text-gray-900 font-black">
                                {{ artwork.price ?? 0 }}
                                {{ euro }}
                            </div>
                            <div class="text-gray-400">
                                <button
                                    class="px-2"
                                    @click.stop="sharePublicArtwork(artwork)"
                                >
                                    <i class="fa-regular fa-bookmark"></i>
                                </button>
                                <button
                                    @click.stop="likeOrDislike(artwork.id)"
                                    class="hover:text-gray-700"
                                >
                                    <i
                                        class="fa-regular fa-heart"
                                        :class="
                                            isLike ? 'p-1 text-red-800' : ''
                                        "
                                    ></i>
                                </button>
                            </div>
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
import Avatar from '../../../components/Avatar.vue';
import utilMixin from "../../../mixins/utilMixin";
import FollowArtistButton from "../components/FollowArtistButton.vue";
export default {
    components: { FollowArtistButton, Avatar },
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
        showProfile: {
            type: Boolean,
            default: true,
        },
        routerLink: {
            type: Boolean,
            default: true,
        },
        classCard: {
            type: String,
            default: "",
        },
        classImage: {
            type: String,
            default: "",
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

        /**
         * devuelve el path del detalle de obra
         */
        getPathDetailArtwork() {
            return {
                name: "showArtwork",
                params: { id: this.artwork?.id },
            };
        },

        /**
         * Path completo de la foto de portada
         */
        getPathGallery() {
            const artwork = this.artwork;
            const gallery = this.artwork?.gallery;

            if (!artwork?.gallery.length) return this.getURLDefaultFrontArtwork;

            const front_page = gallery.filter((pic) => pic.front_page === 1);

            return `${this.pathArtworkGallery + front_page[0]?.picture}`;
        },

        /**
         * Devuelve el path completo de la foto de perfil del usuario
         */
        getProfilePhoto() {
            const user = this.artwork?.user;

            if (!user || !user?.profile_photo) return null;

            return `${this.pathProfilePhoto + user.profile_photo}`;
        },
    },
    methods: {
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
