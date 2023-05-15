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
                        <v-col cols="12">
                            <!-- <div
                                class="w-full border-t border-gray-700 mt-8 pb-8"
                            ></div> -->
                            <AlertPayment
                                v-if="!hasPaymentMethod"
                                class="pb-5"
                            />
                            <div class="flex flex-wrap w-full sm:justify-end">
                                <button
                                    class="w-full sm:w-auto px-7 py-4 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                                    type="submit"
                                    :disabled="!formIsValid"
                                    @click.stop="publish = false"
                                >
                                    Guardar borrador
                                </button>
                                <button
                                    class="w-full sm:w-auto px-7 py-4 bg-green-700 text-gray-50 border border-green-900 hover:bg-green-900 transition-all text-base font-light rounded-md uppercase"
                                    type="submit"
                                    :disabled="!formIsValid"
                                    @click.stop="publish = true"
                                >
                                    Actualizar y publicar
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
// componentes
import Header from "../landing/sections/Header.vue";
import PreHeader from "../landing/sections/PreHeader.vue";
import Newletter from "../landing/sections/Newletter.vue";
import ExtraInfo from "../landing/sections/ExtraInfo.vue";
import Footer from "../landing/sections/Footer.vue";
import Category from "./sections/Category.vue";

// mixin
import createRules from "./utils/createRulesMixin";
import uploadFilesMixin from "./utils/uploadFilesMixin";
import utilMixin from "../../mixins/utilMixin";
import getDataMixin from "../../mixins/getDataMixin";
import requestErrorsMixin from "../../mixins/requestErrorsMixin";
import AlertPayment from "./components/AlertPayment.vue";

