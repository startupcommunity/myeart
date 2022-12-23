export default {
    data() {
        return {
            // paises disponibles
            countries: [],

            // categorías cargadas de obras
            categories: [],

            // sub categorías de las categorías
            subCategories: [],

            // sub sub categorías o etiquetas de las categorías
            subLabels: [],

            // cantidad de obras standard a mostrar
            SHOW_ARTWORKS: 4,
        };
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

        /**
         * Tipos de favoritos guardados por el usuario
         * @returns Object
         */
        TYPEFAV() {
            return {
                artist: 1,
                artwork: 2,
                news: 3,
            };
        },

        /**
         * Tipos de favoritos guardados por el usuario
         * @returns Object
         */
        SOCIALNETWORK() {
            return {
                FB: "https://www.facebook.com/",
                IG: "https://www.instagram.com/",
                TW: "https://twitter.com/",
                YT: "https://www.youtube.com/",
                BH: "https://www.behance.net/",
                LK: "https://www.linkedin.com/in/",
            };
        },

        /**
         * Tipos de colectivos
         *
         * @returns array
         */
        collectiveTypes() {
            return [
                { text: "Seleccione colectivo", value: "" },
                { text: "Galerías de Arte", value: 1 },
                { text: "Administración Pública", value: 2 },
                { text: "Asociación", value: 3 },
                { text: "Federación", value: 4 },
                { text: "Otras Organizaciones", value: 5 },
            ];
        },
    },
    methods: {
        /**
         * Obtener los paises para el select del perfil del usuario
         */
        getCountries() {
            this.axios
                .get("/api/paises")
                .then(async (resp) => (this.countries = await resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Obtiene todos los datos de las categorías disponibles
         */
        getCategories() {
            this.axios
                .get(this.ep.global.categories)
                .then(async (resp) => (this.categories = await resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Obras publicada del usuario
         * opcional: ignora una obra concreta
         */
        async getUserArtworks(userID, ignoreArtworkID = null) {
            const ep = this.ep.artworks.getUserPublish;
            const endpoint = `${ep + userID}/${ignoreArtworkID}`;

            return await this.axios
                .get(endpoint)
                .then(async (resp) => {
                    if (resp.status !== 200) return false;
                    return await resp.data;
                })
                .catch((error) => console.log(error));
        },

        /**
         * Obras publicadas por categoría
         * opcional: ignora un usuario en particular
         */
        async getPublishForCategory(categoryID, ignoreUserID = null) {
            const ep = this.ep.artworks.getPublishForCategory;
            const endpoint = `${ep + categoryID}/${ignoreUserID}`;

            return await this.axios
                .get(endpoint)
                .then(async (resp) => {
                    if (resp.status !== 200) return false;
                    return await resp.data;
                })
                .catch((error) => console.log(error));
        },

        /**
         * Devuelve las subcategorias de una categoría
         *
         * @param {Int} id      id el la categoría
         */
        async getSubCategories(id) {
            return await this.axios
                .get(this.ep.global.subcategories + id)
                .then((resp) => (this.subCategories = resp.data))
                .catch((error) => console.error(error));
        },

        /**
         * Devuelve las subsubcategories o etiquetas de una categoría
         *
         * @param {Int} category_id         id el la categoría
         * @param {Int} sub_category_id      id el la subcategoria
         */
        async getSubLabels(category_id, sub_category_id) {
            const ep = `${
                this.ep.global.labels + category_id
            }/${sub_category_id}`;

            return await this.axios
                .get(ep)
                .then((resp) => (this.subLabels = resp.data))
                .catch((error) => console.error(error));
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
};
