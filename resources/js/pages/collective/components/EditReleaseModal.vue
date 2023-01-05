<template>
    <div class="text-center">
        <v-dialog v-model="show" width="800" persistent>
            <v-card>
                <v-card-text>
                    <div class="w-full py-5">
                        <div class="flex flex-col space-y-5">
                            <div class="w-full relative" v-if="form.image">
                                <img
                                    :src="getImage"
                                    class="w-full h-full object-cover object-center aspect-video"
                                    :alt="'release' + release.id"
                                />

                                <!-- botón para eliminar -->
                                <div
                                    class="absolute top-0 right-0 p-2 bg-zinc-900/60 rounded-bl-md"
                                >
                                    <v-btn text @click.stop="deleteImage">
                                        <i
                                            class="fa-solid fa-trash text-white"
                                        ></i>
                                    </v-btn>
                                </div>
                            </div>
                            <div class="w-full" v-else>
                                <AnkaCropper
                                    :options="ankaOptions"
                                    @cropper-error="errorCropper"
                                    @cropper-saved="validateAndConfirm"
                                    class="anka-release"
                                />
                            </div>
                            <div class="w-full">
                                <v-textarea
                                    filled
                                    label="Escribe un pie para tu foto"
                                    v-model="form.text"
                                    color="#B2794C"
                                ></v-textarea>
                            </div>
                            <div
                                class="w-full flex justify-start items-center gap-2"
                            >
                                <i class="fa-solid fa-user-plus"></i>
                                <v-autocomplete
                                    v-model="form.labels"
                                    deletable-chips
                                    multiple
                                    small-chips
                                    label="Etiqueta a tus amigos"
                                    item-value="following.id"
                                    item-text="following.username"
                                    :items="artists"
                                    color="#B2794C"
                                    item-color="#B2794C"
                                ></v-autocomplete>
                            </div>
                            <div
                                class="w-full flex justify-start items-center gap-2"
                            >
                                <i class="fa-solid fa-location-pin"></i>
                                <v-text-field
                                    v-model="form.location"
                                    label="Añade tu ubicación"
                                    color="#B2794C"
                                ></v-text-field>
                            </div>

                            <div class="w-full flex justify-center gap-5">
                                <v-btn
                                    class="text-white"
                                    depressed
                                    large
                                    @click.prevent="buttonClick"
                                    color="#B2794C"
                                    :loading="globalLoading"
                                    :disabled="!formIsValid || globalLoading"
                                >
                                    Actualizar
                                </v-btn>
                                <v-btn
                                    depressed
                                    large
                                    @click.stop="$emit('close-modal')"
                                    :disabled="!formIsValid || globalLoading"
                                >
                                    Cancelar
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import AnkaCropper from "vue-anka-cropper";
export default {
    name: "EditReleaseModal",
    components: { AnkaCropper },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        release: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            loading: false,
            formIsValid: true,
            deleteFile: false,
            artists: [],
            croppedFile: "",
            form: {
                id: "",
                image: "",
                text: "",
                labels: [],
                location: "",
                type: 2,
            },
            ankaOptions: {
                aspectRatio: 1.5,
                closeOnSave: false,
                cropArea: "box",
                croppedHeight: 800,
                croppedWidth: 800,
                cropperHeight: false,
                dropareaMessage: "Arrastre la imagen aquí",
                frameLineDash: [5, 3],
                frameStrokeColor: "rgba(255, 255, 255, 255)",
                handleFillColor: "rgba(255, 255, 255, 255)",
                handleHoverFillColor: "rgba(255, 255, 255, 255)",
                handleHoverStrokeColor: "rgba(255, 255, 255, 255)",
                handleSize: 5,
                handleStrokeColor: "rgba(255, 255, 255, 255)",
                layoutBreakpoint: 850,
                maxCropperHeight: 1200,
                maxFileSize: 80000000000,
                overlayFill: "rgba(0, 0, 0, 0.5)",
                previewOnDrag: false,
                previewQuality: 0.65,
                resultQuality: 0.8,
                resultMimeType: "image/jpeg",
                selectButtonLabel: "Seleccionar del ordenador",
                showPreview: false,
                skin: "light",
                uploadData: {},
                uploadTo: false,
            },
        };
    },

    watch: {
        show(val) {
            if (val) {
                this.getFASI();
            }
        },
    },

    computed: {
        getImage() {
            const image = this.release?.image;

            if (!image) return this.getDefaultImageRelease;

            return `${this.pathReleaseImage + image}`;
        },
    },

    methods: {
        /**
         * Devuelve los artistas seguidos por el usuario,
         * con la info corta y justa
         */
        getFASI() {
            this.loading = true;
            const ep = this.ep.user.getFASI;

            this.axios
                .get(ep)
                .then((resp) => (this.artists = resp.data))
                .then((resp) => this.loadData())
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Carga los datos de la publicación
         */
        loadData() {
            this.form.id = this.release.id;
            this.form.text = this.release.text;
            this.form.location = this.release.location;
            this.form.image = this.release.image;
            this.form.type = this.release.type;

            // obtener los ids de los artistas etiquetados
            const ids = this.release.labels.map((label) => label.friend_id);
            this.form.labels = ids;
        },

        /**
         * Elimina la imagen de la publicación
         */
        deleteImage() {
            this.form.image = "";
            this.deleteFile = true;
        },

        /**
         * Algún error al cargar el archivo
         */
        errorCropper(error) {
            this.noty("Error al carga el archivo [" + error + "]", "error");
        },

        /**
         * Dar click al botón para guardar la imagen cargada y recortada
         * y los datos adicionales del formulario
         */
        buttonClick() {
            if (!this.deleteFile) {
                this.validateAndConfirm();
                return;
            }

            const btn = document.querySelector('.anka-release a[title="Save"]');
            if (!btn) return;
            btn.click();
        },

        /**
         * valida y confirma los datos del formulario
         *
         * @param {File} file
         */
        validateAndConfirm(file) {
            this.croppedFile = file;
            this.validateData();
            if (!this.formIsValid) return;

            this.confirmUpdate();
        },

        /**
         * Valida Los datos del formulario
         */
        validateData() {
            this.formIsValid = true;
            const form = this.form;
            const firstCase = !form.image && !this.croppedFile;

            if (firstCase) {
                this.noty("Debe seleccionar una imagen", "error");
                this.formIsValid = false;
            }

            if (!form.text || form.text.length < 1) {
                this.noty("Debe indicar un texto descriptivo", "error");
                this.formIsValid = false;
            }

            if (!form.location || form.location.length < 1) {
                this.noty("Debe indicar una ubicación", "error");
                this.formIsValid = false;
            }
        },

        /**
         * Confirmar y guardar o rechazar
         */
        confirmUpdate() {
            // ejecutar swalert de confirm
            this.confirmedDialog({
                title: "¿Estás seguro de actualizar esta publicación?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                confirmButtonText: "Si, actualizar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.globalLoading = true;
                    const file = this.croppedFile;
                    const form = this.form;
                    const labels = this.form.labels;
                    const data = new FormData();
                    const ep = this.ep.releases.update + form.id;

                    // imagen cortada
                    const image = this.deleteFile
                        ? new File([file.croppedFile], file.croppedFile.name)
                        : null;

                    // datos para el backend
                    data.append("_method", "PUT");
                    data.append("image", image);
                    data.append("text", form.text);
                    data.append("location", form.location);
                    data.append("type", form.type);
                    labels.forEach((label) => data.append(`labels[]`, label));

                    this.axios
                        .post(ep, data, this.headerFormData)
                        .then((_) => {
                            this.notySwal({
                                title: "Éxito!",
                                text: "La publicación ha sido actualizada y publicada con éxito",
                                icon: "success",
                            });

                            this.$emit("updated");
                        })
                        .catch((error) => this.manageError(error))
                        .finally(() => (this.globalLoading = false));
                }
            });
        },
    },
};
</script>
