export default {
    computed: {
        /**
         * Fecha máxima permitida para el picker de fecha de nacimiento
         *
         * toma la fecha actual y la convierte en un formato aceptado
         * por el picker
         */
        dateMaxPicker() {
            const date = new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            );
            return date.toISOString().substr(0, 10);
        },
    },
};
