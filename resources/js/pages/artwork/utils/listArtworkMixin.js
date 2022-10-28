// cantidad de obras en aumento
let countShowArt = 12;

export default {
    data() {
        return {
            // todas las obras publicadas
            artworkPublished: [],
            originalArtworksPublished: [],

            // obras restantes
            remainingArtworks: [],

            // loading de carga
            loadArtworkPublished: false,

            filters: {
                category: 0,
                subcategory: 0,
                label: 0,
                price: 0,
                width: 0,
                large: 0,
                weight: 0,
                sortBy: "",
            },

            sortBy: [
                {
                    val: 1,
                    text: "MAS RECIENTE",
                },
                {
                    val: 2,
                    text: "DESTACADA",
                },
                {
                    val: 3,
                    text: "PRECIO",
                },
            ],
        };
    },
    computed: {
        /**
         * Verifica si hay una categoría y subcategoria seleccionada
         *
         * @returns
         */
        hasSubAndCategory() {
            return this.filters.category && this.filters.subcategory;
        },
    },
    methods: {
        /**
         *Obtiene las obras publicadas de todos los usuarios
         */
        getArtworkPublished() {
            this.loadArtworkPublished = true;
            this.axios
                .get(this.ep.artworks.getPublish)
                .then(async (resp) => {
                    // obras publicadas - originales
                    this.originalArtworksPublished = await JSON.parse(
                        JSON.stringify(resp.data)
                    );

                    // obras publicadas
                    this.artworkPublished = await resp.data;

                    // guardar las restantes
                    // solo mostrar countShowArt
                    this.remainingArtworks =
                        this.artworkPublished.splice(countShowArt);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => (this.loadArtworkPublished = false));
        },

        /**
         * Filtra las obras publicadas según los filtros
         * del DOM seleccionados
         */
        getFilterArtworkPublished() {
            this.loadArtworkPublished = true;
            this.axios
                .post(this.ep.artworks.filterPublished, this.filters)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.artworkPublished = resp.data;
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loadArtworkPublished = false));
        },

        /**
         * Carga la categoría literatura al filtro de búsqueda
         * esto para cuando inicie el componente sea con una categoría
         * marcada por defecto
         */
        loadOneCategory() {
            // 1 => literatura
            this.filters.category = 1;
        },
    },
};
