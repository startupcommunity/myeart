<template>
    <section>
        <div
            class="relative h-72 md:h-[30rem] bg-no-repeat bg-cover bg-center"
            :style="{ 'background-image': frontPhoto }"
        >
            <!-- <div
                class="container-fluid py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
            ></div> -->
            <div
                class="absolute top-0 bottom-auto pb-24 inset-x-0 bg-zinc-900"
            ></div>
        </div>
    </section>
</template>
<script>
export default {
    name: "HeroCollective",
    props: {
        photo: {
            type: String,
            default: "",
        },
    },
    computed: {
        /**
         * Foto de portada del usuario o la default
         * @pathFrontPhoto: globalMixin
         */
        frontPhoto() {
            if (!this.photo) return `url('${this.$defaultFrontPhotoCollective}')`;

            return `url('${this.$pathFrontCollective + this.photo}')`;

            // const front = this.profile?.front_image;
            // if (!front) return this.$defaultFrontPhotoCollective;
            // return `${this.$pathFrontCollective + front}`;
        },
    },
};
</script>
