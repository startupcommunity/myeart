<template>
    <a @click.stop="showProfile">
        <img
            class="rounded-full"
            :class="custom || defaultClass"
            :src="profilePhoto"
        />
    </a>
</template>
<script>
import utilMixin from "../mixins/utilMixin";

export default {
    name: "Avatar",
    mixins: [utilMixin],
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

    methods: {
        showProfile() {
            if (this.isUserGuest) {
                return this.noty("Debes iniciar sesión", "warning");
            }

            this.$router.push({
                name: "showArtist",
                params: {
                    id: this.artist?.id,
                },
            });
        },
    },
};
</script>
