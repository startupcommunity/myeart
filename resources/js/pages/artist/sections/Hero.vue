<template>
    <section>
        <div
            class="relative z-[1] h-96 sm:h-[30rem] bg-no-repeat bg-cover bg-center"
            :class="{ 'bg-hero-front-default': !artist.front_photo }"
            :style="{ 'background-image': frontPhoto }"
        >
            <div
                class="container-fluid py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
            >
                <div class="">
                    <div
                        class="flex flex-row items-center justify-center sm:justify-between"
                    >
                        <div
                            class="relative w-full flex justify-center px-2 sm:px-0"
                        >
                            <img
                                :src="profilePhoto"
                                :alt="'profile-photo-' + artist.name"
                                class="rounded-full w-48 h-48 sm:w-56 sm:h-56"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="absolute top-0 bottom-auto pb-24 inset-x-0 bg-gray-900 bg-opacity-60"
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

        /**
         * devuelve la Foto de perfil o la default
         * @pathProfilePhoto: globalMixin
         */
        profilePhoto() {
            if (!this.artist.profile_photo) return this.getURLDefaultProfilePhoto;

            return `${this.pathProfilePhoto + this.artist.profile_photo}`;
        },
    },
};
</script>
