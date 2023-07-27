<template>
    <div class="dashboard">
        <loading-overlay
            :active="globalLoading"
            :is-full-page="true"
            loader="bars"
        />
        <!-- <PreHeader /> -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <section class="py-14">
            <v-form
                v-model="formIsValid"
                @submit.prevent="saveArtwork"
                ref="artworkForm"
                lazy-validation
                :class="disabledForm ? 'opacity-50 pointer-events-none' : ''"
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
                                                ? 'md:h-72'
                                                : 'md:h-[480px]'
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
                                            class="flex-shrink-0 w-1/2 xl:w-1/4 h-32 lg:h-40 bg-gray-200 rounded-sm border border-gray-300 animate-swing-in-top-fwd"
                                        >
                                            <div class="relative h-full w-full">
                                                <img
                                                    :src="file.file"
                                                    class="w-full object-cover object-center h-full rounded-md"
                                                    :alt="file + '-' + file.id"
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
                                                    class="absolute top-2 left-2 text-xs sm:text-sm xl:text-base sm:top-3 sm:left-3 bg-gray-100 rounded-3xl text-green-700 font-bold px-3 py-1"
                                                >
                                                    {{
                                                        file.id === 0
                                                            ? "Portada"
                                                            : ""
                                                    }}
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
                            <div class="flex flex-col space-y-4 sm:space-y-4">
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
                                <v-textarea
                                    v-model="form.large_description"
                                    :counter="2000"
                                    :rules="largeDescriptionRules"
                                    rows="2"
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Descripción larga
                                        </span>
                                    </template>
                                </v-textarea>
                                <v-text-field
                                    v-model="form.width"
                                    :rules="dimensionRules"
                                    :counter="1000"
                                    required
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Ancho (cm)
                                        </span>
                                    </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="form.large"
                                    :rules="dimensionRules"
                                    :counter="1000"
                                    required
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Largo (cm)
                                        </span>
                                    </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="form.weight"
                                    :rules="dimensionRules"
                                    :counter="1000"
                                    required
                                >
                                    <template slot="label">
                                        <span
                                            class="font-black tracking-wide uppercase text-gray-900"
                                        >
                                            Peso (kg)
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
                                <div
                                    class="flex justify-end items-left gap-5 flex-col md:flex-row"
                                >
                                    <span
                                        class="font-black tracking-wide uppercase text-gray-900"
                                    >
                                        Comisión por venta (15%)
                                    </span>
                                    <span class="text-lg text-primary">
                                        {{ euro }} {{ calTax }}
                                    </span>
                                </div>
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
                        <v-col cols="12">
                            <Category
                                :category="form.type"
                                :dataCategories="categories"
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-autocomplete
                                v-model="form.target"
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
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="form.province"
                                :rules="provinceRules"
                                :counter="250"
                                required
                            >
                                <template slot="label">
                                    <span
                                        class="font-black tracking-wide uppercase text-gray-900"
                                    >
                                        Provincia
                                    </span>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="form.location"
                                :rules="locationRules"
                                :counter="250"
                                required
                            >
                                <template slot="label">
                                    <span
                                        class="font-black tracking-wide uppercase text-gray-900"
                                    >
                                        Localidad
                                    </span>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
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
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="form.other_details">
                                <template slot="label">
                                    <span
                                        class="font-black tracking-wide uppercase text-gray-900"
                                    >
                                        Otros detalles
                                    </span>
                                </template>
                            </v-textarea>
                        </v-col>

                        <!-- ------------------- -->
                        <!-- borrador o publicar -->
                        <!-- ------------------- -->
                        <v-col cols="12" v-if="!disabledForm">
                            <AlertPayment
                                v-if="!hasPaymentMethod"
                                class="pb-5"
                            />

                            <!-- <div
                                class="w-full border-t border-gray-700 mt-8 pb-8"
                            ></div> -->
                            <div class="flex flex-wrap w-full sm:justify-end">
                                <button
                                    class="w-full sm:w-auto px-7 py-4 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                                    type="submit"
                                    @click.stop="clickBtn = 3"
                                    v-if="!isCollective"
                                >
                                    Guardar como borrador
                                </button>
                                <button
                                    class="w-full sm:w-auto px-7 py-4 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                                    type="submit"
                                    @click.stop="clickBtn = 1"
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
import Newletter from "../landing/sections/Newletter.vue";
import ExtraInfo from "../landing/sections/ExtraInfo.vue";
import Footer from "../landing/sections/Footer.vue";
import Category from "./sections/Category.vue";
import AlertPayment from "./components/AlertPayment.vue";

