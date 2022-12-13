<template>
    <div class="animate-fade-in-down">
        <div class="rounded-md w-full">
            <!-- avatar -->
            <InfoArtist
                v-if="showArtist"
                :artist="artist"
                :location="release?.location"
            />

            <!-- imagen -->
            <ImageActionRelease
                :show-actions="showActions"
                :release="release"
                @edit="editRelease"
                @delete="deleteRelease"
            />

            <!-- sub 1 con solo me gustas y compartir -->
            <InfoShortRelease
                v-if="showShortInfo"
                class="py-1"
                :likes="likes"
                :release="release"
            />

            <!-- sub 2 con toda la info hasta comentarios  -->
            <InfoCompleteRelease
                v-if="showCompleteInfo"
                class="py-1"
                :release="release"
                @open-comment-modal="openModalComment"
            />

            <!-- texto y comentarios -->
            <CommentRelease
                :release="release"
                :showComments="showComments"
                :artistName="artist?.name"
                :countComment="countComment"
                @open-comment-modal="openModalComment"
            />
        </div>
    </div>
</template>
<script>
import InfoArtist from "./subcomponents/InfoArtist.vue";
import ImageActionRelease from "./subcomponents/ImageActionRelease.vue";
import InfoCompleteRelease from "./subcomponents/InfoCompleteRelease.vue";
import InfoShortRelease from "./subcomponents/InfoShortRelease.vue";
import CommentRelease from "./subcomponents/CommentRelease.vue";

export default {
    name: "CardReleaseProfile",
    components: {
        InfoArtist,
        ImageActionRelease,
        InfoShortRelease,
        InfoCompleteRelease,
        CommentRelease,
    },
    props: {
        release: {
            type: Object,
            default: () => {},
            description: "Datos de la publicación",
        },
        artist: {
            type: Object,
            default: () => ({}),
            description: "artista o creador",
        },
        showActions: {
            type: Boolean,
            default: true,
            description: "muestra o no los botones de editar y eliminar",
        },
        showArtist: {
            type: Boolean,
            default: false,
            description: "muestra o no el avatar del artista",
        },
        showShortInfo: {
            type: Boolean,
            default: false,
            description: "muestra solo la fecha, likes y compartir",
        },
        showCompleteInfo: {
            type: Boolean,
            default: false,
            description: "muestra toda la info de la release",
        },
        showComments: {
            type: Boolean,
            default: true,
            description: "muestra los comentarios y el botón para verlos",
        },
    },
    computed: {
        likes() {
            return this.release?.likes?.length || 0;
        },
        countComment() {
            return this.release?.comments?.length || 0;
        },
    },
    methods: {
        editRelease() {
            this.$emit("activeEdit", this.release);
        },
        deleteRelease() {
            this.$emit("activeDelete", this.release);
        },
        openModalComment() {
            this.$emit("showCommentDialog", this.release);
        },
    },
};
</script>
