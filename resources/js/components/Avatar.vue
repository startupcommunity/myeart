<template>
    <router-link :to="getPathProfile">
        <img
            class="rounded-full"
            :class="custom || defaultClass"
            :src="profilePhoto"
        />
    </router-link>
</template>
<script>
export default {
    name: "Avatar",
    props: {
        artist: {
            type: Object,
            default: () => {},
            required: true,
        },
        defaultClass: {
            type: String,
            default: "border w-10 h-10",
        },
        custom: {
            type: String,
            default: "",
        },
    },
    computed: {
        /**
         * Devuelve la foto de perfil
         */
        profilePhoto() {
            const photo = this.artist?.profile_photo;

            // path por defecto @globalMixin
            if (!photo) return this.getURLDefaultProfilePhoto;

            // path en el servidor @globalMixin
            return `${this.pathProfilePhoto + photo}`;
        },

        /**
         * Devuelve el path del perfil del artista
         */
        getPathProfile() {
            return {
                name: "showArtist",
                params: {
                    id: this.artist?.id,
                },
            };
        },
    },
};
</script>