export default {
    components: {
        Header,
        PreHeader,
        Newletter,
        ExtraInfo,
        Footer,
        Category,
        AlertPayment,
    },
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
                id: "",
                title: "",
                description: "",
                large_description: "",
                other_details: "",
                width: 0,
                large: 0,
                weight: 0,
                price: 0,
                date_created: "",
                target: "",
                province: "",
                location: "",
                state: "",
                gallery: [],
                type: {
                    category_id: "",
                    sub_category: [],
                },
            },
            formIsValid: true,
            menuPicker: false,
            loadingGallery: false,
            publish: false,
            hasPaymentMethod: true,
            calTax: 0,
            tax: 15,
        };
    },
    mounted() {
        // @getDataMixin
        this.getCategories();

        // load data
        this.loadData();
    },
    watch: {
        /**
         * Calcular el impuesto de la app (15%)
         * cada vez que cambie el precio de la obra
         */
        "form.price"(val) {
            this.calTax = (val * this.tax) / 100;
            this.calTax = this.calTax.toFixed(2);
        },
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
         * Id del colectivo (si lo hay)
         */
        collectiveId() {
            return this.$route.params.collectiveID || null;
        },
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
                    const artwork = resp.data;
                    const { categories, gallery } = artwork;

                    // datos
                    this.form = artwork;
                    this.form.type = {
                        category_id: "",
                        sub_category: [],
                    };

                    // tipo
                    this.loadType(categories);

                    // galeria
                    this.loadGallery(gallery);

                    // comprobar si ya ha cargado un método de cobro
                    this.haveAChargingMethod();
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
            const f = this.form;
            const dateFormat = this.dateFormat;
            f.title = f.title == "null" ? "" : f.title;
            f.description = f.description == "null" ? "" : f.description;
            f.width = f.width == "null" ? "" : f.width;
            f.large = f.large == "null" ? "" : f.large;
            f.weight = f.weight == "null" ? "" : f.large;
            f.price = f.price == "null" ? "" : f.price;
            f.date_created = dateFormat(f.date_created);
        },

        /**
         * Guardar, publicar o borrador de la obra creada
         */
        updateArtwork() {
            if (this.form.state === 1 || this.publish) {
                if (!this.$refs.artworkForm.validate()) {
                    return this.noty(
                        "Por favor, revisa los campos, algunos son requeridos",
                        "error",
                        5000
                    );
                }
            }

            // loading
            this.globalLoading = true;

            // cargar datos
            const data = this.loadFormData();
            const ep = this.ep.artworks.update + this.form.id;

            // request
            this.axios
                .post(ep, data, this.headerFormData)
                .then((resp) => {
                    if (resp.status === 200) {
                        // mensajes
                        const draftMsj = "Obra guardada como borrador";
                        const publishMsj = "Obra publicada con éxito";
                        const inPauseMsj =
                            "Obra en pausa/borrador hasta que se agregue un método de cobro";

                        if (data.get("state") == 1) {
                            this.noty(publishMsj);
                        } else if (data.get("state") == 3) {
                            this.noty(draftMsj);
                        } else if (data.get("state") == 5) {
                            this.noty(inPauseMsj);
                        }

                        // --------------------
                        // redireccion
                        // --------------------
                        if (!this.isCollective) {
                            // obra de artista
                            const url = `/usuario/perfil/${this.user.id}/obras`;
                            this.$router.push(url);
                        }

                        if (this.isCollective) {
                            // obra de colectivo
                            const url = `/colectivos/perfil/${this.collectiveId}/artwork`;
                            this.$router.push(url);
                        }
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Confirmar si se desea actualizar o no la obra
         */
        confirmUpdate() {
            const msj = this.publish
                ? "¿Esta seguro de publicar esta obra?"
                : "¿Esta seguro de guardar esta obra como borrador?";

            const msjBtn = this.publish ? "Si, Publicar" : "Si, Guardar";

            this.$swal
                .fire({
                    title: msj,
                    showCancelButton: true,
                    confirmButtonColor: "#00BF30",
                    cancelButtonColor: "#d33",
                    confirmButtonText: msjBtn,
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
            const files = this.uploadedFiles;
            const data = new FormData();
            let state = 1;

            // si se guarda como borrador
            if (!this.publish) {
                state = 3;

                // si se quiere publicar
            } else if (this.publish && !this.hasPaymentMethod) {
                state = 5;

                // si cumple con todo, se publica
            } else {
                state = 1;
            }

            data.append("_method", "PUT");
            data.append("title", form.title);
            data.append("description", form.description ?? "");
            data.append("large_description", this.form.large_description ?? "");
            data.append("other_details", this.form.other_details ?? "");
            data.append("width", form.width ?? "");
            data.append("large", form.large ?? "");
            data.append("weight", form.weight ?? "");
            data.append("price", form.price ?? "");
            data.append("date_created", form.date_created);
            data.append("target", form.target ?? "");
            data.append("province", form.province ?? "");
            data.append("location", form.location ?? "");
            data.append("state", state);
            data.append(`type`, JSON.stringify(this.form.type));

            // data sync
            files.forEach((file) => data.append(`gallery[]`, file.file));

            return data;
        },

        /**
         * Carga las categorías
         * sub categorías y etiquetas
         */
        async loadType(data) {
            // agrupar las subcategorias
            const grouped = this.groupBy(
                data,
                (cat) => cat.pivot.sub_category_id
            );
            const arr = Array.from(grouped.values());
            const ids = arr.map((value) => value[0].id);
            this.form.type.category_id = ids.length ? ids[0] : "";

            // iterar y agregar a la prop principal
            for (const array of grouped.values()) {
                const subID = array[0].pivot.sub_category_id;
                this.form.type.sub_category.push({
                    id: subID,
                    labels: array.map((d) => d.pivot.sub_sub_category_id),
                });
            }

            // se agrega un objecto vacio por default
            // esto para que no ocurra ningún error al
            // momento de modificar las etiquetas
            const defaultData = { id: 0, labels: [] };
            const index = this.form.type.sub_category.length;
            this.form.type.sub_category.splice(index, 0, defaultData);
        },

        /**
         * Cargar las imagenes en el componente uploadFIle
         */
        loadGallery(gallery) {
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
        },

        /**
         * Verifica si el usuario tiene agregado algún método de cobro
         * si no lo tiene todas las obras se guardan como borrador
         */
        haveAChargingMethod() {
            this.axios
                .get(this.ep.user.getUserChargeMethods + this.user.id)
                .then((resp) => {
                    if (resp.data.length === 0) {
                        this.hasPaymentMethod = false;
                    }
                })
                .catch((error) => this.manageError(error));
        },
    },
};
</script>
