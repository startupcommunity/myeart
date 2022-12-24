<template>
    <div
        class="w-full h-96 md:h-[500px] aspect-video relative"
        :style="{
            'background-image': bgImage,
        }"
    >
        <div class="absolute bottom-5 right-5 bg-white rounded-md">
            <v-btn text color="#B2794C">
                <v-icon>mdi-camera</v-icon> Cambiar portada
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "FrontImageCollective",
    props: {
        bg: {
            type: String,
            default: "",
        },
    },

    computed: {
        bgImage() {
            if (!this.bg) return `url('${this.$defaultFrontPhotoCollective}')`;

            return `url('${this.$pathFrontCollective + this.bg}')`;
        },
    },
};
</script>
