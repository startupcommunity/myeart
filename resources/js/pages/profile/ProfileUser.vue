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
                        <div class="w-1/3 block sm:hidden"></div>
                        <div
                            class="relative w-full sm:w-2/5 flex justify-center px-2 sm:px-0"
                        >
                            <img
                                :src="
                                    userProfile.profile_photo
                                        ? profilePhoto
                                        : '/img/avatar.png'
                                "
                                alt="profile-photo-myaert"
                                class="rounded-full w-48 h-48 sm:w-56 sm:h-56"
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
                        <div class="w-1/3 sm:w-3/5 justify-end flex">
                            <button
                                class="font-bold text-xs sm:text-lg lg:mr-28 text-white"
                                type="button"
                                @click.stop="dialogFrontPhoto = true"
                            >
                                <i class="fas fa-camera"></i> Editar portada
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="absolute top-0 bottom-auto pb-24 inset-x-0 bg-gray-900 bg-opacity-60"
            ></div>
        </div>
        <!-- /sección hero -->

        <!-- tabs responsiva mobile -->
        <MobileKeypad
            @loadSection="loadSection"
            @editDataProfile="editDataProfile = !editDataProfile"
        />
        <!-- /tabs responsiva mobile -->

        <!-- sección tabs table++ -->
        <div class="container-fluid bg-white sm:bg-gray-200 py-0 px-0">
            <div>
                <div class="flex flex-row items-center">
                    <div
                        class="w-2/5 bg-gray-200 px-12 pt-20 h-full sm:h-screen hidden sm:block"
                    >
                        <h3
                            class="text-3xl sm:text-lg md:text-3xl tracking-tight text-gray-900 text-center"
                        >
                            <b class="font-black"> {{ userProfile.name }} </b>
                        </h3>

                        <!-- botonera escritorio -->
                        <div class="flex justify-center mt-12">
                            <div
                                class="text-gray-800 sm:text-xs md:text-sm lg:text-lg"
                            >
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <button
                                        type="button"
                                        @click="loadSection('personal')"
                                    >
                                        <i class="fa fa-user text-primary"></i>
                                        <span
                                            class="tracking-tight uppercase"
                                            :class="
                                                sections.personal
                                                    ? 'font-black'
                                                    : 'font-light'
                                            "
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
                                        @click="loadSection('obras')"
                                    >
                                        <i
                                            class="fas fa-palette text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase"
                                            :class="
                                                sections.artwork
                                                    ? 'font-black'
                                                    : 'font-light'
                                            "
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
                                        @click="loadSection('pedidos')"
                                    >
                                        <i
                                            class="fas fa-shopping-cart text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase"
                                            :class="
                                                sections.order
                                                    ? 'font-black'
                                                    : 'font-light'
                                            "
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
                                        @click="loadSection('direcciones')"
                                    >
                                        <i
                                            class="fas fa-location-arrow text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase"
                                            :class="
                                                sections.direction
                                                    ? 'font-black'
                                                    : 'font-light'
                                            "
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
                                        @click="loadSection('pagos')"
                                    >
                                        <i
                                            class="fas fa-money-check text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase"
                                            :class="
                                                sections.payment
                                                    ? 'font-black'
                                                    : 'font-light'
                                            "
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
                                        @click="loadSection('seguridad')"
                                    >
                                        <i
                                            class="fas fa-shield text-primary"
                                        ></i>
                                        <span
                                            class="tracking-tight uppercase"
                                            :class="
                                                sections.security
                                                    ? 'font-black'
                                                    : 'font-light'
                                            "
                                        >
                                            Privacidad y seguridad
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- /botonera escritorio -->
                    </div>

                    <!-- sección datos personales -->
                    <PersonalData
                        :editDataProfile="editDataProfile"
                        :showSection="sections.personal"
                        @editDataProfilePersonal="
                            editDataProfile = !editDataProfile
                        "
                    />
                    <!-- /sección datos personales -->

                    <!-- sección obras -->
                    <Artwork :showSection="sections.artwork" />
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
import ExtraInfo from "../landing/sections/ExtraInfo.vue";
import Header from "../landing/sections/Header.vue";
import Newletter from "../landing/sections/Newletter.vue";
import PreHeader from "../landing/sections/PreHeader.vue";
import Footer from "../landing/sections/Footer.vue";
import ModalFrontPhoto from "./ModalFrontPhoto.vue";
import ModalProfilePhoto from "./ModalProfilePhoto.vue";

// secciones
import Artwork from "./sections/Artwork.vue";
import MobileKeypad from "./sections/MobileKeypad.vue";
import PersonalData from "./sections/PersonalData.vue";

// secciones como tabs
const SECTIONS = {
    personal: "personal",
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
        Artwork,
        MobileKeypad,
        PersonalData,
    },
    data() {
        return {
            editDataProfile: false,
            dialogFrontPhoto: false,
            dialogProfilePhoto: false,

            // secciones
            sections: {
                personal: false,
                artwork: false,
                order: false,
                direction: false,
                payment: false,
                security: false,
            },
        };
    },
    mounted() {
        // desactivar modo oscuro
        this.$vuetify.theme.dark = false;
        this.sections.personal = true;
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
        loadSection(id) {
            const section = document.getElementById(id);

            if (section) {
                // ocultar las demás secciones
                for (const sectionID in SECTIONS) {
                    if (sectionID != id) {
                        const hideSection = document.getElementById(sectionID);
                        hideSection ? (hideSection.style.display = "none") : "";
                    }
                }

                // mostrar o ocultar
                this.showOrHideSection(id);
            }
        },

        /**
         * Mostrar u ocultar secciones
         */
        showOrHideSection(id) {
            this.sections.personal = id == SECTIONS.personal;
            this.sections.artwork = id == SECTIONS.obras;
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
};
</script>
