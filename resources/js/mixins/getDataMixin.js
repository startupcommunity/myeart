export default {
    data() {
        return {
            // paises disponibles
            countries: [],
        };
    },
    methods: {
        /**
         * Obtener los paises para el select del perfil del usuario
         */
        getCountries() {
            Vue.axios
                .get("/api/paises")
                .then(async (resp) => {
                    this.countries = await resp.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**
         * Listado de géneros para la creación/actualización
         * del usuario
         */
        listGenre() {
            return [
                { state: "Seleccione sexo", abbr: "" },
                { state: "Hombre", abbr: 1 },
                { state: "Mujer", abbr: 2 },
                { state: "Otro", abbr: 3 },
            ];
        },

        /**
         * Lista de idiomas permitidos para la creación/actualización
         * del usuario
         */
        listLang() {
            return [
                { state: "Seleccione idioma", abbr: "" },
                { state: "Español", abbr: "es" },
                { state: "Ingles", abbr: "en" },
            ];
        },
    },

    computed: {
        /**
         * Estado de las obras (state) validos
         * @returns Object
         */
        STATEARTWORK() {
            return {
                published: 1,
                sold: 2,
                draft: 3,
            };
        },
    },
};
