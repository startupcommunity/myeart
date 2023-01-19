<template>
    <div class="text-center">
        <v-dialog
            v-model="show"
            width="800"
            persistent
            :content-class="contentClass"
            :fullscreen="fullScreen"
        >
            <v-card>
                <v-card-text>
                    <div
                        class="w-full"
                        :class="{
                            'pt-10 md:p-10': fullScreen,
                            'py-5': !fullScreen,
                        }"
                    >
                        <div class="flex flex-col space-y-5">
                            <div class="w-full">
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
                                    item-text="following.name"
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
                                    Publicar
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
    name: "CreateReleaseModal",
    components: { AnkaCropper },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        collectiveID: {
            type: Number | String,
            default: null,
        },
        type: {
            type: Number | String,
            default: null,
            description:
                "1: publicación de artista, 2: publicación de colectivo",
        },
        contentClass: {
            type: String,
            default: "",
            description: "Clase para el contenido del modal",
        },
        fullScreen: {
            type: Boolean,
            default: false,
            description: "Modal en pantalla completa",
        },
    },
    data() {
        return {
            loading: false,
            formIsValid: true,
            artists: [],
            croppedFile: "",
            form: {
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
    created() {
        this.getFASI();
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
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
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
            this.validateData(file);
            this.croppedFile = file;
            if (!this.formIsValid) return;

            this.confirmSave();
        },

        /**
         * Valida Los datos del formulario
         */
        validateData(file) {
            this.formIsValid = true;
            const form = this.form;
            if (!file) {
                this.noty("Debe seleccionar una imagen", "error");
                this.formIsValid = false;
            }

            if (!form.text) {
                this.noty("Debe indicar un texto descriptivo", "error");
                this.formIsValid = false;
            }

            if (!form.location) {
                this.noty("Debe indicar una ubicación", "error");
                this.formIsValid = false;
            }
        },

        /**
         * Confirmar y guardar o rechazar
         */
        confirmSave() {
            // ejecutar swalert de confirm
            this.confirmedDialog({
                title: "¿Estás seguro de publicar esta publicación?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                confirmButtonText: "Si, publicar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.globalLoading = true;
                    const file = this.croppedFile;
                    const form = this.form;
                    const data = new FormData();
                    const ep = this.ep.releases.save;

                    // imagen cortada
                    const croppedFile = new File(
                        [file.croppedFile],
                        file.croppedFile.name
                    );

                    // datos para el backend
                    data.append("image", croppedFile);
                    data.append("text", form.text);
                    data.append("location", form.location);
                    data.append("type", this.type ? this.type : form.type);
                    form.labels.forEach((label) =>
                        data.append(`labels[]`, label)
                    );

                    if (this.collectiveID) {
                        console.log("entro al colectivo");
                        data.append("collective_id", this.collectiveID);
                    }

                    this.axios
                        .post(ep, data, this.headerFormData)
                        .then((_) => {
                            this.notySwal({
                                title: "Éxito!",
                                text: "La publicación ha sido publicada con éxito",
                                icon: "success",
                            });

                            this.$emit("created");
                        })
                        .catch((error) => this.manageError(error))
                        .finally(() => (this.globalLoading = false));
                }
            });
        },
    },
};
</script>
