<template>
    <section class="bg-white">
        <div class="container py-20">
            <!-- title -->
            <div class="w-full border-b pb-4">
                <h3>
                    <span class="text-2xl font-bold">
                        Preguntas y respuestas
                    </span>
                </h3>
            </div>

            <!-- add comment -->
            <FormQuestion
                :artwork="artwork"
                @saveComment="reloadComment"
                v-if="!isOwnerArtwork"
            />

            <!-- comments -->
            <div class="flex flex-wrap items-center mt-5">
                <div v-if="anyComments" class="w-full">
                    <h4>
                        <span class="text-xl font-medium">
                            Ultimas preguntas
                        </span>
                    </h4>
                    <div class="flex flex-wrap items-center mt-5">
                        <LoadingTailwind
                            v-show="loading"
                            css="w-full animate-swing-in-top-fwd"
                        />
                        <div class="w-full">
                            <CardComment
                                v-for="comment in comments"
                                :key="comment.id"
                                :comment="comment"
                                :artwork="artwork"
                                class="mb-7 w-full animate-fade-in-down"
                                @sendResponse="loadCommentForResponse(comment)"
                            />
                        </div>
                    </div>
                    <div
                        class="w-full flex justify-center"
                        v-if="hasMoreComments"
                    >
                        <button
                            class="px-6 py-4 bg-app-brown-1 hover:animate-shadow-and-color-app rounded"
                            @click="loadMoreComments"
                        >
                            <span
                                class="text-sm text-white font-medium uppercase"
                            >
                                Ver más preguntas
                            </span>
                        </button>
                    </div>
                </div>
                <div v-else class="w-full">
                    <h4>
                        <span class="text-xl font-medium">
                            No hay preguntas realizadas
                        </span>
                    </h4>
                </div>
            </div>
        </div>

        <!-- modal response comment -->
        <ResponseCommentDialog
            :comment="selectComment"
            :showDialog="showDialog"
            @closeResponseDialog="showDialog = false"
            @saveAnswer="reloadComment"
        />
    </section>
</template>
<script>
// vuex
import { mapGetters } from "vuex";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardComment from "../components/CardComment.vue";
import FormQuestion from "../components/FormQuestion.vue";
import ResponseCommentDialog from "../components/ResponseCommentDialog.vue";

const MAX_COMMENTS = 3;
const ADD_COMMENTS = 3;

export default {
    components: {
        LoadingTailwind,
        CardComment,
        FormQuestion,
        ResponseCommentDialog,
    },
    name: "Comment",
    props: {
        artwork: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            loading: false,
            showDialog: false,
            comments: [],
            originalComments: [],
            selectComment: {},
        };
    },
    computed: {
        ...mapGetters({
            user: "getProfile",
        }),

        /**
         * @description
         * verifica si la obra tiene comentarios/preguntas
         */
        anyComments() {
            return this.comments.length > 0;
        },

        /**
         * @description
         * verifica si el usuario es el dueño de la obra
         */
        isOwnerArtwork() {
            return this.artwork?.user_id === this.user?.id;
        },

        /**
         * @description
         * verifica si hay mas comentarios para mostrar
         */
        hasMoreComments() {
            return this.comments.length < this.originalComments.length;
        },
    },
    watch: {
        artwork() {
            this.loadComments();
        },
    },
    methods: {
        /**
         * Carga los comentarios/preguntas de la obra
         */
        loadComments() {
            this.loading = true;
            const ep = `${this.ep.comments.artworkList + this.artwork.id}`;

            this.axios
                .get(ep)
                .then((resp) => {
                    this.originalComments = JSON.parse(
                        JSON.stringify(resp.data)
                    );

                    this.comments = this.originalComments.slice(
                        0,
                        MAX_COMMENTS
                    );
                })
                .catch((err) => this.manageError(err))
                .finally(() => (this.loading = false));
        },

        /**
         * Recargar los comentarios/preguntas de la obra
         */
        reloadComment() {
            this.loadComments();
            this.showDialog = false;
        },

        /**
         * Responder un comentario/pregunta
         */
        loadCommentForResponse(comment) {
            this.selectComment = comment;
            this.showDialog = true;
        },

        /**
         * Cargar mas comentarios/preguntas
         */
        loadMoreComments() {
            const start = this.comments.length;
            const end = start + ADD_COMMENTS;

            this.comments = this.originalComments.slice(0, end);
        },
    },
};
</script>
