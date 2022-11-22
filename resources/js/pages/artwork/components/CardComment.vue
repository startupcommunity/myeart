<template>
    <div>
        <div class="flex flex-wrap items-center">
            <div class="w-full flex justify-start items-center">
                <img
                    :src="profilePhoto"
                    class="border w-16 h-16 rounded-full"
                />
                <div class="flex flex-wrap items-center ml-2">
                    <div class="w-full">
                        <span class="text-lg font-medium">
                            {{ comment.user?.name }}
                        </span>
                    </div>
                    <div class="w-full -mt-2">
                        <span class="text-sm font-medium">
                            {{ comment.created_at | formatDate }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap items-center pt-3">
            <div class="w-full">
                <span class="text-sm font-normal">
                    {{ comment.comment }}
                </span>
                <button
                    @click.prevent="$emit('sendResponse', comment)"
                    v-if="isOwnerArtwork"
                >
                    <span class="text-xs text-primary font-medium">
                        [Responder]
                    </span>
                </button>
            </div>
            <div class="w-full" v-if="answer">
                <div class="text-gray-400 font-light text-sm ml-2 py-3">
                    <div class="flex items-start md:items-center justify-start">
                        <span>
                            <i
                                class="fa-solid fa-angle-right text-gray-400"
                            ></i>
                        </span>
                        <span class="ml-1">
                            {{ answer?.answer }} |
                            {{ answer?.created_at | formatDate }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// vuex
import { mapGetters } from "vuex";

export default {
    props: {
        comment: {
            type: Object,
            default: () => {},
        },
        artwork: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        ...mapGetters({
            user: "getProfile",
        }),

        /**
         * Devuelve la foto de perfil del usuario
         */
        profilePhoto() {
            if (!this.user?.profile_photo)
                return this.getURLDefaultProfilePhoto;

            return `${this.pathProfilePhoto + this.user.profile_photo}`;
        },

        /**
         * Si el artista es el dueño de la obra
         */
        isOwnerArtwork() {
            return this.artwork?.user_id === this.user?.id && !this.answer;
        },

        /**
         * Objeto de respuesta al comentario/pregunta
         */
        answer() {
            return this.comment?.answer;
        },
    },
    filters: {
        /**
         * Filtro para formatear la fecha
         */
        formatDate(value) {
            if (value) {
                return new Date(value).toLocaleDateString();
            }
        },
    },
};
</script>
