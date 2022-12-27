export default {
    computed: {
        /**
         * Fecha máxima permitida para el picker de fecha de nacimiento
         *
         * toma la fecha actual y la convierte en un formato aceptado
         * por el picker
         */
        dateMaxPicker() {
            const date = new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            );
            return date.toISOString().substr(0, 10);
        },

        /**
         * Devuelve la fecha actual en el formato indicado
         */
        actualDate(format = "Y-m-d") {
            const date = new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            );

            return date.toISOString().substr(0, 10);
        },
    },

    methods: {
        /**
         * Devuelve el icono que corresponde según
         * el nombre de la categoría
         * @param {String} name
         * @returns         LA clase del icono
         */
        setIcon(name) {
            if (name == "Literatura") {
                return "fas fa-book";
            }

            if (name == "Pintura") {
                return "fas fa-palette";
            }

            if (name == "Escultura") {
                return "fas fa-hanukiah";
            }

            if (name == "Dibujo") {
                return "fas fa-pencil";
            }

            if (name == "Fotografía") {
                return "fas fa-camera";
            }

            if (name == "Artesanía y Manualidades") {
                return "fas fa-glass-water";
            }

            if (name == "Audios") {
                return "fas fa-volume-up";
            }

            if (name == "Arte Digital") {
                return "fas fa-square-pen";
            }

            if (name == "Otros") {
                return "fas fa-plus";
            }

            if (name == "Libros") {
                return "fas fa-book-reader";
            }

            return "fas fa-info";
        },

        /**
         * Devuelve una fecha en el formato indicado
         * @param {String} string
         * @param {String} format
         * @returns
         */
        dateFormat(string, format = "Y-m-d") {
            const date = new Date(string);

            return (
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate()
            );
        },

        /**
         * Devuelve un archivo file en formato entendible para el front
         */
        async getFileImage(path, { id, picture }) {
            const config = { responseType: "blob" };
            return await this.axios(path, config).then(async (response) => {
                const contentType = response.headers["content-type"];
                const blob = await response.data;
                const file = new File([blob], picture, {
                    contentType,
                });

                // obtener datos de la imagen
                const endpoint = this.ep.artworks.getImage + id;
                const image = await this.axios.get(endpoint);
                const data = await image.data;
                return { file, front: data.front_page };
            });
        },

        /**
         * Copia en el portapapeles el texto indicado
         *
         * @param {String} text      texto a ser copiado
         */
        copyToClipboard(text) {
            // opción 1 - execCommand
            if (!navigator.clipboard) {
                let textArea = document.createElement("textarea");
                textArea.value = text;

                // Avoid scrolling to bottom
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";

                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);

                return this.noty("Copiado al portapapeles");
            }

            // opción 2 - navigator
            navigator.clipboard.writeText(text).then(
                function () {
                    console.log("Async: Copying to clipboard was successful!");
                },
                function (err) {
                    console.error("Async: Could not copy text: ", err);
                }
            );
            this.noty("Copiado al portapapeles");
        },

        /**
         * Comparte una obra públicamente
         */
        sharePublicArtwork(artwork) {
            const url = this.secureUrl;
            const slug = artwork.slug ?? "";
            const route = "/obras/slug/" + slug;
            const text = url + route;
            this.copyToClipboard(text);
        },

        /**
         * Agrupa un array de acuerdo al callback indicado
         *
         * @param {Array} arr                       Array de datos
         * @param {CallableFunction} keyGetter      función callback o key
         * @returns Array agrupado por la key
         */
        groupBy(arr, keyGetter) {
            const map = new Map();
            arr.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        },

        /**
         * devuelve los calificativos del artista
         * según las categorías de sus obras
         */
        getArtistQualifying(artist, max = null, one = false) {
            const artworks = artist?.artworks ?? [];
            const categories = artworks.map((artwork) => {
                return artwork?.categories?.map((category) => {
                    return category.qualified;
                });
            });

            // eliminar las redundancias
            const categoriesUnique = categories
                .flat()
                .filter((v, i, a) => a.indexOf(v) === i);

            // si solo se quiere un calificativo
            if (one) {
                return categoriesUnique[0];
            }

            // si max es tiene valor, se devuelven los primeros indicados
            if (max) {
                return categoriesUnique.slice(0, max).join(", ");
            }

            return categoriesUnique.join(", ");
        },

        /**
         * Filtrar el texto de la publicación, para
         * convertir los hashtags en un router-link
         * con class text-primary
         *
         * @param {String} text
         */
        hashTag(text) {
            const regex = /#(\w+)/g;
            const matches = text.match(regex);
            if (!matches) return text;
            const result = text.replace(regex, (match) => {
                // match sin el #
                const matchWithoutHash = match.replace("#", "");

                // result
                return `<a class="text-primary" href="/comunidad/${matchWithoutHash}">${match}</a>`;
            });

            // agregar un solo br al momento de encontrar
            // el primer hashtag
            return result.replace(/<a/, "<br><a");
        },
    },
};
