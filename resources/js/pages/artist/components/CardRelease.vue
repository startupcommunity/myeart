<template>
    <div>
        <div class="flex flex-wrap items-start">
            <div class="w-full">
                <div class="flex justify-between items-center pb-2">
                    <div class="flex flex-row justify-start items-center">
                        <Avatar :artist="artist" />
                        <div class="mt-4 ml-2">
                            <p class="font-medium text-gray-900 text-xs">
                                {{ artist?.name }}
                                <br />
                                <span class="text-gray-400">
                                    {{ release?.location }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div v-if="optionButton">
                        <v-btn text>...</v-btn>
                    </div>
                </div>
            </div>
            <div class="w-full h-full">
                <img
                    class="w-full h-72 md:h-60 object-cover object-center"
                    :src="getImage"
                    alt="release"
                />
            </div>
            <div class="w-full">
                <!-- menu default -->
                <div
                    class="flex justify-between py-3"
                    v-if="menuButton && !menuDate"
                >
                    <div class="flex gap-3">
                        <button>
                            <i
                                class="fa-regular fa-heart text-gray-400 text-xl"
                            ></i>
                        </button>
                        <button>
                            <i
                                class="fa-regular fa-comment text-gray-400 text-xl"
                            ></i>
                        </button>
                        <button>
                            <i
                                class="fa-regular fa-paper-plane text-gray-400 text-xl"
                            ></i>
                        </button>
                    </div>
                    <div class="flex justify-start items-center gap-1">
                        <i
                            class="fa-solid fa-circle super-small text-app-hashtag"
                        ></i>
                        <i
                            class="fa-solid fa-circle super-small text-gray-400"
                        ></i>
                        <i
                            class="fa-solid fa-circle super-small text-gray-400"
                        ></i>
                        <i
                            class="fa-solid fa-circle super-small text-gray-400"
                        ></i>
                    </div>
                    <div>
                        <button>
                            <i
                                class="fa-regular fa-bookmark text-gray-400 text-xl"
                            ></i>
                        </button>
                    </div>
                </div>

                <!-- menu date and buttons -->
                <div
                    class="flex justify-between py-2"
                    v-if="menuDate && !menuButton"
                >
                    <div>
                        <span class="text-sm text-gray-500 font-medium">
                            {{ release?.created_at | formatDate }}
                        </span>
                    </div>
                    <div class="flex gap-2 items-start justify-end">
                        <CommentButton @open-modal-comment="openModalComment" />
                        <LikeButton :release="release" />
                        <FavButton :release="release" />
                        <ShareButton :release="release" />
                    </div>
                </div>

                <div class="font-bold text-xs mb-1">
                    <span class="uppercase">{{ artist?.name }}</span>
                    <span class="font-normal" v-html="getText"></span>
                </div>
                <div class="text-xs font-medium text-gray-400 py-2">
                    <button
                        v-if="countComment"
                        type="button"
                        @click.stop="openModalComment"
                    >
                        Ver los {{ countComment }} comentarios
                    </button>
                    <span v-else>
                        Aún no hay comentarios,
                        <button type="button" @click.stop="openModalComment">
                            agregar nuevo
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Avatar from "../../../components/Avatar.vue";
import CommentButton from "../../release/components/CommentButton.vue";
import FavButton from "../../release/components/FavButton.vue";
import LikeButton from "../../release/components/LikeButton.vue";
import ShareButton from "../../release/components/ShareButton.vue";

// utilmixin
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "CardEvent",
    components: { Avatar, ShareButton, LikeButton, FavButton, CommentButton },
    mixins: [utilMixin],
    props: {
        release: {
            type: Object,
            default: {},
        },
        artist: {
            type: Object,
            default: () => {},
        },
        optionButton: {
            type: Boolean,
            default: true,
        },
        menuButton: {
            type: Boolean,
            default: true,
        },
        menuDate: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        /**
         * Path completo de la foto de perfil
         */
        profilePhoto() {
            const artist = this.artist;
            if (!artist?.profile_photo) return this.getURLDefaultProfilePhoto;
            return `${this.pathProfilePhoto + artist.profile_photo}`;
        },

        /**
         * Devuelve la imagen de la publicación
         */
        getImage() {
            const image = this.release?.image;
            if (!image) return this.getDefaultImageRelease;
            return `${this.pathReleaseImage + image}`;
        },

        /**
         * Evalúa el text de la publicación, si tiene hashtag lo convierte en link
         */
        getText() {
            const text = this.release?.text;
            if (!text) return "";
            return this.hashTag(text);
        },

        /**
         * Devuelve el número de comentarios
         */
        countComment() {
            return this.release?.comments?.length || 0;
        },
    },
    filters: {
        /**
         * Formatear la fecha del evento, en un formato
         * de texto español, ejemplo:
         * Lunes, 1 de Enero de 2021
         * @param {String} date
         */
        formatDate(date) {
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return new Date(date).toLocaleDateString("es-ES", options);
        },
    },

    methods: {
        /**
         * Abrir modal para agregar o ver comentarios
         */
        openModalComment() {
            this.$emit("show-comment-dialog", this.release);
        },
    },
};
</script>
