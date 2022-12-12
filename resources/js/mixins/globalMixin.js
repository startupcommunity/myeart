// Global mixin utilities

/**
 * Mixin global con propiedades y métodos globales
 *
 * NOTA: no sobrecargar instancia, solo para cosas pequeñas y necesarias
 * @luisandev
 */

import endpoints from "../api/endpoints";
import requestErrorsMixin from "./requestErrorsMixin";

export default {
    name: "globalMixin",
    mixins: [requestErrorsMixin],
    data() {
        return {
            globalLoading: false,
            euro: "€",
            artSize: "cm",
            ArtWeight: "kg",
        };
    },
    methods: {
        /**
         * Muestra una notificacion al usuario
         */
        noty(text, type = "success", duration = 3000) {
            this.$notify({
                group: "container",
                type,
                text,
                duration,
            });
        },

        /**
         * Devuelve una notificación al estilo de swalert
         *
         * @param {Object} params       objeto de config
         * @returns
         */
        notySwal({ icon = "success", title, text, showConfirmButton = true }) {
            const config = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-outline-success",
                    cancelButton: "btn btn-danger",
                    // showCancelButton: "btn-outline-success",
                },
                buttonsStyling: false,
            });

            return config.fire(title, text, icon, showConfirmButton);
        },

        /**
         * Muestra un dialog de confirmación para una acción concreta
         *
         * @returns new Promise
         */
        async confirmedDialog({
            title = "¿Desea eliminar definitivamente?",
            text = "Esta opción no se puede revertir.",
            icon = "warning",
            confirmButtonText = "Si, Eliminar",
            cancelButtonText = "Cancelar",
        } = {}) {
            return await this.$swal
                .fire({
                    title,
                    text,
                    icon,
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText,
                    cancelButtonText,
                })
                .then(async (result) => await result);
        },

        /**
         * Ir directamente a una sección indicada
         *  dentro de la pagina
         *
         * @param {String} id
         */
        toScrollTo(id = null, setTop = 0) {
            // encontrar el elemento por el id
            let ele = { top: setTop };
            if (id) {
                const el = document.getElementById(id);
                ele = el ? el.getBoundingClientRect() : ele;
            }

            // en caso de recibir el parámetro, se asigna el mismo
            const top = setTop > 0 ? setTop : ele.top;

            globalThis.scrollTo({ top, behavior: "smooth" });
        },

        /**
         * Administra el error como request del backend
         *
         * @param {Object} resp  respuesta del backend
         */
        manageError(resp) {
            console.error(resp);
            if (resp?.request?.status === 404) {
                this.$router.push({ name: "NotFound" });
            }

            if (resp?.request?.status === 500) {
                this.$router.push({ name: "ServerError" });
            }

            // si el error es de validación
            this.showRequestErrors(resp);
        },
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
         * Path para la imagen de las publicaciones
         * @returns string
         */
        pathReleaseImage() {
            const path = document.head.querySelector(
                'meta[name="release-image"]'
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
         * Devuelve el header multipart/formdata
         * @returns     headers: { "Content-Type": "multipart/form-data" }
         */
        headerFormData() {
            return {
                headers: { "Content-Type": "multipart/form-data" },
            };
        },

        /**
         * Devuelve la url de la imagen por defecto de la foto de perfil del usuario
         * @returns string
         */
        getURLDefaultProfilePhoto: () => "/img/avatar.png",

        /**
         * Devuelve la url de la imagen por defecto de una obra
         * @returns string
         */
        getURLDefaultFrontArtwork: () => "/img/artwork/default.webp",

        /**
         * Devuelve la imagen por defecto de una publicación
         *
         * @returns string
         */
        getDefaultImageRelease: () => "/img/artwork/default.webp",

        /**
         * Endpoints para consumir la API rest
         *
         * Todas las rutas que terminan en '/'
         * reciben uno o mas parámetros
         *
         * @returns string
         */
        ep: () => endpoints,
    },
};
