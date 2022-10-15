// Global mixin utilities

/**
 * Mixin global con propiedades y métodos globales
 *
 * NOTA: no sobrecargar instancia, solo para cosas pequeñas y necesarias
 * @luisandev
 */

import vue from "vue";

vue.mixin({
    computed: {
        /**
         * Path para las fotos de portadas
         */
        pathFrontPhoto() {
            const path = document.head.querySelector(
                'meta[name="front-photo"]'
            );
            if (path) {
                return path.content;
            }

            return "/";
        },

        /**
         * Path para las fotos de perfil
         */
        pathProfilePhoto() {
            const path = document.head.querySelector(
                'meta[name="profile-photo"]'
            );
            if (path) {
                return path.content;
            }

            return "/";
        },

        /**
         * Path para la galeria de obras del usuario
         * @returns string
         */
        pathArtworkGallery() {
            const path = document.head.querySelector(
                'meta[name="artwork-gallery"]'
            );
            if (path) {
                return path.content;
            }

            return "/";
        },
    },
});
