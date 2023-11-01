<template>
    <v-row justify="center">
        <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
        <v-dialog
            v-model="show"
            persistent
            max-width="1200"
            :fullscreen="isMobile"
            :hide-overlay="isMobile"
        >
            <v-card class="bg-white">
                <div class="flex flex-wrap justify-center h-full p-3">
                    <div class="w-full md:w-3/5 md:min-h-[600px]">
                        <img
                            class="w-full h-full object-cover object-center"
                            :src="getImage"
                            alt="imagen-publicación"
                        />
                    </div>
                    <div class="w-full md:w-2/5 min-h-min md:pl-8 md:pr-2">
                        <div
                            class="flex flex-col justify-between h-full md:shadow-[5px_3px_5px_-4px_rgba(0,0,0,0.1)] md:px-3 pt-2"
                        >
                            <div>
                                <!-- avatar -->
                                <div
                                    class="flex flex-row justify-between items-center border-b pb-3 border-gray-300"
                                >
                                    <div
                                        class="flex flex-row justify-start items-center"
                                    >
                                        <Avatar
                                            :artist="creator"
                                            custom="w-12 h-12 border"
                                        />
                                        <div class="ml-2">
                                            <div
                                                class="font-semibold text-gray-900 text-xs"
                                            >
                                                <div class="pb-1">
                                                    {{ creator?.name }}
                                                </div>
                                                <div>
                                                    <span class="text-xs">
                                                        {{ getNameQualified }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <v-btn
                                            text
                                            @click="$emit('close-comments')"
                                        >
                                            <i
                                                class="fa-solid fa-times text-gray-400"
                                            ></i>
                                        </v-btn>
                                    </div>
                                </div>

                                <!-- datos de la publicación -->
                                <div
                                    class="font-bold text-xs py-3 border-b border-gray-300"
                                >
                                    <span
                                        class="font-normal"
                                        v-html="getText"
                                    ></span>
                                </div>

                                <!-- cantidad de comentarios - solo para mobile -->
                                <div
                                    class="block md:hidden py-3 border-b border-gray-300"
                                >
                                    <span class="text-xs text-zinc-400">
                                        hay
                                        <span class="font-extra-bold">
                                            {{ comments.length }}
                                        </span>
                                        comentarios en esta publicación
                                    </span>
                                </div>

                                <!-- comentarios -->
                                <div class="overflow-y-auto h-60 md:h-80 pr-2">
                                    <div
                                        class="flex flex-col space-y-3 py-3 border-b border-gray-300"
                                        v-for="comment in comments"
                                        :key="comment.id"
                                    >
                                        <CardComment
                                            :comment="comment"
                                            :owner="creator"
                                            :slug="release.slug"
                                            @addAnswer="getComments"
                                        />
                                    </div>
                                </div>

                                <!-- likes de la publicación -->
                                <div
                                    class="flex items-center justify-start border-b border-gray-300 py-3 md:pl-3"
                                >
                                    <i
                                        class="fa-regular fa-heart fa-2x cursor-pointer"
                                        :class="{
                                            'text-red-600': likes,
                                            'text-gray-500': !likes,
                                        }"
                                    ></i>
                                    <div class="font-bold text-xs pl-2">
                                        {{ textLikes }}
                                    </div>
                                </div>
                            </div>
                            <!-- caja para escribir comentario -->
                            <v-form
                                ref="formComment"
                                v-model="isFormValid"
                                lazy-validation
                                @submit.prevent="createComment"
                                v-if="canComment"
                            >
                                <div class="flex justify-end items-end p-0">
                                    <div
                                        class="flex flex-wrap justify-between items-center pt-3"
                                    >
                                        <div class="w-4/5">
                                            <div
                                                class="flex flex-row justify-start items-center"
                                            >
                                                <i
                                                    class="fa-regular fa-face-smile text-zinc-800"
                                                ></i>
                                                <div class="ml-2 w-full">
                                                    <v-text-field
                                                        label="Añade un comentario.."
                                                        color="#B2794C"
                                                        v-model="question"
                                                        :rules="rulesComment"
                                                        class="w-full"
                                                    ></v-text-field>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-1/5 flex justify-end">
                                            <button
                                                type="submit"
                                                :disabled="
                                                    !isFormValid || loading
                                                "
                                            >
                                                <span
                                                    class="text-primary text-xs"
                                                >
                                                    Publicar
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </v-form>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import Avatar from "../../../components/Avatar.vue";
import CardComment from "./CardComment.vue";

