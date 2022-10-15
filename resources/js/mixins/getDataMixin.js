export default {
    data() {
        return {
            // paises disponibles
            countries: [],

            // categorías cargadas de obras
            categories: [],

            // estilos para las obras
            styles: [],

            // técnicas disponibles
            techniques: [],
        };
    },
    methods: {
        /**
         * Obtener los paises para el select del perfil del usuario
         */
        getCountries() {
            this.axios
                .get("/api/paises")
                .then(async (resp) => {
                    this.countries = await resp.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**
         * Obtiene todos los datos de las categorías disponibles
         */
        getCategories() {
            this.axios
                .get("/api/categories")
                .then(async (resp) => {
                    this.categories = await resp.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**
         *Obtiene los estilos disponibles
         */
        getStyles() {
            this.axios
                .get("/api/styles")
                .then(async (resp) => {
                    this.styles = await resp.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**
         *Obtiene las técnicas disponibles
         */
        getTechniques() {
            this.axios
                .get("/api/techniques")
                .then(async (resp) => {
                    this.techniques = await resp.data;
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

        /**
         * Lista de ciudades de España
         *
         * @returns
         */
        listCityCountry() {
            return [
                { text: "Seleccione una ciudad", val: "" },
                { text: "Álava", val: "Álava" },
                { text: "Albacete", val: "Albacete" },
                { text: "Alicante", val: "Alicante" },
                { text: "Almería", val: "Almería" },
                { text: "Asturias", val: "Asturias" },
                { text: "Ávila", val: "Ávila" },
                { text: "Badajoz", val: "Badajoz" },
                { text: "Barcelona", val: "Barcelona" },
                { text: "Burgos", val: "Burgos" },
                { text: "Cáceres", val: "Cáceres" },
                { text: "Cádiz", val: "Cádiz" },
                { text: "Cantabria", val: "Cantabria" },
                { text: "Castellón", val: "Castellón" },
                { text: "Ciudad Real", val: "Ciudad Real" },
                { text: "Córdoba", val: "Córdoba" },
                { text: "Cuenca", val: "Cuenca" },
                { text: "Gerona", val: "Gerona" },
                { text: "Granada", val: "Granada" },
                { text: "Guadalajara", val: "Guadalajara" },
                { text: "Guipúzcoa", val: "Guipúzcoa" },
                { text: "Huelva", val: "Huelva" },
                { text: "Huesca", val: "Huesca" },
                { text: "Islas Baleares", val: "Islas Baleares" },
                { text: "Jaén", val: "Jaén" },
                { text: "La Coruña", val: "La Coruña" },
                { text: "La Rioja", val: "La Rioja" },
                { text: "Las Palmas", val: "Las Palmas" },
                { text: "León", val: "León" },
                { text: "Lérida", val: "Lérida" },
                { text: "Lugo", val: "Lugo" },
                { text: "Madrid", val: "Madrid" },
                { text: "Málaga", val: "Málaga" },
                { text: "Murcia", val: "Murcia" },
                { text: "Navarra", val: "Navarra" },
                { text: "Orense", val: "Orense" },
                { text: "Palencia", val: "Palencia" },
                { text: "Pontevedra", val: "Pontevedra" },
                { text: "Salamanca", val: "Salamanca" },
                {
                    text: "Santa Cruz de Tenerife",
                    val: "Santa Cruz de Tenerife",
                },
                { text: "Segovia", val: "Segovia" },
                { text: "Sevilla", val: "Sevilla" },
                { text: "Soria", val: "Soria" },
                { text: "Tarragona", val: "Tarragona" },
                { text: "Teruel", val: "Teruel" },
                { text: "Toledo", val: "Toledo" },
                { text: "Valencia", val: "Valencia" },
                { text: "Valladolid", val: "Valladolid" },
                { text: "Vizcaya", val: "Vizcaya" },
                { text: "Zamora", val: "Zamora" },
                { text: "Zaragoza", val: "Zaragoza" },
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
