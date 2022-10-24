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
        };
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
                    this.remainingArtworks = this.artworkPublished.splice(countShowArt);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => (this.loadArtworkPublished = false));
        },
    },
};
