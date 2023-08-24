<template>
    <div class="dashboard">
        <loading-overlay
            :active="stateLoading"
            :is-full-page="true"
            loader="bars"
        />

        <!-- pre y header -->
        <!-- <PreHeader /> -->
        <Header v-if="showHeader" class="py-11" />
        <!-- /pre y header -->

        <!-- sección hero -->
        <HeroProfile
            :user="userProfile"
            @openDialogPP="dialogProfilePhoto = true"
            @openDialogFP="dialogFrontPhoto = true"
            @openCollectivesModal="openCollective"
        />
        <!-- /sección hero -->

        <!-- tabs responsiva mobile -->
        <MobileKeypad
            @loadSection="loadSection"
            @editDataProfile="editDataProfile = !editDataProfile"
            @openCollectivesModal="openCollective"
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
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /sección datos personales -->

                    <!-- publicaciones -->
                    <Release
                        :showSection="sections.pub"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /publicaciones -->

                    <!-- sección obras -->
                    <Artwork
                        :showSection="sections.artwork"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /sección obras -->

                    <!-- sección favoritos -->
                    <Favourite
                        :showSection="sections.fav"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /sección favoritos -->

                    <!-- sección pedidos -->
                    <Order
                        :showSection="sections.order"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /sección pedidos -->

                    <!-- sección ventas -->
                    <Sale
                        :showSection="sections.sale"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /sección ventas -->

                    <!-- sección direcciones -->
                    <Address
                        :showSection="sections.direction"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /sección direcciones -->

                    <!-- métodos de pago -->
                    <PaymentMethod
                        :showSection="sections.payment"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /métodos de pago -->

                    <!-- métodos de cobro -->
                    <ChargingMethod
                        :showSection="sections.charging"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /métodos de pago -->

                    <!-- calificaciones -->
                    <Rating
                        :showSection="sections.rating"
                        class="sm:min-h-[60rem]"
                    />
                    <!-- /calificaciones -->

                    <!-- calificaciones -->
                    <Balance
                        :showSection="sections.balance"
                        class="sm:min-h-[60rem]"
                        @goToSectionChargingMethod="loadSection"
                    />
                    <!-- /calificaciones -->
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

        <!-- modal mis colectivos -->
        <MyCollectivesModal
            :show="dialogCollectives"
            @close-modal="closeCollectiveModal"
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
import Footer from "../landing/sections/Footer.vue";
import ModalFrontPhoto from "./ModalFrontPhoto.vue";
import ModalProfilePhoto from "./ModalProfilePhoto.vue";

// secciones
import Artwork from "./sections/Artwork.vue";
import DesktopKeypad from "./sections/DesktopKeypad.vue";
import MobileKeypad from "./sections/MobileKeypad.vue";
import PersonalData from "./sections/PersonalData.vue";
import Address from "./sections/Address.vue";
import Favourite from "./sections/Favourite.vue";
import Release from "./sections/Release.vue";
import Order from "./sections/Order.vue";
import HeroProfile from "./sections/HeroProfile.vue";
import MyCollectivesModal from "./components/MyCollectivesModal.vue";
import Sale from "./sections/Sale.vue";
import PaymentMethod from "./sections/PaymentMethod.vue";
import ChargingMethod from "./sections/ChargingMethod.vue";
import Rating from "./sections/Rating.vue";
import Balance from "./sections/Balance.vue";

// secciones como tabs
const SECTIONS = {
    personal: "personal",
    obras: "obras",
    pub: "pub",
    fav: "fav",
    order: "order",
    sale: "sale",
    direcciones: "direcciones",
    payment: "payment",
    charging: "charging",
    rating: "rating",
    seguridad: "seguridad",
    balance: "balance",
};

export default {
    name: "ProfileUser",
    components: {
        Header,
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
        Order,
        HeroProfile,
        MyCollectivesModal,
        Sale,
        PaymentMethod,
        ChargingMethod,
        Rating,
        Balance,
    },
    data() {
        return {
            editDataProfile: false,
            dialogFrontPhoto: false,
            dialogProfilePhoto: false,
            dialogCollectives: false,
            showHeader: true,

            // secciones
            sections: {
                personal: false,
                artwork: false,
                pub: false,
                fav: false,
                order: false,
                sale: false,
                direction: false,
                payment: false,
                charging: false,
                rating: false,
                security: false,
                balance: false,
            },
        };
    },
    mounted() {
        // desactivar modo oscuro
        this.$vuetify.theme.dark = false;
        this.sections.pub = true;

        this.loadSectionForParameter();
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
            this.sections.order = id == SECTIONS.order;
            this.sections.sale = id == SECTIONS.sale;
            this.sections.direction = id == SECTIONS.direcciones;
            this.sections.payment = id == SECTIONS.payment;
            this.sections.charging = id == SECTIONS.charging;
            this.sections.rating = id == SECTIONS.rating;
            this.sections.security = id == SECTIONS.seguridad;
            this.sections.balance = id == SECTIONS.balance;
        },

        /**
         * Abrir El modal de colectivos
         */
        openCollective() {
            this.dialogCollectives = true;

            // ocultar el header
            this.showHeader = false;
        },

        /**
         * Cerrar el modal de colectivos
         */
        closeCollectiveModal() {
            this.dialogCollectives = false;

            // mostrar el header
            this.showHeader = true;
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
