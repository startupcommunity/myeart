/**
 * Filtros útiles para diferentes partes de la app
 *
 * @autor  Luis Annunziato: luisannunziato@gmail.com
 * @link https://luisan.dev
 */

import {
    BANK_ACCOUNT,
    CARD,
    FAILED,
    PAID,
    PENDING,
    SEPA_DEBIT,
    UNKNOWN,
} from "../util/text";

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
                return CARD;
            }

            if (value === "sepa_debit") {
                return SEPA_DEBIT;
            }

            if (value === "bank_account") {
                return BANK_ACCOUNT;
            }

            return UNKNOWN;
        },

        /**
         * Devuelve el nombre del estado de un pago
         * de stripe en español
         */
        formatStatusPayout(value) {
            if (value === "pending") {
                return PENDING;
            }

            if (value === "paid") {
                return PAID;
            }

            if (value === "failed") {
                return FAILED;
            }

            return UNKNOWN;
        },
    },
};
