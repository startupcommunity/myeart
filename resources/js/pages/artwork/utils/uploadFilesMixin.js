/**
 * Mixin para gestionar las propiedades y métodos
 * que son de utilidad para subir y validar las imagenes
 *  de la galeria de obras del usuario
 */

const MAX_FILES_ALLOWED = 4;

export default {
    data() {
        return {
            previewFiles: {
                one: "",
                two: "",
                three: "",
                four: "",
            },
            uploadedFiles: [],
            dropzoneFile: true,
            dragover: false,
        };
    },
    methods: {
        /**
         * Obtiene los files a través del drag and drop
         * luego valida cada uno de los files
         */
        onDrop(e) {
            this.dragover = false;
            this.validateFiles(e.dataTransfer.files);
        },

        /**
         * Obtiene los files a través de la selección del botón
         * luego valida cada uno de los files
         */
        getFiles(e) {
            this.validateFiles(e.target.files);
        },

        /**
         * Valida los archivos permitidos antes de ser cargados
         * o mostrados en pantalla
         * validos: jpg, png, svg
         */
        validateFiles(files) {
            const validFiles = [
                "image/png",
                "image/jpeg",
                "image/svg+xml",
                "image/gif",
            ];
            const arrayFiles = Object.values(files);
            let validUploadFiles = [];

            arrayFiles.forEach((file) => {
                if (validFiles.includes(file.type)) {
                    validUploadFiles.push(file);
                }
            });

            if (!validUploadFiles.length) {
                this.dropzoneFile = true;
                this.uploadedFiles = [];
                this.resetPreviewFiles();
                return this.$notify({
                    title: "Aviso!",
                    text: "Los archivos seleccionados son inválidos",
                    group: "container",
                    type: "warning",
                    duration: 6000,
                });
            }

            this.addFilesToUploadFiles(validUploadFiles);
        },

        /**
         * Carga los archivos validos a la propiedad uploadedFiles
         * - limita la cantidad de archivos
         * - carga la vista previa de imagenes
         */
        addFilesToUploadFiles(files) {
            this.uploadedFiles = [];

            // archivos validos
            files.forEach((file) => this.uploadedFiles.push(file));

            // limite de hasta 4 archivos
            this.limitFilesToFour();

            // carga vista previa
            this.loadPreviewFile();
        },

        /**
         * Limita los archivos cargados a solo 4
         * solo esta permitido subir max 4 archivos
         */
        limitFilesToFour() {
            if (this.uploadedFiles.length > MAX_FILES_ALLOWED) {
                this.uploadedFiles.splice(MAX_FILES_ALLOWED);
                this.$notify({
                    title: "Aviso!",
                    text: `Solo se tomarán en cuenta las primeras ${MAX_FILES_ALLOWED} imágenes`,
                    group: "container",
                    type: "info",
                    duration: 6000,
                });
            }
        },

        /**
         * Mostrar las imagenes previamente cargadas
         * esto para indicarle al usuario como quedara
         * la posición de cada una, incluyendo la de portada
         */
        loadPreviewFile() {
            this.resetPreviewFiles();
            this.dropzoneFile = false;

            this.uploadedFiles.forEach((file, index) => {
                if (index === 0) {
                    this.previewFiles.one = URL.createObjectURL(file);
                }

                if (index === 1) {
                    this.previewFiles.two = URL.createObjectURL(file);
                }

                if (index === 2) {
                    this.previewFiles.three = URL.createObjectURL(file);
                }

                if (index === 3) {
                    this.previewFiles.four = URL.createObjectURL(file);
                }
            });
        },

        /**
         * Elimina todas las preview de imagenes cargadas
         * esto antes después de cargar la propiedad uploadedFiles
         */
        resetPreviewFiles() {
            this.previewFiles.one = "";
            this.previewFiles.two = "";
            this.previewFiles.three = "";
            this.previewFiles.four = "";
        },

        /**
         * Elimina un file por medio de su indice
         * ademas, recargar la vistas previas
         * y valida si mostrar o no la zona de carga de files
         */
        deleteFile(index) {
            // eliminar
            this.uploadedFiles.splice(index, 1);

            // recargar las vistas previas
            this.loadPreviewFile();

            // mostrar o no la zona para cargar files
            this.dropzoneFile = this.uploadedFiles.length === 0;
        },

        /**
         * Devuelve todos los valores al inicio
         */
        resetUpload() {
            this.resetPreviewFiles();
            this.dropzoneFile = true;
            this.uploadedFiles = [];
        },
    },
};
