<template>
    <section>
        <div
            class="relative h-72 md:h-[30rem] bg-no-repeat bg-cover bg-center"
            :class="{ 'bg-hero-front-default': !artist.front_photo }"
            :style="{ 'background-image': frontPhoto }"
        >
            <div
                class="container-fluid py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
            ></div>
            <div
                class="absolute top-0 bottom-auto pb-24 inset-x-0 bg-zinc-900 md:bg-opacity-60"
                v-if="artist.front_photo"
            ></div>
        </div>
    </section>
</template>
<script>
export default {
    name: "Hero",
    props: {
        artist: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        /**
         * Foto de portada del usuario o la default
         * @pathFrontPhoto: globalMixin
         */
        frontPhoto() {
            if (!this.artist.front_photo) return "";

            return `url('${this.pathFrontPhoto + this.artist.front_photo}')`;
        },
    },
};
</script>