// mixin
import createRules from "./utils/createRulesMixin";
import uploadFilesMixin from "./utils/uploadFilesMixin";
import utilMixin from "../../mixins/utilMixin";
import getDataMixin from "../../mixins/getDataMixin";
import requestErrorsMixin from "../../mixins/requestErrorsMixin";
import useArtwork from "./utils/useArtwork";

export default {
    name: "CreateArtwork",
    components: {
        Header,
        Newletter,
        ExtraInfo,
        Footer,
        Category,
        AlertPayment,
    },
    mixins: [
        createRules,
        utilMixin,
        getDataMixin,
        requestErrorsMixin,
        uploadFilesMixin,
        useArtwork,
    ],
    data() {
        return {
            form: {
                title: "",
                description: "",
                width: "",
                large: "",
                weight: "",
                price: "",
                date_created: "",
                target: "",
                province: "",
                location: "",
                large_description: "",
                other_details: "",
                type: {
                    category_id: "",
                    sub_category: [],
                },
            },
            formIsValid: true,
            disabledForm: false,
            hasPaymentMethod: true,
            menuPicker: false,
            clickBtn: 3, // 1 = publicar, 3 = borrador, 5 = en pausa
            calTax: 0,
            tax: 15,
            // state: 0,
            // typeArtwork: 1,
        };
    },

    async mounted() {
        this.form.date_created = this.actualDate; // @utilMixin
        this.getCategories(); // @getDataMixin

        // @getDataMixin
        const resp = await this.userHaveChargingMethod(this.user.id);
        if (resp.length === 0) {
            this.hasPaymentMethod = false;
        }
    },

    computed: {
        /**
         * Usuario logueado
         */
        user() {
            return this.$store.getters.getProfile;
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

    watch: {
        async user(val) {
            if (val.id) {
                // @getDataMixin
                // la primera vez se ejecuta este, el que esta dentro del watch
                // luego se ejecuta el que esta dentro del mounted
                const resp = await this.userHaveChargingMethod(val.id);
                if (resp.length === 0) {
                    this.hasPaymentMethod = false;
                    console.log(this.hasPaymentMethod);
                }
            }
        },

        /**
         * Calcular el impuesto de la app (15%)
         * cada vez que cambie el precio de la obra
         */
        "form.price"(val) {
            this.calTax = (val * this.tax) / 100;
            this.calTax = this.calTax.toFixed(2);
        },
    },

    methods: {
        /**
         * Guardar, publicar o guardar como borrador
         */
        saveArtwork() {
            if (this.clickBtn === 1 && !this.$refs.artworkForm.validate()) {
                return this.$noty(
                    "Algunos campos son requeridos, verifique antes de publicar",
                    "error",
                    5000
                );
            }

            // evaluar el parámetro type de ruta
            this.typeArtwork = this.$route.params.type ?? 1;

            // verificar estado antes de guardar/publicar
            // para publicar debe tener un método de pago
            // sino pasa a estado 5 (pendiente de pago o pausa)
            // estados:
            // PUBLISHED = 1;
            // SOLD = 2;
            // DRAFT = 3;
            // IN_CART = 4;
            // PAUSED = 5;
            this.state =
                this.clickBtn === 1 ? (!this.hasPaymentMethod ? 5 : 1) : 3;

            // formdata
            const data = this.loadDataBeforeSave();

            this.globalLoading = true;
            // request
            this.axios
                .post(this.ep.artworks.save, data, this.headerFormData)
                .then((resp) => {
                    if (resp.status === 200) {
                        // mensaje
                        this.loadSuccessMessage();

                        // --------------------
                        // redireccion
                        // --------------------
                        this.artCollectiveID = this.collectiveId;
                        this.redirectAccordingTypeArtwork();
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Carga y estructura los datos antes de guardar
         */
        loadDataBeforeSave() {
            // data general
            const data = new FormData();
            data.append("title", this.form.title);
            data.append("description", this.form.description);
            data.append("large_description", this.form.large_description);
            data.append("other_details", this.form.other_details);
            data.append("width", this.form.width);
            data.append("large", this.form.large);
            data.append("weight", this.form.weight);
            data.append("price", this.form.price);
            data.append("date_created", this.form.date_created);
            data.append("target", this.form.target);
            data.append("province", this.form.province);
            data.append("location", this.form.location);
            data.append("state", this.state);
            data.append(`type`, JSON.stringify(this.form.type));
            data.append(`type_artwork`, this.typeArtwork);

            // files o imagenes
            const files = this.uploadedFiles;
            files.forEach((file) => data.append(`gallery[]`, file));

            if (this.collectiveId) {
                data.append(`collective_id`, this.collectiveId);
            }

            return data;
        },
    },
};
</script>
