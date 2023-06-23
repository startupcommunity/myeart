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

        /**
         * Verificar si la pantalla esta en modo responsive md
         */
        isMd() {
            return this.$vuetify.breakpoint.md;
        },

        /**
         * Verificar si la pantalla esta en modo responsive sm
         */
        isSm() {
            return this.$vuetify.breakpoint.sm;
        },

        /**
         * Verificar si la pantalla esta en modo responsive lg
         */
        isLg() {
            return this.$vuetify.breakpoint.lg;
        },

        /**
         * Verificar si la pantalla esta en modo responsive xs
         */
        isXs() {
            return this.$vuetify.breakpoint.xs;
        },

        /**
         * Verificar todos los responsives pequeños
         */
        isSmall() {
            return this.isSm || this.isMd || this.isLg;
        },

        /**
         * Si esta en modo mobile
         */
        isMobileMode() {
            return this.isXs;
        },

        /**
         * Obtiene el usuario logueado actual
         */
        authUser() {
            return this.$store.getters.getProfile;
        },

        /**
         * Devuelve si el usuario no esta logueado
         */
        isUserGuest() {
            return (
                this.authUser?.id === undefined ||
                this.authUser?.id === null ||
                this.authUser?.id === "" ||
                this.authUser?.id === 0
            );
        },

        /**
         * Mostrar mensaje sino ha iniciado sesión
         *
         * @returns     Notification
         */
        messageGuest() {
            return this.noty("Debe iniciar sesión", "warning");
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

        /**
         * Devuelve la imagen de portada de una obra
         * en caso de no existir ninguna se devuelve
         * una imagen por defecto
         */
        getFrontArtwork(art) {
            const artwork = art.artwork || {};
            const gallery = artwork?.gallery || [];
            const front_page = gallery.find((pic) => pic?.front_page === 1);
            if (!gallery.length) return this.getURLDefaultFrontArtwork;
            return `${this.pathArtworkGallery + front_page.picture}`;
        },

        /**
         * Devuelve el numero de orden
         * de un pedido u orden de compra
         */
        getOrderNumber(id) {
            return "000" + id;
        },

        /**
         * devuelve la fecha de una orden de compra
         *
         * Formato: 7 de enero de 2023
         */
        getOrderDate(created_at) {
            const date = new Date(created_at);

            // const day = date.toLocaleString("es-ES", { weekday: "long" });
            const dayNumber = date.toLocaleString("es-ES", { day: "numeric" });
            const month = date.toLocaleString("es-ES", { month: "long" });
            const year = date.toLocaleString("es-ES", { year: "numeric" });

            // nombre de dia y meses en PascalCase
            const monthPascal = month.charAt(0).toUpperCase() + month.slice(1);

            // imprimir el formato, ejemplo: 7 de enero de 2023
            return `${dayNumber} de ${monthPascal} de ${year}`;
        },

        /**
         * Verifica si el usuario ingreso los datos
         * de la tarjeta de crédito correctamente
         *
         * @param {Object} error
         * @returns
         */
        manageStripeErrors(error) {
            if (error?.code) {
                switch (error.code) {
                    case "card_declined":
                        return "La tarjeta ha sido rechazada";
                    case "incomplete_zip":
                        return "El código postal es incorrecto";
                    case "incomplete_cvc":
                        return "El código de seguridad es incorrecto";
                    case "incomplete_expiry":
                        return "La fecha de expiración es incorrecta";
                    case "incomplete_number":
                        return "El número de tarjeta es incorrecto";
                    case "expired_card":
                        return "La tarjeta ha expirado";
                    case "incorrect_cvc":
                        return "El código de seguridad es incorrecto";
                    case "incorrect_number":
                        return "El número de tarjeta es incorrecto";
                    case "invalid_cvc":
                        return "El código de seguridad es inválido";
                    case "invalid_expiry_month":
                        return "El mes de expiración es inválido";
                    case "invalid_expiry_year":
                        return "El año de expiración es inválido";
                    case "invalid_number":
                        return "El número de tarjeta es inválido";
                    case "missing":
                        return "Falta un campo requerido";
                    case "processing_error":
                        return "Error al procesar el pago";
                    case "rate_limit":
                        return "Demasiadas solicitudes en un periodo de tiempo";
                    default:
                        return "Error desconocido, verifique los datos de la tarjeta";
                }
            }

            return "Error desconocido, verifique los datos de la tarjeta";
        },
    },
};
