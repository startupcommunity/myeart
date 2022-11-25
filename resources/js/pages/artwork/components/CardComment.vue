<template>
    <div>
        <div class="flex flex-wrap items-center">
            <div class="w-full flex justify-start items-center">
                <Avatar :artist="artist"/>
                <div class="flex flex-wrap items-center ml-2">
                    <div class="w-full">
                        <span class="text-lg font-medium">
                            {{ artist?.name }}
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
import Avatar from "../../../components/Avatar.vue";

export default {
    components: { Avatar },
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
         * Devuelve el usuario artista de la obra
         */
        artist() {
            return this.comment?.user;
        },

        /**
         * Devuelve la foto de perfil del usuario
         */
        profilePhoto() {
            if (!this.artist?.profile_photo)
                return this.getURLDefaultProfilePhoto;

            return `${this.pathProfilePhoto + this.artist.profile_photo}`;
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
                const date = new Date(value).toLocaleDateString();

                // convertir a dd/mm/yyyy
                const dateParts = date.split("/");
                return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
            }
        },
    },
};
</script>
