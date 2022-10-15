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

        /**
         * Devuelve la fecha actual en el formato indicado
         */
        actualDate(format = "Y-m-d") {
            const date = new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            );

            return date.toISOString().substr(0, 10);
        },
    },

    methods: {
        /**
         * Devuelve el icono que corresponde según
         * el nombre de la categoría
         * @param {String} name
         * @returns         LA clase del icono
         */
        setIcon(name) {
            if (name == "Literatura") {
                return "fas fa-book";
            }

            if (name == "Pintura") {
                return "fas fa-palette";
            }

            if (name == "Escultura") {
                return "fas fa-hanukiah";
            }

            if (name == "Dibujo") {
                return "fas fa-pencil";
            }

            if (name == "Fotografía") {
                return "fas fa-camera";
            }

            if (name == "Artesanía y Manualidades") {
                return "fas fa-glass-water";
            }

            if (name == "Audios") {
                return "fas fa-volume-up";
            }

            if (name == "Arte Digital") {
                return "fas fa-square-pen";
            }

            if (name == "Otros") {
                return "fas fa-plus";
            }

            return "fas fa-info";
        },
    },
};
