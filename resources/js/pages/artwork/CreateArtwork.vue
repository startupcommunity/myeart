<template>
    <div class="dashboard">
        <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
        <PreHeader />
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <section class="py-14">
            <v-form
                v-model="formIsValid"
                @submit.prevent="saveArtwork"
                ref="artworkForm"
                lazy-validation
            >
                <v-container>
                    <v-row>
                        <!-- ------------------- -->
                        <!-- galeria de imagenes -->
                        <!-- ------------------- -->
                        <v-col cols="12" md="6">
                            <v-row>
                                <v-col cols="12" class="-mb-3">
                                    <div
                                        class="flex justify-center items-center w-full"
                                        @drop.prevent="onDrop($event)"
                                        @dragover.prevent="dragover = true"
                                        @dragenter.prevent="dragover = true"
                                        @dragleave.prevent="dragover = false"
                                    >
                                        <label
                                            for="dropzone-file"
                                            v-show="dropzoneFile"
                                            class="flex flex-col justify-center items-center w-full h-72 bg-gray-200 rounded-sm border border-gray-300 cursor-pointer hover:bg-gray-300"
                                        >
                                            <div
                                                class="flex flex-col justify-center items-center pt-5 pb-6"
                                            >
                                                <i
                                                    class="fas fa-cloud-arrow-up fa-3x text-gray-900 mb-3"
                                                ></i>
                                                <p
                                                    class="mb-2 text-gray-900 text-center text-xl"
                                                >
                                                    <span class="font-semibold">
                                                        Sube imágenes de tu obra
                                                    </span>
                                                    <br />
                                                    <span class="text-sm">
                                                        o arrastra los elementos
                                                    </span>
                                                </p>
                                                <p
                                                    class="text-xs text-gray-900"
                                                >
                                                    SVG, PNG, JPG
                                                </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                class="hidden"
                                                multiple
                                                @change="getFiles($event)"
                                            />
                                        </label>
                                        <div
                                            class="relative h-full w-full"
                                            v-show="previewFiles.one"
                                        >
                                            <img
                                                :src="previewFiles.one"
                                                class="w-full object-cover object-center h-72 rounded-md"
                                                alt="file-1"
                                                id="file-1"
                                            />
                                            <button
                                                class="absolute top-2 right-2 text-xs sm:text-lg sm:top-3 sm:right-3 px-2.5 sm:px-3 py-1 border-2 border-red-600 bg-gray-50 rounded-lg hover:bg-gray-200 font-bold"
                                                type="button"
                                                @click.stop="deleteFile(0)"
                                            >
                                                <i
                                                    class="fas fa-times text-red-700"
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="4">
                                    <div
                                        class="w-full h-24 lg:h-40 bg-gray-200 rounded-sm border border-gray-300"
                                    >
                                        <div
                                            class="relative h-full w-full"
                                            v-show="previewFiles.two"
                                        >
                                            <img
                                                :src="previewFiles.two"
                                                class="w-full object-cover object-center h-full rounded-md"
                                                alt="file-2"
                                                id="file-2"
                                            />
                                            <button
                                                class="absolute top-2 right-2 text-xs sm:text-lg sm:top-3 sm:right-3 px-2.5 sm:px-3 py-1 border-2 border-red-600 bg-gray-50 rounded-lg hover:bg-gray-200 font-bold"
                                                type="button"
                                                @click.stop="deleteFile(1)"
                                            >
                                                <i
                                                    class="fas fa-times text-red-700"
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="4">
                                    <div
                                        class="w-full h-24 lg:h-40 bg-gray-200 rounded-sm border border-gray-300"
                                    >
                                        <div
                                            class="relative h-full w-full"
                                            v-show="previewFiles.three"
                                        >
                                            <img
                                                :src="previewFiles.three"
                                                class="w-full object-cover object-center h-full rounded-md"
                                                alt="file-3"
                                                id="file-3"
                                            />
                                            <button
                                                class="absolute top-2 right-2 text-xs sm:text-lg sm:top-3 sm:right-3 px-2.5 sm:px-3 py-1 border-2 border-red-600 bg-gray-50 rounded-lg hover:bg-gray-200 font-bold"
                                                type="button"
                                                @click.stop="deleteFile(2)"
                                            >
                                                <i
                                                    class="fas fa-times text-red-700"
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="4">
                                    <div
                                        class="w-full h-24 lg:h-40 bg-gray-200 rounded-sm border border-gray-300"
                                    >
                                        <div
                                            class="relative h-full w-full"
                                            v-show="previewFiles.four"
                                        >
                                            <img
                                                :src="previewFiles.four"
                                                class="w-full object-cover object-center h-full rounded-md"
                                                alt="file-4"
                                                id="file-4"
                                            />
                                            <button
                                                class="absolute top-2 right-2 text-xs sm:text-lg sm:top-3 sm:right-3 px-2.5 sm:px-3 py-1 border-2 border-red-600 bg-gray-50 rounded-lg hover:bg-gray-200 font-bold"
                                                type="button"
                                                @click.stop="deleteFile(3)"
                                            >
                                                <i
                                                    class="fas fa-times text-red-700"
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>

                        <!-- ----------------- -->
                        <!-- Datos principales -->
                        <!-- ----------------- -->
                        <v-col cols="12" md="6">
                            <div class="flex flex-col space-y-4 sm:space-y-16">
                                <v-text-field
                                    v-model="form.title"
                                    :rules="titleRules"
                                    :counter="100"
                                    required
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Nombre de la obra
                                        </span>
                                    </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="form.description"
                                    :rules="descriptionRules"
                                    :counter="230"
                                    required
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Descripción corta
                                        </span>
                                    </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="form.dimension"
                                    :rules="dimensionRules"
                                    :counter="100"
                                    required
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Dimensiones
                                        </span>
                                    </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="form.price"
                                    :rules="priceRules"
                                    :counter="12"
                                    required
                                    type="number"
                                    prefix="€"
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Precio
                                        </span>
                                    </template>
                                </v-text-field>
                            </div>
                        </v-col>

                        <!-- ------------ -->
                        <!-- mas detalles -->
                        <!-- ------------ -->
                        <v-col cols="12" class="py-12">
                            <div class="border-b border-gray-900 py-5 w-full">
                                <h2
                                    class="text-primary text-2xl font-black uppercase"
                                >
                                    Más detalles
                                </h2>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="flex flex-col space-y-4 sm:space-y-28">
                                <v-menu
                                    v-model="menuPicker"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="form.date_created"
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="dateRules"
                                        >
                                            <template slot="label">
                                                <span
                                                    class="font-black tracking-wide uppercase text-gray-900"
                                                >
                                                    Fecha de creación
                                                </span>
                                            </template>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="form.date_created"
                                        no-title
                                        @input="menuPicker = false"
                                        :max="dateMaxPicker"
                                    ></v-date-picker>
                                </v-menu>
                                <v-autocomplete
                                    v-model="form.location"
                                    :items="listCityCountry()"
                                    auto-select-first
                                    clearable
                                    item-text="text"
                                    item-value="val"
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Ubicación
                                        </span>
                                    </template>
                                </v-autocomplete>
                                <v-text-field
                                    v-model="form.shipping"
                                    :rules="dateRules"
                                    :counter="100"
                                    required
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Envío
                                        </span>
                                    </template>
                                </v-text-field>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="flex flex-col space-y-10">
                                <div>
                                    <label>
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Categoría
                                        </span>
                                    </label>
                                    <v-chip-group
                                        v-model="form.categories"
                                        column
                                        multiple
                                        show-arrows
                                        center-active
                                        class="mx-auto"
                                    >
                                        <v-chip
                                            label
                                            filter
                                            outlined
                                            large
                                            v-for="cat in categories"
                                            :key="cat.id"
                                            :value="cat.id"
                                            class="border-o"
                                        >
                                            <span
                                                class="font-medium text-gray-900 text-xl tracking-tighter"
                                            >
                                                <i
                                                    class="text-primary"
                                                    :class="setIcon(cat.name)"
                                                ></i>
                                                {{ cat.name }}
                                            </span>
                                        </v-chip>
                                    </v-chip-group>
                                </div>
                                <div>
                                    <label>
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Estilo
                                        </span>
                                    </label>
                                    <v-chip-group
                                        v-model="form.styles"
                                        column
                                        multiple
                                        show-arrows
                                        center-active
                                        class="mx-auto"
                                    >
                                        <v-chip
                                            filter
                                            outlined
                                            v-for="style in styles"
                                            :key="style.id"
                                            :value="style.id"
                                            class="border-o"
                                        >
                                            <span
                                                class="font-medium text-gray-900 text-xl tracking-tighter"
                                            >
                                                {{ style.name }}
                                            </span>
                                        </v-chip>
                                    </v-chip-group>
                                </div>
                                <div>
                                    <label>
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Técnica
                                        </span>
                                    </label>
                                    <v-chip-group
                                        v-model="form.techniques"
                                        column
                                        multiple
                                        show-arrows
                                        center-active
                                        class="mx-auto"
                                    >
                                        <v-chip
                                            filter
                                            outlined
                                            v-for="tech in techniques"
                                            :key="tech.id"
                                            :value="tech.id"
                                            class="border-o"
                                        >
                                            <span
                                                class="font-medium text-gray-900 text-xl tracking-tighter"
                                            >
                                                {{ tech.name }}
                                            </span>
                                        </v-chip>
                                    </v-chip-group>
                                </div>
                            </div>
                        </v-col>

                        <!-- ------------------- -->
                        <!-- borrador o publicar -->
                        <!-- ------------------- -->
                        <v-col cols="12">
                            <div
                                class="w-full border-t border-gray-700 mt-8 pb-8"
                            ></div>
                            <div class="flex flex-wrap w-full sm:justify-end">
                                <button
                                    class="w-full sm:w-auto px-7 py-4 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                                    type="submit"
                                    @click.stop="isDraft = 3"
                                    :disabled="!formIsValid"
                                >
                                    Guardar como borrador
                                </button>
                                <button
                                    class="w-full sm:w-auto px-7 py-4 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                                    type="submit"
                                    @click.stop="isDraft = 1"
                                    :disabled="!formIsValid"
                                >
                                    Publicar
                                </button>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </section>

        <!-- El Newletter -->
        <Newletter />
        <!-- /El Newletter -->

        <!-- extra info -->
        <ExtraInfo />
        <!-- /extra info -->

        <!-- footer -->
        <Footer />
        <!-- /Footer -->
    </div>
