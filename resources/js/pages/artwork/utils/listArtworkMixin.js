import getDataMixin from "../../../mixins/getDataMixin";

const COUNTER_ART_PUB = 6;

export default {
    mixins: [getDataMixin],
    data() {
        return {
            // todas las obras publicadas
            artworkPublished: [],

            // loading de carga
            loadArtworkPublished: false,

            // mostrar o no el modal de opciones
            // para filtrar, solo para mobile
            showOptionModal: false,

            // total de registros recibidos del backend
            totalRecords: 0,

            // mostrar la pagina
            showPage: 1,

            filters: {
                category: 0,
                subcategory: 0,
                label: 0,
                price: 0,
                width: 0,
                large: 0,
                weight: 0,
                sortBy: "",
                keyword: "",
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
         * Verifica si hay una categoría seleccionada
         *
         * @returns
         */
        hasCategory() {
            return this.filters.category ? true : false;
        },

        /**
         * Devuelve la cantidad de obras para mostrar por pagina
         *
         * @returns Number
         */
        showPerPage() {
            return COUNTER_ART_PUB;
        },

        /**
         * Total de paginas a cargar en la paginación
         * @returns Number
         */
        totalPages() {
            return this.totalRecords / this.showPerPage;
        },
    },
    watch: {
        filters: {
            handler(filter) {
                // reset de la pagina a mostrar
                this.resetShowPage();

                // @this
                this.getFilterArtworkPublished();
            },
            deep: true,
        },

        // cuando la subcategoria cambia
        // se resetea el valor de la etiqueta
        "filters.subcategory"() {
            this.filters.label = 0;
            this.filters.keyword = "";
        },

        // cargar las subcategorias unicamente
        // cuando el valor se la categoría cambie
        "filters.category"(val) {
            if (val) {
                // @getDataMixin
                this.filters.keyword = "";
                this.getSubCategories(val);
            }
        },
    },
    methods: {
        /**
         * Filtra las obras publicadas según los filtros
         * del DOM seleccionados
         */
        getFilterArtworkPublished() {
            // loading
            this.loadArtworkPublished = true;

            // indicar la pagina a mostrar
            this.filters.page = this.showPage;

            this.axios
                .post(this.ep.artworks.filterPublished, this.filters)
                .then(async (resp) => {
                    if (resp.status === 200) {
                        // copia original - originales
                        this.artworkPublished = await resp.data.data;

                        // registros totales
                        this.totalRecords = await resp.data.total;
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loadArtworkPublished = false));
        },

        /**
         * Indica como debe ser la primera carga de obras
         * según los filtros por defecto
         */
        initArtworks() {
            // verificar si hay query params
            const keyword = this.checkQueryParams();

            if (keyword) {
                this.filters.keyword = keyword;
                return;
            }

            // 1 => mas reciente
            this.filters.sortBy = 1;
        },

        /**
         * Verificar si hay query params
         * en la url
         */
        checkQueryParams() {
            const params = new URLSearchParams(window.location.search);
            const keyword = params.get("keyword");
            return keyword ?? null;
        },

        /**
         * Reset de la pagina a mostrar
         */
        resetShowPage() {
            this.showPage = 1;
        },

        /**
         * Cambia a la pagina indicada y realiza la consulta
         * al backend
         * @param {Number} page Numero de la pagina a mostrar
         */
        loadPage(page) {
            this.showPage = page;
            const top = globalThis.innerWidth < 450 ? 170 : 490;
            this.toScrollTo(null, top);

            this.getFilterArtworkPublished();
        },
    },
};
