<template>
    <MainLayout :showHeader="false" :loading-overlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>
        <!-- header -->

        <!-- sección formulario -->
        <section class="bg-white">
            <div class="container py-10 md:py-20">
                <button
                    @click.stop="$router.go(-1)"
                    text
                    class="flex items-center text-zinc-800 hover:text-zinc-900 rounded-md"
                >
                    <v-icon class="mr-2">mdi-arrow-left</v-icon>
                    Atrás
                </button>
                <div v-show="!success">
                    <div class="py-8">
                        <h1 class="uppercase text-3xl text-zinc-900 font-bold">
                            Crea tu evento
                        </h1>
                    </div>
                    <div class="flex flex-wrap justify-center items-start">
                        <div class="w-full md:w-1/2 md:pr-5">
                            <div class="w-full">
                                <AnkaCropper
                                    :options="ankaOptions"
                                    @cropper-error="errorCropper"
                                    @cropper-saved="savedCropper"
                                    class="md:h-96 border-4 bg-gray-200 flex items-center w-full justify-center"
                                />
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 md:pl-5">
                            <div
                                class="flex flex-col gap-5 items-center md:items-start"
                            >
                                <v-btn-toggle
                                    v-model="form.mode"
                                    borderless
                                    rounded
                                    @change="changeMode"
                                    class="mt-5 mt-md-0"
                                >
                                    <v-btn
                                        value="1"
                                        :color="
                                            form.mode == 1
                                                ? '#B2794C'
                                                : 'grey lighten-2'
                                        "
                                        x-large
                                        class="px-5 px-md-10"
                                    >
                                        <span
                                            class="uppercase tracking-widest text-zinc-900"
                                            :class="{
                                                'text-white': form.mode == 1,
                                                'text-zinc-900': form.mode == 2,
                                            }"
                                        >
                                            Online
                                        </span>
                                    </v-btn>

                                    <v-btn
                                        value="2"
                                        :color="
                                            form.mode == 2
                                                ? '#B2794C'
                                                : 'grey lighten-2'
                                        "
                                        x-large
                                        class="px-5 px-md-10"
                                    >
                                        <span
                                            class="uppercase tracking-widest text-zinc-900"
                                            :class="{
                                                'text-white': form.mode == 2,
                                                'text-zinc-900': form.mode == 1,
                                            }"
                                        >
                                            Presencial
                                        </span>
                                    </v-btn>
                                </v-btn-toggle>

                                <!-- nombre deñ evento -->
                                <v-text-field
                                    v-model="form.name"
                                    label="Nombre del evento"
                                    color="#B2794C"
                                    class="w-full"
                                ></v-text-field>

                                <!-- fecha de inicio y hora inicio -->
                                <div class="flex justify-between gap-5 w-full">
                                    <v-text-field
                                        v-model="form.init_date"
                                        label="Fecha de inicio"
                                        color="#B2794C"
                                        type="date"
                                        :min="actualDate"
                                        timezone="Europe/Madrid"
                                        format="dd/mm/yyyy"
                                        class="w-full"
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="form.init_time"
                                        label="Hora de inicio"
                                        color="#B2794C"
                                        type="time"
                                        class="w-full"
                                    ></v-text-field>
                                </div>

                                <!-- ubicación -->
                                <v-text-field
                                    v-model="form.location"
                                    label="Ubicación"
                                    color="#B2794C"
                                    prepend-icon="mdi-home"
                                    class="w-full"
                                ></v-text-field>

                                <!-- teléfono -->
                                <v-text-field
                                    v-model="form.phone_number"
                                    label="Número de reserva"
                                    color="#B2794C"
                                    prepend-icon="mdi-phone"
                                    class="w-full"
                                ></v-text-field>

                                <!-- descripción -->
                                <v-textarea
                                    v-model="form.description"
                                    label="Descripción"
                                    color="#B2794C"
                                    class="w-full"
                                ></v-textarea>

                                <!-- continuar -->
                                <div
                                    class="w-full flex justify-md-end justify-center"
                                >
                                    <v-btn
                                        color="grey darken-4"
                                        class="uppercase tracking-widest text-white md:w-40"
                                        x-large
                                        type="button"
                                        @click.prevent="clickSaveButton"
                                    >
                                        Continuar
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- success -->
                <SuccessSection
                    v-if="success"
                    :event="eventCreated"
                    class="animate-fade-in-down"
                />
            </div>
        </section>
        <!-- /sección formulario -->
    </MainLayout>
