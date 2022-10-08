<template>
    <div class="dashboard">
        <loading-overlay
            :active="stateLoading"
            :is-full-page="true"
            loader="bars"
        />
        <PreHeader />
        <Header />

        <!-- sección hero -->
        <div
            class="relative z-[1] h-[30rem] bg-no-repeat bg-cover bg-center"
            :class="!userProfile.front_photo ? 'bg-hero-profile-bg' : ''"
            :style="{
                'background-image': userProfile.front_photo ? frontPhoto : '',
            }"
        >
            <div
                class="container-fluid py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
            >
                <div class="">
                    <div class="flex flex-row items-center">
                        <div class="relative w-2/5 flex justify-center">
                            <img
                                :src="
                                    userProfile.profile_photo
                                        ? profilePhoto
                                        : '/img/avatar.png'
                                "
                                alt="profile-photo-myaert"
                                class="rounded-full md:w-56 md:h-56"
                            />
                            <div
                                class="absolute sm:bottom-16 bottom-8 sm:pl-52 pl-32"
                            >
                                <button
                                    class="rounded-full bg-white hover:bg-gray-100 px-2 py-1 text-primary text-2xl"
                                    @click.stop="
                                        showModalEditProfilePhoto = true
                                    "
                                >
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                        </div>
                        <div class="w-3/5 flex justify-end">
                            <button
                                class="font-bold sm:text-lg text-sm lg:mr-28 text-white"
                                type="button"
                                @click.stop="showModalEditFrontPhoto = true"
                            >
                                <i class="fas fa-camera"></i> Editar portada
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /sección hero -->

        <!-- sección tabs -->
        <div class="container-fluid bg-gray-200 py-0 px-0">
            <div class="">
                <div class="flex flex-row items-center">
                    <div class="w-2/5 bg-gray-200 px-12 py-20 h-screen">
                        <h3
                            class="text-4xl tracking-tight text-gray-900 text-center"
                        >
                            <b class="font-black"> {{ userProfile.name }} </b>
                        </h3>

                        <!-- botonera -->
                        <div class="flex justify-center mt-12">
                            <div class="text-gray-800 text-lg">
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
                        class="w-3/5 bg-white px-12 py-20 h-screen animate-fade-in-down"
                        id="personal-data"
                        v-show="true"
                    >
                        <div class="flex justify-start items-center">
                            <div class="w-full sm:w-4/5">
                                <p
                                    class="font-extrabold text-4xl tracking-tight uppercase text-gray-900"
                                >
                                    Datos <br />personales
                                </p>
                                <div
                                    class="pt-6 border-t-2 border-gray-900 w-100"
                                ></div>
                            </div>
                            <div class="sm:ml-8">
                                <v-btn class="text-primary" depressed text>
                                    <i class="fa-solid fa-pen"></i> Editar perfil
                                </v-btn>
                            </div>
                        </div>
                        <div>
                            <v-form
                                @submit.prevent="updateUser"
                                v-if="userProfile.profile"
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
                                                :max="dateMax"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            name="sexo"
                                            v-model="userProfile.profile.sexo"
                                            :items="listGenre"
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
                                            :items="listLang"
                                            item-text="state"
                                            item-value="abbr"
                                            label="Idioma"
                                            return-object
                                            name="lang"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <button
                                            type="submit"
                                            class="text-primary hover:text-gray-800 border px-3 py-2.5 border-gray-800"
                                        >
                                            Actualizar datos
                                        </button>
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
                            class="font-black text-4xl tracking-tight uppercase text-gray-900"
                        >
                            Obras
                        </h3>
                        <div class="mt-4 py-6 border-t border-gray-900"></div>
                    </div>
                    <!-- /sección obras -->
                </div>
            </div>
        </div>
        <!-- sección tabs -->

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
            :showModal="showModalEditFrontPhoto"
            @close-modal-edit-front-photo="showModalEditFrontPhoto = false"
        />

        <!-- modal de edición de foto de perfil -->
        <ModalProfilePhoto
            :showModal="showModalEditProfilePhoto"
            @close-modal-edit-profile-photo="showModalEditProfilePhoto = false"
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
            profile: {
                date: "",
            },
            menuPickerOne: false,
            countries: [],
            showModalEditFrontPhoto: false,
            showModalEditProfilePhoto: false,
        };
    },
    mounted() {
        this.getCountries();
        console.log(this.$store.state.user);
        // console.log(this.getProfile);
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
         * Obtener los paises para el select del perfil del usuario
         */
        getCountries() {
            Vue.axios
                .get("/api/paises")
                .then((resp) => {
                    this.countries = resp.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        updateUser(event) {
            const target = event.target;
            let data = {};

            for (let input of target) {
                console.log(input.name == "fullname");
                if (input.name == "fullname") data.name = input.value;
                if (input.name == "fecha_nac") data.fecha_nac = input.value;
                if (input.name == "sexo") data.sexo = input.value;
                if (input.name == "lang") data.lang = input.value;
                if (input.name == "country") data.country = input.value;
            }

            console.log(data);
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
         * Path para las fotos de portadas
         */
        pathFrontPhoto() {
            const path = document.head.querySelector(
                'meta[name="front-photo"]'
            );
            if (path) {
                return path.content;
            }

            return "/";
        },

        /**
         * Path para las fotos de perfil
         */
        pathProfilePhoto() {
            const path = document.head.querySelector(
                'meta[name="profile-photo"]'
            );
            if (path) {
                return path.content;
            }

            return "/";
        },

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

        /**
         * Listado de genero para el usuario
         */
        listGenre() {
            return [
                { state: "Seleccione sexo", abbr: "" },
                { state: "Hombre", abbr: 1 },
                { state: "Mujer", abbr: 2 },
                { state: "Otro", abbr: 3 },
            ];
        },

        /**
         * Lista de idiomas permitidos
         */
        listLang() {
            return [
                { state: "Seleccione idioma", abbr: "" },
                { state: "Español", abbr: "es" },
                { state: "Ingles", abbr: "en" },
            ];
        },

        /**
         * Fecha máxima permitida para el picker de fecha de nacimiento
         */
        dateMax() {
            const date = new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            );
            return date.toISOString().substr(0, 10);
        },
    },
};
</script>
