import { tns } from "tiny-slider";
import getDataMixin from "../../../mixins/getDataMixin";

const INIT_ARTIST_PER_PAGE = 8;

export default {
    mixins: [getDataMixin],
    data() {
        return {
            // loading para los cuando cargan los artistas
            loadingArtist: false,

            // muestra o no la modal de filtros
            showFilterModal: false,

            // total de registros recibidos del backend
            totalRecords: 0,

            // mostrar la pagina
            showPage: 1,

            filters: {
                category: 0,
                subcategory: 0,
                label: 0,
            },

            // colección de artistas
            artists: [],

            // indica como se debe ver las tarjeta
            // de los artistas
            modeCard: {
                col: 1,
                row: 2,
            },

            // indica el modo de visualización
            // de las tarjetas
            mode: {
                col: true,
                row: false,
            },
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
         * Devuelve la cantidad de obras para mostrar por pagina
         *
         * @returns Number
         */
        showPerPage() {
            return INIT_ARTIST_PER_PAGE;
        },

        /**
         * Total de paginas a cargar en la paginación
         * @returns Number
         */
        totalPages() {
            return this.totalRecords / this.showPerPage;
        },

        /**
         * Verifica si hay artistas que mostrar
         *
         * @returns Boolean
         */
        hasArtists() {
            return this.artists.length;
        },
    },
    watch: {
        filters: {
            handler(_) {
                // reset de la pagina a mostrar
                this.resetShowPage();
            },
            deep: true,
        },

        // cargar las subcategorias unicamente
        // cuando el valor se la categoría cambie
        "filters.category"(val) {
            if (val) {
                // @getDataMixin
                this.getSubCategories(val);
            }

            this.filters.label = 0;

            // @this
            this.loadArtist();
        },

        "filters.label"(val) {
            this.loadArtist();
        },
    },
    methods: {
        /**
         * Cargar los artistas
         */
        loadArtist() {
            this.loadingArtist = true;

            this.filters.page = this.showPage;

            const params = {
                params: this.filters,
            };

            this.axios
                .get(this.ep.user.getArtists, params)
                .then((resp) => {
                    this.totalRecords = resp.data.total;
                    this.artists = resp.data.data;
                    this.loadMode(this.modeCard.col);
                })
                .catch((error) => console.error(error))
                .finally(() => (this.loadingArtist = false));
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
            const top = globalThis.innerWidth < 450 ? 170 : 240;
            this.toScrollTo(null, top);

            this.loadArtist();
        },

        /**
         * indica como se debe mostrar las tarjetas de los artistas
         * @param {Int} mode        El modo a cargar
         */
        loadMode(mode) {
            // modo columna
            if (this.modeCard.col === mode) {
                this.mode.col = true;
                this.mode.row = false;
                return;
            }

            // modo fila
            this.loadingArtist = true;
            this.mode.row = true;
            this.mode.col = false;

            // init TNS
            this.artists.forEach((art, index) => {
                if (art.artworks.length) {
                    this.showTNS("#row-artist-" + art.id);
                }

                // detener loading
                if (index === this.artists.length - 1) {
                    this.loadingArtist = false;
                }
            });
        },

        /**
         * cargar datos cuando se monte el componente
         */
        initData() {
            this.loadArtist();
        },

        /**
         * Iniciar el carousel
         */
        showTNS(id) {
            tns({
                container: id,
                mode: "carousel",
                speed: 400,
                gutter: 20,
                items: 5,
                autoplay: false,
                mouseDrag: true,
                autoplayButtonOutput: false,
                autoplayHoverPause: true,
                lazyload: true,
                controls: false,
                fixedWidth: 240,
                responsive: {
                    0: {
                        items: 1,
                        edgePadding: 5,
                    },
                    500: {
                        items: 2,
                        edgePadding: 5,
                    },
                    1000: {
                        items: 3,
                        edgePadding: 5,
                    },
                    1200: {
                        items: 4,
                        edgePadding: 5,
                    },
                    1500: {
                        items: 5,
                        edgePadding: 0,
                    },
                },
            });
        },
    },
};
