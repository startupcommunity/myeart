// Global mixin utilities

/**
 * Mixin global con propiedades y métodos globales
 *
 * NOTA: no sobrecargar instancia, solo para cosas pequeñas y necesarias
 * @luisandev
 */

import vue from "vue";

vue.mixin({
    data() {
        return {
            globalLoading: false,
            euro: "€",
            artSize: "cm",
            ArtWeight: "kg",
        };
    },
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

        /**
         * Path de la url de la app
         * @returns string
         */
        secureUrl() {
            const path = document.head.querySelector('meta[name="secure-url"]');
            if (path) {
                return path.content;
            }

            return "/";
        },

        /**
         * Endpoints para consumir la API rest
         *
         * Todas las rutas que terminan en '/'
         * reciben uno o mas parámetros
         *
         * @returns string
         */
        ep() {
            const api = "/api";

            return {
                artworks: {
                    save: api + "/artworks/create",
                    edit: api + "/artworks/edit/",
                    update: api + "/artworks/update/",
                    getImage: api + "/artworks/image/",
                    getPublish: api + "/artworks/publish",
                    liked: api + "/artworks/liked/",
                    disliked: api + "/artworks/disliked/",
                    slug: api + "/artworks/show/",
                    filterPublished: api + "/artworks/filterPublished",
                },

                global: {
                    subcategories: `${api}/subcategories/`,
                    labels: `${api}/labels/`,
                },
            };
        },
    },
    methods: {
        /**
         * Muestra una notificacion al usuario
         */
        noty(text, type = "success") {
            this.$notify({
                group: "container",
                type,
                text,
            });
        },
    },
});
