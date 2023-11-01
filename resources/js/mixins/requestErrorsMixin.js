/**
 * requestErrorsMixin
 *
 * mixin para gestionar los errores de las request
 */

export default {
    methods: {
        /**
         * muestra en pantalla los errores de la request
         * @luisandev
         * @param {Object} request      datos recibidos del backend
         */
        showRequestErrors(request) {
            if (request.response.data.errors) {
                const errors = request.response.data.errors;
                let mjsErrors = [];
                for (const error in errors) {
                    mjsErrors.push(errors[error][0]);
                }

                this.$noty(mjsErrors.join("<br/>"), "error", 6000);
            }
        },
    },
};
