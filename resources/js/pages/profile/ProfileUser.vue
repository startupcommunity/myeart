<template>
    <div class="dashboard">
        <loading-overlay
            :active="stateLoading"
            :is-full-page="true"
            loader="bars"
        />

        <!-- pre y header -->
        <PreHeader />
        <Header />
        <!-- /pre y header -->

        <!-- sección hero -->
        <div
            class="relative z-[1] h-96 sm:h-[30rem] bg-no-repeat bg-cover bg-center"
            :class="!userProfile.front_photo ? 'bg-hero-profile-bg' : ''"
            :style="{
                'background-image': userProfile.front_photo ? frontPhoto : '',
            }"
        >
            <div
                class="container-fluid py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
            >
                <div class="">
                    <div
                        class="flex flex-row items-center justify-center sm:justify-between"
                    >
                        <div class="relative w-2/5 flex justify-center">
                            <img
                                :src="
                                    userProfile.profile_photo
                                        ? profilePhoto
                                        : '/img/avatar.png'
                                "
                                alt="profile-photo-myaert"
                                class="border rounded-full w-52 h-52 sm:w-56 sm:h-56"
                            />
                            <div
                                class="absolute sm:bottom-16 bottom-6 sm:pl-52 pl-44"
                            >
                                <button
                                    class="border rounded-full bg-white hover:bg-gray-100 px-2 py-1 text-primary text-2xl"
                                    @click.stop="dialogProfilePhoto = true"
                                >
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                        </div>
                        <div class="w-3/5 justify-end hidden sm:flex">
                            <button
                                class="font-bold sm:text-lg text-sm lg:mr-28 text-white"
                                type="button"
                                @click.stop="dialogFrontPhoto = true"
                            >
                                <i class="fas fa-camera"></i> Editar portada
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /sección hero -->

        <!-- tabs responsiva mobile -->
        <div class="flex flex-col justify-center items-center sm:hidden">
            <div class="mt-12">
                <v-btn
                    class="text-primary font-bold"
                    depressed
                    text
                    @click="editDataProfile = !editDataProfile"
                >
                    <i class="fa-solid fa-pen"></i> Editar perfil
                </v-btn>
            </div>
            <!-- botonera -->
            <div
                class="flex flex-wrap justify-center items-center mt-6 text-primary text-[10px] gap-2"
            >
                <!-- <div class=""> -->
                <div>
                    <button
                        type="button"
                        class="flex flex-col items-center justify-start space-y-2"
                        @click="loadSectionProfile('personal-data')"
                    >
                        <i class="fa fa-user fa-2x text-primary"></i>
                        <span class="tracking-tight font-bold">
                            Datos <br />
                            Personales
                        </span>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="flex flex-col items-center justify-start space-y-2"
                        @click="loadSectionProfile('obras')"
                    >
                        <i class="fas fa-palette text-primary fa-2x"></i>
                        <span class="tracking-tight font-bold">
                            Mis <br />
                            Obras
                        </span>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="flex flex-col items-center justify-start space-y-2"
                        @click="loadSectionProfile('pedidos')"
                    >
                        <i class="fas fa-shopping-cart text-primary fa-2x"></i>
                        <span class="tracking-tight font-bold">
                            Mis <br />
                            Pedidos
                        </span>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="flex flex-col items-center justify-start space-y-2"
                        @click="loadSectionProfile('direcciones')"
                    >
                        <i class="fas fa-location-arrow text-primary fa-2x"></i>
                        <span class="tracking-tight font-bold">
                            Mis <br />
                            Direcciones
                        </span>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="flex flex-col items-center justify-start space-y-2"
                        @click="loadSectionProfile('pagos')"
                    >
                        <i class="fas fa-money-check text-primary fa-2x"></i>
                        <span class="tracking-tight font-bold">
                            Métodos de <br />
                            Pago
                        </span>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="flex flex-col items-center justify-start space-y-2"
                        @click="loadSectionProfile('seguridad')"
                    >
                        <i class="fas fa-shield text-primary fa-2x"></i>
                        <span class="tracking-tight font-bold">
                            Privacidad <br />y Seguridad
                        </span>
                    </button>
                </div>
                <!-- </div> -->
            </div>
            <!-- /botonera -->

            <!-- div border -->
            <div class="w-4/5 mx-o border-t-2 border-primary my-8"></div>
            <!-- /div border -->
        </div>
        <!-- /tabs responsiva mobile -->

        <!-- sección tabs table++ -->
        <div class="container-fluid bg-white sm:bg-gray-200 py-0 px-0">
            <div>
                <div class="flex flex-row items-center">
                    <div
                        class="w-2/5 bg-gray-200 px-12 py-20 h-screen hidden sm:block"
                    >
                        <h3
                            class="text-3xl sm:text-lg md:text-3xl tracking-tight text-gray-900 text-center"
                        >
                            <b class="font-black"> {{ userProfile.name }} </b>
                        </h3>

                        <!-- botonera -->
                        <div class="flex justify-center mt-12">
                            <div
                                class="text-gray-800 sm:text-xs md:text-sm lg:text-lg"
                            >
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <button
                                        type="button"
                                        @click="
                                            loadSectionProfile('personal-data')
                                        "
                                    >
                                        <i class="fa fa-user text-primary"></i>
                                        <span
                                            class="tracking-tight uppercase font-bold"
                                        >
                                            Datos personales
                                        </span>
                                    </button>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <button
                                        type="button"
                                        @click="loadSectionProfile('obras')"
                                    >
                                        <i
                                            class="fas fa-palette text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase font-bold"
                                        >
                                            Mis obras
                                        </span>
                                    </button>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <button
                                        type="button"
                                        @click="loadSectionProfile('pedidos')"
                                    >
                                        <i
                                            class="fas fa-shopping-cart text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase font-bold"
                                        >
                                            Mis Pedidos
                                        </span>
                                    </button>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <button
                                        type="button"
                                        @click="
                                            loadSectionProfile('direcciones')
                                        "
                                    >
                                        <i
                                            class="fas fa-location-arrow text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase font-bold"
                                        >
                                            Mis Direcciones
                                        </span>
                                    </button>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <button
                                        type="button"
                                        @click="loadSectionProfile('pagos')"
                                    >
                                        <i
                                            class="fas fa-money-check text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase font-bold"
                                        >
                                            Métodos de pago
                                        </span>
                                    </button>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <button
                                        type="button"
                                        @click="loadSectionProfile('seguridad')"
                                    >
                                        <i
                                            class="fas fa-shield text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase font-bold"
                                        >
                                            Privacidad y seguridad
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- /botonera -->
                    </div>

                    <!-- sección datos personales -->
                    <div
                        class="w-full sm:w-3/5 bg-white px-12 sm:py-20 h-screen animate-fade-in-down"
                        id="personal-data"
                        v-show="true"
                    >
                        <div class="flex justify-center items-center">
                            <div class="w-full sm:w-4/5">
                                <p
                                    class="font-extrabold text-3xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
                                >
                                    Datos personales
                                </p>
                                <div
                                    class="pt-6 border-t-2 border-gray-900 w-100 hidden sm:block"
                                ></div>
                            </div>
                            <div class="sm:ml-8 hidden sm:block">
                                <v-btn
                                    class="text-primary"
                                    depressed
                                    text
                                    @click="editDataProfile = !editDataProfile"
                                >
                                    <i class="fa-solid fa-pen"></i> Editar
                                    perfil
                                </v-btn>
                            </div>
                        </div>
                        <div>
                            <v-form
                                @submit.prevent="updateUser"
                                v-if="loadProfile"
                            >
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="userProfile.name"
                                            name="fullname"
                                            label="Nombre y Apellidos"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-menu
                                            ref="menu"
                                            v-model="menuPickerOne"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-text-field
                                                    v-model="
                                                        userProfile.profile
                                                            .fecha_nacimiento
                                                    "
                                                    name="fecha_nac"
                                                    label="Fecha de nacimiento"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="
                                                    userProfile.profile
                                                        .fecha_nacimiento
                                                "
                                                no-title
                                                @input="menuPickerOne = false"
                                                :max="dateMaxPicker"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            name="sexo"
                                            v-model="userProfile.profile.sexo"
                                            :items="listGenre()"
                                            item-text="state"
                                            item-value="abbr"
                                            label="Sexo"
                                            return-object
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                            v-model="
                                                userProfile.profile.country
                                            "
                                            :items="countries.data"
                                            auto-select-first
                                            clearable
                                            name="country"
                                            label="País"
                                            item-text="nombre"
                                            item-value="id"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="userProfile.profile.lang"
                                            :items="listLang()"
                                            item-text="state"
                                            item-value="abbr"
                                            label="Idioma"
                                            return-object
                                            name="lang"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" v-if="editDataProfile">
                                        <v-btn
                                            class="text-primary"
                                            outlined
                                            type="submit"
                                        >
                                            <i class="fa-solid fa-save"></i>
                                            Actualizar datos
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </div>
                    </div>
                    <!-- /sección datos personales -->

                    <!-- sección obras -->
                    <div
                        class="w-3/5 bg-white px-12 py-20 h-screen animate-fade-in-down"
                        id="obras"
                        v-show="false"
                    >
                        <h3
                            class="font-black text-3xl tracking-tight uppercase text-gray-900"
                        >
                            Obras
                        </h3>
                        <div class="mt-4 py-6 border-t border-gray-900"></div>
                    </div>
                    <!-- /sección obras -->
                </div>
            </div>
        </div>
        <!-- sección tabs table++ -->

        <!-- El Newletter para grandes artistas -->
        <Newletter />
        <!-- /El Newletter para grandes artistas -->

        <!-- extra info -->
        <ExtraInfo />
        <!-- /extra info -->

        <!-- footer -->
        <Footer />
        <!-- /Footer -->

        <!-- modal de edición de foto de portada -->
        <ModalFrontPhoto
            :showModal="dialogFrontPhoto"
            @close-modal-edit-front-photo="dialogFrontPhoto = false"
        />

        <!-- modal de edición de foto de perfil -->
        <ModalProfilePhoto
            :showModal="dialogProfilePhoto"
            @close-modal-edit-profile-photo="dialogProfilePhoto = false"
        />
    </div>
