import { tns } from "tiny-slider";
import getDataMixin from "../../../mixins/getDataMixin";
import utilMixin from "../../../mixins/utilMixin";

const INIT_ARTIST_PER_PAGE = 8;
let addArtist = 3;

export default {
    mixins: [getDataMixin, utilMixin],
    data() {
        return {
            // loading para los cuando cargan los artistas
            loadingArtist: false,

            // muestra o no la modal de filtros
            showFilterModal: false,

            // aspect mobile
            aspectMobile: false,

            // total de registros recibidos del backend
            totalRecords: 0,

            // mostrar la pagina
            showPage: 1,

            filters: {
                category: 0,
                subcategory: 0,
                label: 0,
                all: 0,
            },

            // colección de artistas
            artists: [],

            // colección original de artistas
            originalArtists: [],

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

        /**
         * Verifica si hay artistas que mostrar
         */
        hasShowArtists() {
            return this.artists.length !== this.totalRecords;
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

            const params = { params: this.filters };

            const ep = !this.isUserGuest
                ? this.ep.user.getArtists
                : this.ep.user.getGuestArtists;

            this.axios
                .get(ep, params)
                .then((resp) => {
                    const availableArtists = resp.data.data.filter((artist) => {
                        const art = this.filterByTypeAndStatus(artist);
                        if (art.length) {
                            const user = artist;
                            return (user.artworks = art);
                        }
                    });

                    this.artists = availableArtists;
                    this.totalRecords = availableArtists.length;

                    // solo para vista mobile
                    if (this.aspectMobile) {
                        this.originalArtists = JSON.parse(
                            JSON.stringify(availableArtists)
                        );

                        // aumentar los artistas a mostrar
                        const ADD_COUNT = addArtist + this.artists.length;
                        this.artists = this.originalArtists.slice(0, ADD_COUNT);
                        addArtist += 3;
                    }

                    return this.artists;
                })
                .then((_) => {
                    // si estamos en mobile
                    // cargar el modo row
                    if (globalThis.innerWidth < 450) {
                        this.loadMode(this.modeCard.row);
                        return;
                    }

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
            this.mode.row = true;
            this.mode.col = false;

            // init TNS
            this.artists.forEach((art) => {
                if (art.artworks.length) {
                    // console.log(art);
                    this.showTNS("#row-artist-" + art.id);
                    this.showTNS("#row-artist-mobile-" + art.id);
                }
            });

            // eliminar obras duplicadas en la visualización
            // de las tarjetas
            const divArtwork =
                document.getElementsByClassName("artwork-container");
            for (let i = 0; i < divArtwork.length; i++) {
                const div = divArtwork[i];

                // obtener el id de la obra por medio del dataset
                const id = div.dataset.artid;

                // obtener el elemento con el mismo id
                const el = document.querySelector(`[data-artid="${id}"]`);

                // si existe mas de uno, eliminarlo y dejar solo uno
                if (el && el === div) {
                    el.remove();
                }
            }
        },

        /**
         * cargar datos cuando se monte el componente
         */
        initData() {
            this.loadArtist();
        },

        /**
         * Carga mas artistas
         */
        loadMoreArtist() {
            // mostrar mas card de artistas
            // sin perder los artistas previos
            this.filters.all = 1;

            this.aspectMobile = true;

            this.loadArtist();
        },

        /**
         * Filtrar por tipo de obra y por estado de la obra
         *
         * @param {Object} artist
         * @returns Array
         */
        filterByTypeAndStatus(artist) {
            const data = artist.artworks.filter(
                (a) => a.state === 1 && a.type === 1
            );
            return data;
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
