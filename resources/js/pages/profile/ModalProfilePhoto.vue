<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="showModal" persistent width="600">
                <v-card class="bg-gray-one mt-14">
                    <v-card-title>
                        <div class="flex justify-end">
                            <button
                                type="button"
                                @click="$emit('close-modal-edit-profile-photo')"
                            >
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
                                    @click="
                                        $emit('close-modal-edit-profile-photo')
                                    "
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
import requestErrorsMixin from "../../mixins/requestErrorsMixin";

export default {
    name: "ModalProfilePhoto",
    components: {
        AnkaCropper,
    },
    mixins: [requestErrorsMixin],
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
    props: {
        showModal: {
            type: Boolean,
            default: false,
            description: "Visibilidad del Dialog",
        },
    },
    computed: {
        userProfile() {
            return this.$store.getters.getProfile;
        },
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
            // imagen cortada
            const croppedFile = new File(
                [file.croppedFile],
                file.croppedFile.name
            );

            // datos para el backend
            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("originalFile", file.originalFile);
            formData.append("croppedFile", croppedFile);

            // request
            Vue.axios
                .post("/api/profile/update-profile-photo", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$notify({
                            group: "container",
                            text: resp.data.message,
                            type: "success",
                        });

                        // emit
                        this.$emit("close-modal-edit-profile-photo");

                        // reload user
                        this.$store.dispatch("userRequest");

                        // limpiar archivo cargado
                        this.clickBtnClear();
                    }
                })
                .catch((error) => {
                    this.showRequestErrors(error);
                });
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
