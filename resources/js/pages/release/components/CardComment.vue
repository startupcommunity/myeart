<template>
    <div class="flex justify-between items-start">
        <div>
            <div class="flex justify-start items-start">
                <Avatar
                    :artist="creator"
                    custom="w-8 h-8 md:w-14 md:h-14 border"
                />
            </div>
        </div>
        <div class="flex justify-start">
            <div class="flex flex-col items-start pl-2">
                <div class="text-sm font-medium text-zinc-900">
                    {{ creator?.name }}
                </div>
                <div class="text-xs text-zinc-400 w-52 md:w-60">
                    {{ comment?.comment }}
                </div>
                <div class="flex flex-row justify-start gap-3 items-center">
                    <span class="text-xs text-zinc-400">
                        {{ comment?.created_at | date }}
                    </span>
                    <button
                        type="button"
                        @click.prevent="showTextFieldAnswer"
                        v-if="canAnswer"
                    >
                        <span class="text-xs font-bold text-zinc-900">
                            Responder
                        </span>
                    </button>
                </div>

                <!-- agregar una respuesta -->
                <div v-if="answer" class="w-full">
                    <v-form
                        ref="formAnswer"
                        v-model="isFormValid"
                        lazy-validation
                        @submit.prevent="addAnswer"
                    >
                        <div class="flex flex-col justify-start">
                            <div class="w-full">
                                <v-text-field
                                    label="Añade una respuesta.."
                                    color="#B2794C"
                                    v-model="releaseAnswer"
                                    :rules="rulesComment"
                                    class="w-full"
                                ></v-text-field>
                            </div>
                            <div class="flex flex-row justify-start gap-3">
                                <button
                                    type="submit"
                                    :disabled="!isFormValid || loading"
                                >
                                    <span class="text-primary text-xs">
                                        Responder
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    :disabled="!isFormValid || loading"
                                    @click.stop="answer = false"
                                >
                                    <span class="text-primary text-xs">
                                        Cancelar
                                    </span>
                                </button>
                            </div>
                        </div>
                    </v-form>
                </div>

                <!-- respuesta -->
                <div class="w-full pt-2" v-if="getAnswer">
                    <div class="flex flex-row justify-start items-center">
                        <div class="flex flex-col justify-start items-start">
                            <div
                                class="text-xs text-zinc-900 flex flex-row justify-start"
                            >
                                <Avatar
                                    :artist="getAnswer?.user"
                                    custom="w-8 h-8 border"
                                />
                                <div class="flex flex-col justify-start pl-2">
                                    <span>
                                        {{ getAnswer?.user?.name }}
                                    </span>
                                    <div class="text-xs text-zinc-400">
                                        {{ getAnswer?.answer }}
                                    </div>
                                    <div class="text-xs text-zinc-400">
                                        {{ getAnswer?.created_at | date }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-end items-start">
                <button type="button" @click.prevent="addOrDeleteLike">
                    <i
                        class="fa-regular fa-heart text-base"
                        :class="{
                            'text-red-600': likes,
                            'text-gray-500': !likes,
                        }"
                    >
                    </i>
                    <div class="text-xs text-zinc-900">
                        {{ likes }}
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "../../../components/Avatar.vue";

// util rules
import rulesCommentMixin from "../utils/rulesCommentMixin";

export default {
    name: "CardComment",
    mixins: [rulesCommentMixin],
    components: { Avatar },
    props: {
        comment: {
            type: Object,
            default: () => {},
        },
        owner: {
            type: Object,
            default: () => {},
        },
        slug: {
            type: String,
            default: "",
            description: "slug de la publicación",
        },
    },
    data() {
        return {
            liked: false,
            loading: false,
            answer: false,
            releaseAnswer: "",
            likes: 0,
        };
    },
    mounted() {
        this.getLikes();
        this.isLiked();
    },
    computed: {
        /**
         * Devuelve del creador del comentario
         */
        getImage() {
            const image = this.comment?.creator?.profile_photo;
            if (!image) return this.getDefaultImageRelease;
            return `${this.pathProfilePhoto + image}`;
        },

        /**
         * Devuelve el creador del comentario
         */
        creator() {
            return this.comment?.user || {};
        },

        /**
         * Usuario logueado
         */
        user() {
            return this.$store.getters.getProfile;
        },

        /**
         * Respuesta del comentario
         */
        getAnswer() {
            return this.comment?.answer || null;
        },

        /**
         * Verifica si el usuario logueado es el creador de la publicación
         *
         * si es asi, puede responder comentarios
         */
        isOwner() {
            return this.user?.id === this.owner?.id;
        },

        /**
         * verifica si puede responder el comentario
         *
         * puede responder si:
         * 1. es el creador de la publicación
         * 2. no tiene una respuesta
         */
        canAnswer() {
            return this.isOwner && !this.getAnswer;
        },
    },
    filters: {
        /**
         * Devuelve el tiempo transcurrido desde la fecha
         * que se creo el comentario en formato 24H
         *
         * ejemplo: hace 1 H
         */
        date(value) {
            const date = new Date(value);
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const diffDays = Math.floor(diff / (1000 * 3600 * 24));
            const diffHours = Math.floor(diff / (1000 * 3600));
            const diffMinutes = Math.floor(diff / (1000 * 60));
            const diffSeconds = Math.floor(diff / 1000);

            if (diffDays > 0) return `${diffDays}D`;
            if (diffHours > 0) return `${diffHours}H`;
            if (diffMinutes > 0) return `${diffMinutes}M`;
            if (diffSeconds > 0) return `${diffSeconds}S`;
            return "1S";
        },
    },
    methods: {
        /**
         * Agrega un like al comentario
         */
        addOrDeleteLike() {
            const ep = this.liked
                ? this.ep.comments.deleteReleaselike
                : this.ep.comments.addReleaseLike;

            const data = {
                comment_id: this.comment.id,
                user_id: this.user.id,
            };

            // request
            this.axios
                .post(ep, data)
                .then(() => {
                    this.liked = !this.liked;

                    // aumenta o disminuye el numero de likes
                    this.liked ? this.likes++ : this.likes--;
                })
                .catch((error) => this.$manageError(error));
        },

        /**
         * Devuelve el numero de likes del comentario
         */
        getLikes() {
            this.likes = this.comment?.likes?.length || 0;
        },

        /**
         * verifica si el usuario le dio like al comentario
         */
        isLiked() {
            const likes = this.comment?.likes || [];
            const userID = this.user?.id || 0;

            this.liked = likes.some((like) => like.user_id === userID);
        },

        /**
         * muestra la caja de texto para responder el comentario
         */
        showTextFieldAnswer() {
            this.answer = true;
        },

        /**
         * Agrega una respuesta al comentario
         */
        addAnswer() {
            // validar formulario
            if (!this.$refs.formAnswer.validate()) return;

            if (!this.user?.id) {
                this.$noty(
                    "Debes iniciar sesión para poder responder",
                    "warning"
                );
                return;
            }

            this.loading = true;

            const data = {
                comment_id: this.comment.id,
                user_id: this.user.id,
                answer: this.releaseAnswer,
                slug: this.slug,
            };

            // request
            this.axios
                .post(this.ep.comments.addAnswerRelease, data)
                .then(() => {
                    this.$emit("addAnswer");
                    this.$noty("Tu respuesta agregada ha sido publicada");
                    this.releaseAnswer = "";
                    this.answer = false;
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