</template>
<script>
// imports
import { mapState, mapGetters } from "vuex";

// componentes
import ExtraInfo from "../landing/ExtraInfo.vue";
import Header from "../landing/Header.vue";
import Newletter from "../landing/Newletter.vue";
import PreHeader from "../landing/PreHeader.vue";
import Footer from "../landing/Footer.vue";
import ModalFrontPhoto from "./ModalFrontPhoto.vue";
import ModalProfilePhoto from "./ModalProfilePhoto.vue";

// mixins
import getDataMixin from "../../mixins/getDataMixin";
import utilMixin from "../../mixins/utilMixin";
import requestErrorsMixin from "../../mixins/requestErrorsMixin";

// secciones como tabs
const SECTIONS = {
    "personal-data": "personal-data",
    obras: "obras",
    pedidos: "pedidos",
    direcciones: "direcciones",
    pagos: "pagos",
    seguridad: "seguridad",
};

export default {
    name: "ProfileUser",
    mixins: [getDataMixin, utilMixin, requestErrorsMixin],
    components: {
        Header,
        PreHeader,
        Newletter,
        ExtraInfo,
        Footer,
        ModalFrontPhoto,
        ModalProfilePhoto,
    },
    data() {
        return {
            menuPickerOne: false,
            editDataProfile: false,
            dialogFrontPhoto: false,
            dialogProfilePhoto: false,
            loadProfile: false,
        };
    },
    mounted() {
        // ubicado en mixin
        this.getCountries();
    },
    methods: {
        /**
         * Muestra la sección seleccionada
         *
         * Esto para que el usuario pueda moverse entre cada funcionalidad
         * de la vista, facilitando el uso de distintos apartados
         *
         * @param id        ID de la sección a mostrar
         */
        loadSectionProfile(id) {
            const section = document.getElementById(id);

            if (section) {
                // ocultar las demás secciones
                for (const sectionID in SECTIONS) {
                    if (sectionID != id) {
                        const hideSection = document.getElementById(sectionID);
                        hideSection ? (hideSection.style.display = "none") : "";
                    }
                }

                section.style.display = "block";
            }
        },

        /**
         * Actualiza los datos del usuario
         * tales como: nombre, fecha de nacimiento,
         * sexo, idioma, pais
         */
        updateUser() {
            // datos para el backend
            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("name", this.userProfile.name);
            formData.append(
                "fecha_nacimiento",
                this.userProfile.profile.fecha_nacimiento
            );
            formData.append("sexo", this.userProfile.profile.sexo.abbr);
            formData.append("lang", this.userProfile.profile.lang.abbr);
            formData.append("country", this.userProfile.profile.country);

            // request
            Vue.axios
                .post("/api/profile/update-profile", formData)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$notify({
                            group: "container",
                            text: resp.data.message,
                            type: "success",
                        });

                        // reload user
                        this.$store.dispatch("userRequest");
                    }
                })
                .catch((error) => {
                    this.showRequestErrors(error);
                });
        },
    },
    computed: {
        stateLoading() {
            return this.status === "loading";
        },

        /**
         * state de vuex
         */
        ...mapState({
            status: (state) => state.user.status,
        }),

        /**
         * Acceder a los getters necesarios
         */
        ...mapGetters({
            userProfile: "getProfile",
        }),

        /**
         * Foto de portada del usuario
         */
        frontPhoto() {
            return `url('${
                this.pathFrontPhoto + this.userProfile.front_photo
            }')`;
        },

        /**
         * Foto de perfil del usuario
         */
        profilePhoto() {
            return `${this.pathProfilePhoto + this.userProfile.profile_photo}`;
        },
    },

    watch: {
        async userProfile(val) {
            if (await val.profile) {
                this.loadProfile = true;
            }
        },
    },
};
</script>