// mixin utilMixin
import utilMixin from "../../../mixins/utilMixin";

// util rules
import rulesCommentMixin from "../utils/rulesCommentMixin";

export default {
    name: "ReleaseCommentsDialog",
    mixins: [utilMixin, rulesCommentMixin],
    components: { Avatar, CardComment },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        releaseID: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            comments: [],
            question: "",
            release: {},
            loading: false,
        };
    },
    watch: {
        show() {
            if (this.show) {
                this.getComments();
            }
        },
    },
    computed: {
        /**
         * Devuelve la imagen de la publicación
         */
        getImage() {
            const image = this.release?.image;
            if (!image) return this.getDefaultImageRelease;
            return `${this.pathReleaseImage + image}`;
        },

        /**
         * Devuelve el creador de la publicación
         */
        creator() {
            return this.release?.creator || {};
        },

        /**
         * devuelve los calificativos del artista
         * según las categorías de sus obras
         *
         * limitar solo a 1
         */
        getNameQualified() {
            return this.getArtistQualifying(this.creator, null, true);
        },

        /**
         * Evalúa el text de la publicación, si tiene hashtag lo convierte en link
         */
        getText() {
            // acceder al filter de vue para convertir el texto en link
            const text = this.release?.text;
            if (!text) return "";
            return this.hashTag(text);
        },

        /**
         * Numero de likes de la publicación
         */
        likes() {
            return this.release?.likes?.length || 0;
        },

        /**
         * si hay likes devuelve el texto:
         * Les gusta a user1, user2 y {count} personas más
         *
         * sino devuelve:
         * Por ahora no hay likes
         */
        textLikes() {
            const likes = this.likes;
            if (!likes) return "Por ahora no hay likes";
            const firstLikes = this.release?.likes?.slice(0, 2);
            const count = likes - 2;
            const text = firstLikes.map((like) => like.user?.name).join(", ");

            const textOne = `Les gusta a ${text} y ${count} personas más`;
            const textTwo = `Le gusta a ${text}`;
            return count > 0 ? textOne : textTwo;
        },

        /**
         * Usuario logueado
         */
        user() {
            return this.$store.getters.getProfile;
        },

        /**
         * verifica si estamos en modo mobile
         */
        isMobile() {
            return this.$vuetify.breakpoint.xsOnly;
        },

        /**
         * verifica si puede publicar un comentario
         *
         * para que pueda comentar:
         * 1. Debe estar logueado
         * 2. No debe ser el creador de la publicación
         */
        canComment() {
            return this.user && this.user.id !== this.creator.id;
        },
    },
    methods: {
        /**
         * Obtiene los comentarios de la publicación
         */
        getComments() {
            const ep = this.$isUserGuest
                ? this.ep.guest.getComment
                : this.ep.releases.getComment;
            this.loading = true;

            this.axios
                .get(ep + this.releaseID)
                .then((resp) => {
                    // ordenar por fecha
                    this.comments = resp.data.comments.sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                    });

                    // la publicación actualizada
                    this.release = resp.data;
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Crea un comentario
         */
        createComment() {
            // validate formAnswer
            if (!this.$refs.formComment.validate()) {
                return;
            }

            this.loading = true;

            const data = {
                release_id: this.release.id,
                user_id: this.user.id,
                comment: this.question,
            };

            this.axios
                .post(this.ep.releases.storeComment, data)
                .then(() => {
                    this.$noty("Tu comentario ha sido publicado");
                    this.question = "";
                    this.$refs.formComment.resetValidation();
                    this.getComments();
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