</template>

<script>
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import SuccessSection from "./sections/Success.vue";
import AnkaCropper from "vue-anka-cropper";

export default {
    name: "EventCreate",
    components: { MainLayout, Header, AnkaCropper, SuccessSection },

    data() {
        return {
            loading: false,
            actualDate: new Date().toISOString().substr(0, 10),
            mode: 0,
            formIsValid: false,
            success: false,
            errors: [],
            eventCreated: {},
            form: {
                name: "",
                mode: "",
                init_date: "",
                init_time: "",
                location: "",
                phone_number: "",
                description: "",
                image: "",
            },
            ankaOptions: {
                aspectRatio: 1.5,
                closeOnSave: false,
                cropArea: "box",
                croppedHeight: 800,
                croppedWidth: 800,
                cropperHeight: false,
                dropareaMessage: "Sube una foto de portada de tu evento",
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
                selectButtonLabel: "Selecciona o arrastra una imagen",
                showPreview: false,
                skin: "light",
                uploadData: {},
                uploadTo: false,
            },
        };
    },

    created() {
        this.form.init_date = this.actualDate;
    },

    computed: {
        user() {
            return this.$store.getters.getProfile || {};
        },
        
        /**
         * Verificar si el parámetro type de la ruta es igual a 2
         * 1 = artista
         * 2- colectivo
         */
         isCollective() {
            return this.$route.params.type == 2;
        },

        /**
         * Id del colectivo
         */
        collectiveId() {
            return this.$route.params.collectiveID || null;
        },
    },

    methods: {
        changeMode(mode) {
            this.mode = mode;
        },
        clickSaveButton() {
            const btn = document.querySelector('a[title="Save"]');
            if (!btn) return;
            btn.click();
        },
        errorCropper(error) {
            this.$noty("Error al carga el archivo [" + error + "]", "error");
        },
        savedCropper(file) {
            this.form.image = file;

            // validar el formulario
            this.validate();

            // si algo ha faltado
            if (!this.formIsValid) {
                this.errors.forEach((error) => {
                    this.$noty(error, "error");
                });

                return;
            }

            // si todo está correcto
            this.createEvent();
        },
        validate() {
            this.formIsValid = true;
            this.errors = [];

            if (!this.form.name) {
                this.formIsValid = false;
                this.errors.push("El nombre del evento es obligatorio");
            }

            if (!this.form.mode) {
                this.formIsValid = false;
                this.errors.push("El tipo del evento es obligatorio");
            }

            if (!this.form.init_date) {
                this.formIsValid = false;
                this.errors.push("La fecha de inicio es obligatoria");
            }

            if (!this.form.init_time) {
                this.formIsValid = false;
                this.errors.push("La hora de inicio es obligatoria");
            }

            if (!this.form.location) {
                this.formIsValid = false;
                this.errors.push("La ubicación es obligatoria");
            }

            if (!this.form.phone_number) {
                this.formIsValid = false;
                this.errors.push("El número de reserva es obligatorio");
            }

            if (!this.form.image) {
                this.formIsValid = false;
                this.errors.push("La imagen es obligatoria");
            }
        },
        createEvent() {
            this.loading = true;

            // imagen cortada
            const cropped = new File(
                [this.form.image.croppedFile],
                this.form.image.croppedFile.name
            );

            const data = new FormData();
            data.append("image", cropped);
            data.append("name", this.form.name);
            data.append("mode", this.form.mode);
            data.append("init_date", this.form.init_date);
            data.append("init_time", this.form.init_time);
            data.append("location", this.form.location);
            data.append("phone_number", this.form.phone_number);
            data.append("description", this.form.description);
            if (this.collectiveId) {
                data.append(`collective_id`, this.collectiveId);
            }

            this.axios
                .post(this.ep.events.store, data, this.headerFormData)
                .then((resp) => {
                    if (resp.status === 201) {
                        this.eventCreated = resp.data;
                        this.success = true;
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
