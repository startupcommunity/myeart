const COUNTER_ART_PUB = 6;

export default {
    data() {
        return {
            // todas las obras publicadas
            artworkPublished: [],
            originalArtPub: [],

            // obras restantes
            remainingArt: [],

            // loading de carga
            loadArtworkPublished: false,

            // mostrar o no el modal de opciones
            // para filtrar, solo para mobile
            showOptionModal: false,

            // counter de obras
            counter: COUNTER_ART_PUB,

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

        /**
         * si se puede mostrar el botón de ver mas resultados o no
         *
         * @returns
         */
        showBtnMore() {
            return (
                this.artworkPublished.length > this.SHOW_ARTWORKS &&
                this.remainingArt.length
            );
        },
    },
    methods: {
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
                        this.counter = COUNTER_ART_PUB;

                        // copia original - originales
                        this.originalArtPub = JSON.parse(
                            JSON.stringify(resp.data)
                        );

                        // mostrar al front
                        this.artworkPublished = resp.data;

                        // carga las restantes
                        const rmg = this.artworkPublished.splice(this.counter);
                        this.loadRemainingArtworks(rmg);
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loadArtworkPublished = false));
        },

        /**
         * Va mostrando la cantidad de ($count) las obras cargadas
         */
        showMoreArtworks(count) {
            // counter
            this.counter += count;

            // obras originales
            const originalData = this.originalArtPub;

            // obtiene las obras restantes y acorta
            const remaining = originalData.splice(this.counter);
            this.artworkPublished = originalData;

            this.loadRemainingArtworks(remaining);
        },

        /**
         * Cargar las obras restantes cada vez que se actualiza
         * la lista de obras por medio de algún evento
         */
        loadRemainingArtworks(remaining) {
            this.remainingArt = remaining;
        },

        /**
         * Indica como debe ser la primera carga de obras
         * según los filtros por defecto
         */
        initArtworks() {
            // 1 => mas reciente
            this.filters.sortBy = 1;
        },
    },
};
