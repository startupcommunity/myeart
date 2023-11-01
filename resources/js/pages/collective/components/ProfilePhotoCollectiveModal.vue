<template>
    <div>
        <v-row justify="center">
            <v-dialog
                v-model="showModal"
                persistent
                width="600"
                content-class="mt-14"
            >
                <v-card class="bg-gray-one">
                    <v-card-title>
                        <div class="flex justify-end">
                            <button type="button" @click="$emit('close-modal')">
                                <i class="fa fa-times text-primary"></i>
                            </button>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <AnkaCropper
                            :options="ankaOptions"
                            @cropper-error="errorCropper"
                            @cropper-saved="savedCropper"
                            :key="ankaKey"
                        />
                    </v-card-text>
                    <v-card-actions class="bg-white">
                        <div class="flex flex-wrap w-full">
                            <div class="w-full md:w-3/6">
                                <v-btn
                                    class="text-primary"
                                    depressed
                                    block
                                    large
                                    text
                                    :disabled="globalLoading"
                                    :loading="globalLoading"
                                    @click="clickBtnSaved()"
                                >
                                    Cambiar imagen
                                </v-btn>
                            </div>
                            <div class="w-full md:w-3/6">
                                <v-btn
                                    class="text-dark"
                                    block
                                    large
                                    depressed
                                    text
                                    :disabled="globalLoading"
                                    @click="$emit('close-modal')"
                                >
                                    Cancelar
                                </v-btn>
                            </div>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
import AnkaCropper from "vue-anka-cropper";

export default {
    name: "ProfilePhotoCollectiveModal",
    components: { AnkaCropper },
    props: {
        showModal: {
            type: Boolean,
            default: false,
            description: "Visibilidad del Dialog",
        },
        idCollective: {
            type: Number,
            default: 0,
            description: "Id del colectivo",
        },
    },

    data() {
        return {
            ankaOptions: {
                aspectRatio: 1,
                closeOnSave: false,
                cropArea: "circle",
                croppedHeight: 600,
                croppedWidth: 600,
                cropperHeight: false,
                dropareaMessage: "Arrastre la imagen aquí o",
                frameLineDash: [5, 3],
                frameStrokeColor: "rgba(255, 255, 255, 255)",
                handleFillColor: "rgba(255, 255, 255, 255)",
                handleHoverFillColor: "rgba(255, 255, 255, 255)",
                handleHoverStrokeColor: "rgba(255, 255, 255, 255)",
                handleSize: 5,
                handleStrokeColor: "rgba(255, 255, 255, 255)",
                layoutBreakpoint: 850,
                maxCropperHeight: 600,
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

            // value del componente
            // para recargar el componente
            ankaKey: 1,
        };
    },

    methods: {
        /**
         * Algún error al cargar el archivo
         */
        errorCropper(error) {
            this.$notify({
                group: "container",
                text: "Error al carga el archivo [" + error + "]",
                type: "error",
            });
        },

        /**
         * Dar click al botón para guardar la imagen cargada y recortada
         */
        clickBtnSaved() {
            const btn = document.querySelector('a[title="Save"]');

            if (btn) {
                btn.click();
            }
        },

        /**
         * Limpia el archivo cargado
         */
        clickBtnClear() {
            const btn = document.querySelector('a[title="Cancel"]');

            if (btn) {
                btn.click();
            }
        },

        /**
         * Guardar imagen
         */
        savedCropper(file) {
            this.globalLoading = true;

            // imagen cortada
            const croppedFile = new File(
                [file.croppedFile],
                file.croppedFile.name
            );

            // datos para el backend
            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("profile_image", croppedFile);
            formData.append("id_collective", this.idCollective);

            const ep =
                this.ep.collectives.updateProfilePhoto + this.idCollective;

            // request
            this.axios
                .post(ep, formData, this.headerFormData)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$noty("Imagen actualizada");
                        this.$emit("close-modal");

                        // reload collective
                        this.$store.dispatch(
                            "getUserCollective",
                            this.idCollective
                        );

                        // limpiar archivo cargado
                        this.clickBtnClear();
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * incrementar la propiedad ankaKey + 1
         */
        increaseAnkaKey() {
            this.ankaKey += 1;
        },

        /**
         * Recargar el componente cambiando la key cada segundo
         *
         * esto para evitar problemas al usar el drag and drop
         * importante recargar el componente cada vez que el dialog
         * o modal se active
         */
        rerenderAnkaComponent() {
            setTimeout(() => {
                this.increaseAnkaKey();
            }, 1000);
        },
    },
    watch: {
        showModal(val) {
            if (val) {
                this.clickBtnClear();
                this.rerenderAnkaComponent();
            }
        },
    },
};
</script>
