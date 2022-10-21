<template>
    <div class="dashboard">
        <loading-overlay
            :active="globalLoading"
            :is-full-page="true"
            loader="bars"
        />
        <PreHeader />
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <section class="py-14">
            <v-form
                v-model="formIsValid"
                @submit.prevent="confirmUpdate"
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
                                    <!-- drop area -->
                                    <div
                                        class="flex justify-center items-center w-full"
                                        :class="
                                            previewFiles.length
                                                ? 'md:h-60'
                                                : 'md:h-[444px]'
                                        "
                                        @drop.prevent="onDrop($event)"
                                        @dragover.prevent="dragover = true"
                                        @dragenter.prevent="dragover = true"
                                        @dragleave.prevent="dragover = false"
                                    >
                                        <label
                                            for="dropzone-file"
                                            v-show="dropzoneFile"
                                            class="flex flex-col justify-center items-center bg-gray-100 cursor-pointer rounded-sm border border-gray-200 hover:bg-gray-200 w-full h-full"
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
                                                :disabled="loadingGallery"
                                            />
                                        </label>
                                    </div>
                                    <!-- /drop area -->

                                    <!-- preview area -->
                                    <div
                                        v-if="previewFiles.length"
                                        class="overflow-x-auto flex md:pt-4"
                                    >
                                        <div
                                            v-for="file in previewFiles"
                                            :key="file.id"
                                            class="flex-shrink-0 w-1/2 xl:w-1/4 h-24 lg:h-40 bg-gray-200 rounded-sm border border-gray-300 animate-swing-in-top-fwd"
                                        >
                                            <div class="relative h-full w-full">
                                                <img
                                                    :src="file.file"
                                                    class="w-full object-cover object-center h-full rounded-md"
                                                    :alt="'file-' + file.id"
                                                    :id="file.id"
                                                />
                                                <button
                                                    class="absolute top-2 right-2 text-xs sm:text-lg sm:top-3 sm:right-3 px-2.5 sm:px-3 py-1 border-2 border-red-600 bg-gray-50 rounded-lg hover:bg-gray-200 font-bold"
                                                    type="button"
                                                    @click.stop="
                                                        deleteFile(file.id)
                                                    "
                                                >
                                                    <i
                                                        class="fas fa-times text-red-700"
                                                    ></i>
                                                </button>
                                                <span
                                                    v-if="file.front == 1"
                                                    class="absolute top-2 left-2 text-xs sm:text-sm xl:text-base sm:top-3 sm:left-3 bg-gray-100 rounded-3xl text-green-700 font-bold px-3 py-1"
                                                >
                                                    Portada
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /preview area -->
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
                                    :disabled="!formIsValid"
                                >
                                    Actualizar
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
import { mapGetters } from "vuex";

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
    name: "EditArtwork",
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
                gallery: [],
                state: "",
            },
            formIsValid: true,
            menuPicker: false,
            loadingGallery: false,
        };
    },
    mounted() {
        // mixin
        this.getCategories();
        this.getStyles();
        this.getTechniques();

        // load data
        this.loadData();
    },
    methods: {
        /**
         * Cargar datos necesarios para la edición
         */
        async loadData() {
            this.globalLoading = true;
            this.isFront = true;
            const id = this.$route.params.id;

            await this.axios
                .get(this.ep.artworks.edit + id)
                .then((resp) => {
                    // data
                    const artwork = resp.data.artwork;
                    const { categories, styles, techniques, gallery } = artwork;

                    // cargar
                    this.form = artwork;

                    // ----------------
                    // adaptar datos
                    // ----------------
                    const dateFormat = this.dateFormat;
                    this.form.date_created = dateFormat(artwork.date_created);
                    this.form.categories = categories.map((cat) => cat.id);
                    this.form.styles = styles.map((sty) => sty.id);
                    this.form.techniques = techniques.map((sty) => sty.id);

                    // galeria
                    gallery.forEach((picture) => {
                        const fullname = picture.picture;
                        const path = `${this.pathArtworkGallery + fullname}`;
                        const promise = this.getFileImage(path, picture);

                        promise.then((resp) => {
                            const data = {
                                file: resp.file,
                                front: resp.front,
                            };

                            this.addFileToUploadFilesWithFront(data);
                        });
                    });
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    this.globalLoading = false;
                    this.$refs.artworkForm.resetValidation();
                    this.mapFields();
                });
        },

        /**
         * ajusta las propiedades del formulario a un mapeo
         * entendible por el usuario
         */
        mapFields() {
            const form = this.form;
            form.title = form.title == "null" ? "" : form.title;
            form.description =
                form.description == "null" ? "" : form.description;
            form.dimension = form.dimension == "null" ? "" : form.dimension;
            form.price = form.price == "null" ? "" : form.price;
            form.shipping = form.shipping == "null" ? "" : form.shipping;
        },

        /**
         * Guardar, publicar o borrador de la obra creada
         */
        async updateArtwork() {
            if (this.form.state === 1) {
                if (!this.$refs.artworkForm.validate()) return;
            }

            // loading
            this.globalLoading = true;

            // cambiar estado
            this.changeState();

            // cargar datos
            const data = await this.loadFormData();

            // request
            this.axios
                .post(this.ep.artworks.update + this.form.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((resp) => {
                    if (resp.status === 200) {
                        // mensaje
                        const state = this.form.state;
                        const draftMsj = "Obra guardada como borrador";
                        const publishMsj = "Obra publicada con éxito";
                        const text = state === 3 ? draftMsj : publishMsj;
                        this.noty(text);

                        this.$router.push(
                            `/usuario/perfil/${this.userProfile.id}/obras`
                        );
                    }
                })
                .catch((error) => {
                    this.showRequestErrors(error);
                })
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Confirmar si se desea actualizar o no la obra
         */
        confirmUpdate() {
            this.$swal
                .fire({
                    title: "¿Esta seguro de editar esta obra?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, editar",
                    cancelButtonText: "Cancelar",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.updateArtwork();
                    }
                });
        },

        /**
         * Cargar los datos para ser enviados al backend
         */
        loadFormData() {
            const form = this.form;
            const categories = form.categories;
            const styles = form.styles;
            const techniques = form.techniques;
            const files = this.uploadedFiles;

            const data = new FormData();
            data.append("_method", "PUT");
            data.append("title", form.title);
            data.append("description", form.description);
            data.append("dimension", form.dimension);
            data.append("price", form.price);
            data.append("date_created", form.date_created);
            data.append("location", form.location);
            data.append("shipping", form.shipping);
            data.append("state", form.state);

            // data sync
            categories.forEach((cat) => data.append(`categories[]`, cat));
            styles.forEach((sty) => data.append(`styles[]`, sty));
            techniques.forEach((tech) => data.append(`techniques[]`, tech));
            files.forEach((file) => data.append(`gallery[]`, file.file));

            return data;
        },

        /**
         * Cambia el estado de la obra si todos los campos
         * estas llenos
         *
         * - estado publicado
         */
        changeState() {
            const form = this.form;
            const files = this.uploadedFiles;
            if (
                form.title &&
                form.description &&
                form.dimension &&
                form.price &&
                form.date_created &&
                form.location &&
                form.shipping &&
                form.categories.length &&
                form.styles.length &&
                form.techniques.length &&
                files.length
            ) {
                if (form.state == this.STATEARTWORK.draft) {
                    form.state = this.STATEARTWORK.published;
                }
            }
        },
    },

    computed: {
        /**
         * Acceder a los getters necesarios
         */
        ...mapGetters({
            userProfile: "getProfile",
        }),
    },
};
</script>
