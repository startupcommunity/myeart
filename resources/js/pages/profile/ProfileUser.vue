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
        <HeroProfile
            :user="userProfile"
            @openDialogPP="dialogProfilePhoto = true"
            @openDialogFP="dialogFrontPhoto = true"
        />
        <!-- /sección hero -->

        <!-- tabs responsiva mobile -->
        <MobileKeypad
            @loadSection="loadSection"
            @editDataProfile="editDataProfile = !editDataProfile"
        />
        <!-- /tabs responsiva mobile -->

        <!-- sección tabs table++ -->
        <div class="container-fluid py-0 px-0">
            <div>
                <div class="flex flex-row items-start bg-gray-200">
                    <!-- menu sidebar -->
                    <div
                        class="w-2/5 bg-gray-200 px-12 py-20 min-h-full hidden md:block"
                    >
                        <!-- botonera escritorio -->
                        <DesktopKeypad
                            :sections="sections"
                            @showSection="loadSection"
                            class="mt-5"
                        />
                    </div>
                    <!-- /menu sidebar -->

                    <!-- sección datos personales -->
                    <PersonalData
                        :editDataProfile="editDataProfile"
                        :showSection="sections.personal"
                        @editDataProfilePersonal="
                            editDataProfile = !editDataProfile
                        "
                        class="sm:min-h-[52rem]"
                    />
                    <!-- /sección datos personales -->

                    <!-- publicaciones -->
                    <Release
                        :showSection="sections.pub"
                        class="sm:min-h-[52rem]"
                    />
                    <!-- /publicaciones -->

                    <!-- sección obras -->
                    <Artwork
                        :showSection="sections.artwork"
                        class="sm:min-h-[52rem]"
                    />
                    <!-- /sección obras -->

                    <!-- sección favoritos -->
                    <Favourite
                        :showSection="sections.fav"
                        class="sm:min-h-[52rem]"
                    />
                    <!-- /sección favoritos -->

                    <!-- sección direcciones -->
                    <Address
                        :showSection="sections.direction"
                        class="sm:min-h-[52rem]"
                    />
                    <!-- /sección direcciones -->
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
import Address from "./sections/Address.vue";
import Favourite from "./sections/Favourite.vue";
import DesktopKeypad from "./sections/DesktopKeypad.vue";
import Release from "./sections/Release.vue";
import HeroProfile from "./sections/HeroProfile.vue";

// secciones como tabs
const SECTIONS = {
    personal: "personal",
    obras: "obras",
    pub: "pub",
    fav: "fav",
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
        MobileKeypad,
        Artwork,
        PersonalData,
        Address,
        Favourite,
        DesktopKeypad,
        Release,
        HeroProfile,
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
                pub: false,
                fav: false,
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

        this.loadSectionForParameter();
        globalThis.scrollTo(0, 0);
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
         * cargar una sección de la pagina si se indica
         * por parámetros de ruta
         */
        loadSectionForParameter() {
            if (this.$route.params.section) {
                this.loadSection(this.$route.params.section);
            }
        },

        /**
         * Mostrar u ocultar secciones
         */
        showOrHideSection(id) {
            this.sections.personal = id == SECTIONS.personal;
            this.sections.artwork = id == SECTIONS.obras;
            this.sections.pub = id == SECTIONS.pub;
            this.sections.fav = id == SECTIONS.fav;
            this.sections.direction = id == SECTIONS.direcciones;
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
