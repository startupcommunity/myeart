/**
 * Mixin para gestionar las propiedades y métodos
 * que son de utilidad para subir y validar las imagenes
 *  de la galeria de obras del usuario
 */

const MAX_FILES_ALLOWED = 10;

export default {
    data() {
        return {
            previewFiles: [],
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
            let invalidFiles = [];

            arrayFiles.forEach((file) => {
                if (validFiles.includes(file.type)) {
                    validUploadFiles.push(file);
                } else {
                    invalidFiles.push(file);
                }
            });

            if (invalidFiles.length) {
                return this.$notify({
                    title: "Aviso!",
                    text: "Uno o mas archivos son inválidos, verifique!",
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
            // archivos validos
            files.forEach((file) => this.uploadedFiles.push(file));

            // limite de hasta 10 archivos
            this.limitFiles();

            // carga vista previa
            this.loadPreviewFile();
        },

        /**
         * Limita los archivos cargados a solo 4
         * solo esta permitido subir max 4 archivos
         */
        limitFiles() {
            if (this.uploadedFiles.length > MAX_FILES_ALLOWED) {
                this.uploadedFiles.splice(MAX_FILES_ALLOWED);
                this.$notify({
                    title: "Aviso!",
                    text: `Solo puede cargar un máximo de ${MAX_FILES_ALLOWED} imágenes`,
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
            this.previewFiles = [];
            this.uploadedFiles.forEach((file, index) => {
                const objectUrl = URL.createObjectURL(file);
                this.previewFiles.push({
                    id: index,
                    file: objectUrl,
                });
            });
        },

        /**
         * Elimina todas las preview de imagenes cargadas
         * esto antes después de cargar la propiedad uploadedFiles
         */
        resetPreviewFiles() {
            this.previewFiles = [];
        },

        /**
         * Elimina un file por medio de su indice
         * ademas, recargar la vistas previas
         * y valida si mostrar o no la zona de carga de files
         */
        deleteFile(index) {
            // eliminar
            this.uploadedFiles.splice(index, 1);

            // reset de las vistas previas
            this.resetPreviewFiles();

            // recargar las vistas previas
            this.loadPreviewFile();
        },

        /**
         * Devuelve todos los valores al inicio
         */
        resetUpload() {
            this.resetPreviewFiles();
            this.uploadedFiles = [];
            this.dropzoneFile = true;
        },
    },
};