</template>
<script>
import Header from "../landing/sections/Header.vue";
import PreHeader from "../landing/sections/PreHeader.vue";
import Newletter from "../landing/sections/Newletter.vue";
import ExtraInfo from "../landing/sections/ExtraInfo.vue";
import Footer from "../landing/sections/Footer.vue";

// mixin
import createRules from "./utils/createRulesMixin";
import uploadFilesMixin from "./utils/uploadFilesMixin";
import utilMixin from "../../mixins/utilMixin";
import getDataMixin from "../../mixins/getDataMixin";
import requestErrorsMixin from "../../mixins/requestErrorsMixin";

export default {
    components: { Header, PreHeader, Newletter, ExtraInfo, Footer },
    name: "CreateArtwork",
    mixins: [
        createRules,
        utilMixin,
        getDataMixin,
        requestErrorsMixin,
        uploadFilesMixin,
        getDataMixin,
    ],
    data() {
        return {
            form: {
                title: "",
                description: "",
                dimension: "",
                price: "",
                date_created: "",
                location: "",
                shipping: "",
                categories: [],
                styles: [],
                techniques: [],
            },
            formIsValid: true,
            menuPicker: false,
            isDraft: 3,
            loading: false,
        };
    },
    mounted() {
        // mixin
        this.form.date_created = this.actualDate;
        this.getCategories();
        this.getStyles();
        this.getTechniques();
    },
    methods: {
        /**
         * Guardar, publicar o borrador de la obra creada
         */
        saveArtwork() {
            if (!this.$refs.artworkForm.validate()) return;
            this.loading = true;

            const data = new FormData();
            data.append("title", this.form.title);
            data.append("description", this.form.description);
            data.append("dimension", this.form.dimension);
            data.append("price", this.form.price);
            data.append("date_created", this.form.date_created);
            data.append("location", this.form.location);
            data.append("shipping", this.form.shipping);
            data.append("state", this.isDraft);

            // data sync
            const categories = this.form.categories;
            const styles = this.form.styles;
            const techniques = this.form.techniques;
            const files = this.uploadedFiles;
            categories.forEach((cat) => data.append(`categories[]`, cat));
            styles.forEach((sty) => data.append(`styles[]`, sty));
            techniques.forEach((tech) => data.append(`techniques[]`, tech));
            files.forEach((file) => data.append(`gallery[]`, file));

            // request
            this.axios
                .post("/api/artworks/create", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((resp) => {
                    if (resp.status === 200) {
                        const text =
                            this.isDraft === 3
                                ? "Obra guardada como borrador"
                                : "Obra publicada con éxito";
                        this.$notify({
                            group: "container",
                            type: "success",
                            text,
                        });

                        this.resetForm();
                    }
                })
                .catch((error) => {
                    this.showRequestErrors(error);
                })
                .finally(() => (this.loading = false));
        },

        /**
         * Volver a valores de inicio
         * en todo el formulario incluyendo
         * los archivos cargados
         */
        resetForm() {
            this.form = {
                title: "",
                description: "",
                dimension: "",
                price: "",
                date_created: "",
                location: "",
                shipping: "",
                categories: [],
                styles: [],
                techniques: [],
            };

            this.formIsValid = true;
            this.menuPicker = false;
            this.isDraft = 3;

            // reset el formulario
            this.$refs.artworkForm.resetValidation();

            // mixin
            this.resetUpload();
        },
    },
};
</script>
