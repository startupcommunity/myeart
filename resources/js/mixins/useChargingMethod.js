/**
 * Gestionar métodos de pago/cobro del usuario
 *
 * @autor  Luis Annunziato: luisannunziato@gmail.com
 * @link https://luisan.dev
 */

export default {
    data() {
        return {
            chargingMethods: [],
        };
    },

    computed: {
        /**
         * Obtiene el método de pago/cobro por defecto del usuario
         * @returns
         */
        defaultChargingMethod() {
            return this.chargingMethods.find((method) => method.default) || {};
        },
    },

    methods: {
        /**
         * Checkear si el usuario tiene un método de pago/cobro agregado
         */
        haveAChargingMethod() {
            return this.axios
                .get(this.ep.user.getUserChargeMethods + this.$userAuth.id)
                .then(async (resp) => {
                    const { data } = resp;
                    this.chargingMethods = data;
                    return data;
                })
                .catch((error) => this.$manageError(error));
        },
    },
};
