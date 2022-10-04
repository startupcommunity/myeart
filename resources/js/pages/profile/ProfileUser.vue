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
            class="relative z-[1] h-[30rem] bg-hero-profile-bg bg-no-repeat bg-cover bg-center"
        >
            <div class="absolute inset-x-0 bottom-0 container max-w-screen-xl">
                <div class="">
                    <div class="flex justify-between items-end">
                        <div class="relative -mb-12 lg:-left-12 md:-left-0">
                            <img
                                :src="'/img/avatar.png'"
                                alt="profile-myaert"
                                class="rounded-full md:w-56 md:h-56"
                            />
                            <div class="absolute bottom-12 -right-4">
                                <button
                                    class="rounded-full bg-white hover:bg-gray-100 px-2 py-1 text-primary text-2xl"
                                >
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <button class="font-bold text-lg">
                                <i class="fas fa-camera"></i> Editar portada
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- sección datos -->
        <div class="container-fluid bg-gray-200 py-0 px-0">
            <div class="">
                <div class="flex flex-row items-center">
                    <div class="w-2/5 bg-gray-200 px-12 py-20 h-screen">
                        <h3
                            class="text-4xl tracking-tight text-gray-900 text-center"
                        >
                            <b class="font-black"> {{ userProfile.name }} </b>
                        </h3>
                        <div class="flex justify-center mt-12">
                            <div class="text-gray-800 text-lg">
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <i class="fa fa-user text-primary"></i>
                                    <span
                                        class="tracking-tight uppercase font-bold"
                                    >
                                        Datos personales
                                    </span>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <i class="fas fa-palette text-primary"></i>
                                    <span
                                        class="tracking-tight uppercase font-bold"
                                    >
                                        Mis obras
                                    </span>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <i
                                        class="fas fa-shopping-cart text-primary"
                                    ></i>
                                    <span
                                        class="tracking-tight uppercase font-bold"
                                    >
                                        Mis Pedidos
                                    </span>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <i
                                        class="fas fa-location-arrow text-primary"
                                    ></i>
                                    <span
                                        class="tracking-tight uppercase font-bold"
                                    >
                                        Mis Direcciones
                                    </span>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <i
                                        class="fas fa-money-check text-primary"
                                    ></i>
                                    <span
                                        class="tracking-tight uppercase font-bold"
                                    >
                                        Métodos de pago
                                    </span>
                                </div>
                                <div
                                    class="flex flex-wrap gap-4 items-center justify-start py-6"
                                >
                                    <i class="fas fa-shield text-primary"></i>
                                    <span
                                        class="tracking-tight uppercase font-bold"
                                    >
                                        Privacidad y seguridad
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-3/5 bg-white px-12 py-20 h-screen">
                        <h3
                            class="font-black text-4xl tracking-tight uppercase text-gray-900"
                        >
                            Datos personales
                        </h3>
                        <div class="mt-4 py-6 border-t border-gray-900"></div>
                        <div>
                            <v-form>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="profile.name"
                                            label="Nombre y Apellidos"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.date"
                                            label="Fecha de nacimiento"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.genre"
                                            label="Sexo"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.country"
                                            label="Pais"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.lang"
                                            label="Idioma"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- El newsletter para grandes artistas -->
        <Newletter />
        <!-- /El newsletter para grandes artistas -->

        <!-- extra info -->
        <ExtraInfo />
        <!-- /extra info -->

        <!-- footer -->
        <Footer />
        <!-- /Footer -->
    </div>
</template>
<script>
// imports
import { mapState } from "vuex";
import ExtraInfo from '../landing/ExtraInfo.vue';
import Header from "../landing/Header.vue";
import Newletter from '../landing/Newletter.vue';
import PreHeader from "../landing/PreHeader.vue";
import Footer from "../landing/Footer.vue";

export default {
    name: "ProfileUser",
    components: { Header, PreHeader, Newletter, ExtraInfo, Footer },
    data() {
        return {
            profile: {},
        };
    },
    mounted() {
        // console.log(this.userProfile.username);
    },
    computed: {
        stateLoading() {
            return this.status === "loading";
        },
        ...mapState({
            status: (state) => state.user.status,
        }),
        userProfile() {
            return this.$store.getters.getProfile;
        },
    },
};
</script>
