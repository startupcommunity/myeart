// Global mixin utilities

/**
 * Mixin global con propiedades y métodos globales
 *
 * NOTA: no sobrecargar instancia, solo para cosas pequeñas y necesarias
 * @luisandev
 */

import endpoints from "../api/endpoints";
// import useChat from "../pages/chat/mixins/useChat";
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

    computed: {
        /**
         * Datos del usuario autenticado
         * @returns  {Object}  user
         */
        $userAuth() {
            return this.$store.getters.getProfile;
        },

        /**
         * Devuelve si el usuario no esta logueado
         */
        $isUserGuest() {
            const authUser = this.$userAuth;

            return (
                authUser?.id === undefined ||
                authUser?.id === null ||
                authUser?.id === "" ||
                authUser?.id === 0
            );
        },

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
         * Path para las fotos de perfil del colectivo
         */
        $pathProfileCollective() {
            const path = document.head.querySelector(
                'meta[name="profile-photo-collective"]'
            );
            if (path) {
                return path.content;
            }

            return "/";
        },

        /**
         * Path para las fotos de portada del colectivo
         */
        $pathFrontCollective() {
            const path = document.head.querySelector(
                'meta[name="front-photo-collective"]'
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
         * Path para la imagen de los eventos
         * @returns string
         */
        $pathEventImage() {
            const path = document.head.querySelector(
                'meta[name="event-image"]'
            );

            if (path) return path.content;

            return "/";
        },

        /**
         * Path de la url https de la app
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
         * Path de la url simple de la app
         * @returns string
         */
        simpleUrl() {
            const path = document.head.querySelector('meta[name="simple-url"]');
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
         * Devuelve la imagen por defecto de un evento
         *
         * @returns string
         */
        $getDefaultImageEvent: () => "/img/artwork/default.webp",

        /**
         * Devuelve la imagen por defecto de perfil del usuario colectivo
         *
         * @returns string
         */
        $defaultProfilePhotoCollective: () =>
            "/img/collective/default-profile.webp",

        /**
         * Devuelve la imagen por defecto de portada del usuario colectivo
         *
         * @returns string
         */
        $defaultFrontPhotoCollective: () =>
            "/img/collective/default-front.webp",

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

    methods: {
        /**
         * Muestra una notificacion al usuario
         */
        $noty(text, type = "success", duration = 4000, width = "400px") {
            this.$notify({
                group: "container",
                type,
                title: `<h1 class="text-2xl font-bold">¡Aviso!</h1><br>`,
                text: `<p class="text-lg font-normal">${text}</p>`,
                width,
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
         * Administra los errores de la app
         *
         * @param {Object} resp  respuesta del backend
         */
        $manageError(resp) {
            // console.error(resp);
            if (resp?.request?.status === 404) {
                // NOT FOUND
                this.$router.push({ name: "NotFound" });
            }

            if (resp?.request?.status === 500) {
                // SERVER ERROR
                this.$router.push({ name: "ServerError" });
            }

            if (resp?.request?.status === 401) {
                // UNAUTHORIZED
                this.$flowForGuest();
            }

            // si el error es de validaciones del backend
            this.showRequestErrors(resp);
        },

        /**
         * Flujo para usuarios invitados
         * dispara el modal de registro
         * @returns    Notification
         */
        $flowForGuest() {
            return this.$store.dispatch("setShowModalRegister", true);
        },
    },
};
