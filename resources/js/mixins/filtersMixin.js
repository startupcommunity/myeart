/**
 * Filtros útiles para diferentes partes de la app
 *
 * @autor  Luis Annunziato: luisannunziato@gmail.com
 * @link https://luisan.dev
 */

export default {
    filters: {
        /**
         * Convertir monto de stripe en formato de moneda euro
         */
        stripeAmountToEuro(value) {
            return (value / 100).toFixed(2);
        },

        /**
         * Formatear fecha
         * formato de salida: 01/01/2021
         */
        formatBasicDate(value) {
            const date = new Date(value);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },

        /**
         * Formatear tipo de pago
         * devuelve el nombre del tipo de pago en español
         */
        formatTypePayout(value) {
            if (value === "card") {
                return "Tarjeta";
            }

            if (value === "sepa_debit") {
                return "Débito SEPA";
            }

            if (value === "bank_account") {
                return "Cuenta bancaria";
            }

            return "Desconocido";
        },

        /**
         * Devuelve el nombre del estado de un pago
         * de stripe en español
         */
        formatStatusPayout(value) {
            if (value === "pending") {
                return "Pendiente";
            }

            if (value === "paid") {
                return "Pagado";
            }

            if (value === "failed") {
                return "Fallido";
            }

            return "Desconocido";
        },
    },
};
