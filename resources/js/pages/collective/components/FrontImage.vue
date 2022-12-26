<template>
    <div
        class="w-full h-96 md:h-[500px] aspect-video relative bg-center bg-cover"
        :style="{
            'background-image': bgImage,
        }"
    >
        <div class="absolute bottom-5 right-5 bg-white rounded-md">
            <v-btn text color="#B2794C" @click.stop="changeImage">
                <v-icon>mdi-camera</v-icon> Cambiar portada
            </v-btn>
        </div>

        <FrontPhotoCollectiveModal
            :show-modal="frontModal"
            :id-collective="idCollective"
            @close-modal="frontModal = false"
        />
    </div>
</template>

<script>
import FrontPhotoCollectiveModal from "./FrontPhotoCollectiveModal.vue";

export default {
    name: "FrontImageCollective",
    components: { FrontPhotoCollectiveModal },
    props: {
        bg: {
            type: String,
            default: "",
        },
        idCollective: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            frontModal: false,
        };
    },

    computed: {
        bgImage() {
            if (!this.bg) return `url('${this.$defaultFrontPhotoCollective}')`;
            return `url('${this.$pathFrontCollective + this.bg}')`;
        },
    },

    methods: {
        changeImage() {
            this.frontModal = true;
        },
    },
};
</script>
