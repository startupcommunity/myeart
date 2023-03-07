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
                        <v-col cols="12" md="4">
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
                                <!-- <v-text-field
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
                                </v-text-field> -->
                            </div>
                        </v-col>
                        <v-col cols="12" md="8">
                            <Category
                                :category="form.type"
                                :dataCategories="categories"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="form.large_description">
                                <template slot="label">
                                    <span
                                        class="font-black tracking-wide uppercase text-gray-900"
                                    >
                                        Descripción larga
                                    </span>
                                </template>
                            </v-textarea>
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
                                    @click.stop="isDraft = 3"
                                    v-if="!isCollective"
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
import { mapGetters } from "vuex";
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
    name: "CreateArtwork",
    mixins: [
        createRules,
        utilMixin,
        getDataMixin,
        requestErrorsMixin,
        uploadFilesMixin,
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
                location: "",
                // shipping: "",
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
            isDraft: 3,
        };
    },
    mounted() {
        // mixin
        this.form.date_created = this.actualDate;
        this.getCategories();

        if (this.userProfile.id) {
            this.haveAChargingMethod();
        }
    },
    computed: {
        /**
         * Acceder a los getters necesarios
         */
        ...mapGetters({
            userProfile: "getProfile",
        }),

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
        userProfile(val) {
            if (val.id) {
                this.haveAChargingMethod();
            }
        },
    },

    methods: {
        /**
         * Verifica si el usuario tiene agregado algún método de cobro
         * si no lo tiene se desactiva el formulario
         */
        haveAChargingMethod() {
            this.axios
                .get(this.ep.user.getUserChargeMethods + this.userProfile.id)
                .then((resp) => {
                    if (resp.data.length === 0) {
                        this.hasPaymentMethod = false;
                        // this.formIsValid = false;
                        // this.disabledForm = true;
                        // this.confirmedDialog({
                        //     title: "Agrega un método de cobro",
                        //     text: "Para poder publicar una obra debes agregar un método de cobro primero",
                        //     icon: "warning",
                        //     confirmButtonText: "Agregar método de cobro",
                        //     cancelButtonText: "No, gracias",
                        // }).then((result) => {
                        //     if (result.isConfirmed) {
                        //         this.$router.push({
                        //             name: "userProfile",
                        //             params: {
                        //                 id: this.userProfile.id,
                        //                 section: "charging",
                        //             },
                        //         });
                        //     }
                        // });
                    }
                })
                .catch((error) => this.manageError(error));
        },

        /**
         * Guardar, publicar o guardar como borrador
         */
        saveArtwork() {
            if (this.isDraft === 1) {
                if (!this.$refs.artworkForm.validate()) {
                    this.noty(
                        "Por favor, revisa los campos, algunos son requeridos",
                        "error",
                        5000
                    );
                    return;
                }
            }

            // evaluare parámetro type de ruta
            const type_artwork = this.$route.params.type ?? 1;

            this.globalLoading = true;

            const data = new FormData();
            const state =
                this.isDraft === 1 ? (!this.hasPaymentMethod ? 5 : 1) : 3;
            // const in_pause = !this.hasPaymentMethod && this.isDraft === 1 ? 1 : 0;
            data.append("title", this.form.title);
            data.append("description", this.form.description);
            data.append("large_description", this.form.large_description);
            data.append("other_details", this.form.other_details);
            data.append("width", this.form.width);
            data.append("large", this.form.large);
            data.append("weight", this.form.weight);
            data.append("price", this.form.price);
            data.append("date_created", this.form.date_created);
            data.append("location", this.form.location);
            data.append("state", state);
            // data.append("in_pause", in_pause);
            data.append(`type`, JSON.stringify(this.form.type));
            data.append(`type_artwork`, type_artwork);

            if (this.collectiveId) {
                data.append(`collective_id`, this.collectiveId);
            }

            // data sync
            const files = this.uploadedFiles;
            files.forEach((file) => data.append(`gallery[]`, file));

            // request
            this.axios
                .post(this.ep.artworks.save, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((resp) => {
                    if (resp.status === 200) {
                        // mensaje
                        const draftMsj = "Obra guardada como borrador";
                        const publishMsj = "Obra publicada con éxito";
                        const inPauseMsj =
                            "Obra en pausa hasta que se agregue un método de cobro";

                        if (data.get("state") == 1) {
                            this.noty(publishMsj);
                        } else if (data.get("state") == 5) {
                            this.noty(inPauseMsj);
                        } else if (data.get("state") == 3) {
                            this.noty(draftMsj);
                        }

                        // redireccion
                        // obra de artista
                        if (type_artwork == 1) {
                            this.$router.push(
                                `/usuario/perfil/${this.userProfile.id}/obras`
                            );
                            return;
                        }

                        // obra de colectivo
                        if (type_artwork == 2) {
                            this.$router.push(
                                `/colectivos/perfil/${this.collectiveId}/artwork`
                            );
                        }
                    }
                })
                .catch((error) => this.showRequestErrors(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
