<template>
    <div class="top-header-area" id="sticker">
        <div id="mySidenav" class="sidenav">
            <div class="sidenav_header">
                <button href="#" class="closebtn" v-on:click="closeNav()">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </div>
            <div class="sidenav_body">
                <div class="w-100 d-flex justify-content-center">
                    <label
                        style="
                            border: 2px solid #b2794c;
                            padding: 5px;
                            border-radius: 50%;
                        "
                    >
                        <v-avatar size="120">
                            <v-img
                                :src="'/img/avatar.png'"
                                :lazy-src="'/img/avatar.png'"
                                @error="&quot;URL ON ERROR&quot;;"
                                width="118px"
                                height="118px"
                            >
                                <!-- ALSO, YOU CAN USE A LOADING ANIMATION -->
                                <template v-slot:placeholder>
                                    <v-progress-circular
                                        style="margin-top: 40px"
                                        indeterminate
                                        color="custm_theme_6"
                                    ></v-progress-circular>
                                </template>
                            </v-img>
                        </v-avatar>
                    </label>
                </div>
                <span>Artista/Fotografía</span>
                <a href="#">
                    SUBIR OBRA <i class="fa-solid fa-arrow-up-from-bracket"></i>
                </a>
                <a href="#">OBRAS</a>
                <a href="#">ARTISTAS</a>
                <a href="#">EVENTOS</a>
                <a href="#">MI COMUNIDAD</a>
            </div>
            <div class="sidenav_footer">
                <a href="#" @click.prevent="logout">CERRAR SESIÓN</a>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-sm-12 text-center">
                    <div class="main-menu-wrap">
                        <div class="flex justify-center items-center">
                            <!-- solo mobile -->
                            <div class="flex-fill d-block d-md-none d-lg-none">
                                <div
                                    class="w-100 d-flex justify-content-center -mt-4 sm:-mt-0"
                                >
                                    <i
                                        class="fa-solid fa-bars text-white"
                                        v-on:click="openNav()"
                                    ></i>
                                </div>
                            </div>

                            <!-- all responsive -->
                            <div
                                class="flex-fill d-flex justify-content-center"
                            >
                                <!-- logo -->
                                <div class="site-logo">
                                    <router-link :to="{ name: 'dashboard' }">
                                        <img
                                            src="/images/Logo_Myeart.svg"
                                            alt="my-eart"
                                        />
                                    </router-link>
                                </div>
                            </div>

                            <!-- solo escritorio -->
                            <div class="flex-fill d-none d-md-block d-lg-block">
                                <!-- menu start -->
                                <nav class="main-menu lg:mr-10 xl:mr-32">
                                    <ul class="text-left">
                                        <li>
                                            <a href="#">OBRAS</a>
                                        </li>
                                        <li>
                                            <a href="#">ARTISTAS</a>
                                        </li>
                                        <li>
                                            <a href="#">EVENTOS</a>
                                        </li>
                                        <li>
                                            <a href="#">MI COMUNIDAD</a>
                                        </li>

                                        <!-- area del perfil -->
                                        <li>
                                            <ul>
                                                <li class="menu-items-sub">
                                                    <div class="header-icons">
                                                        <a
                                                            class="mobile-hide search-bar-icon uppercase hover:no-underline"
                                                            href="#"
                                                        >
                                                            <i
                                                                class="fas fa-user mr-1"
                                                            ></i>
                                                            {{
                                                                perfilUsers.username
                                                            }}
                                                        </a>
                                                    </div>
                                                    <ul class="sub-menu">
                                                        <li class="bg-zinc-900">
                                                            <router-link
                                                                :to="{
                                                                    name: 'userProfile',
                                                                    params: {
                                                                        id: perfilUsers.id,
                                                                    },
                                                                }"
                                                            >
                                                                Perfil
                                                            </router-link>
                                                        </li>
                                                        <li class="bg-zinc-900">
                                                            <a
                                                                href="#"
                                                                @click.prevent="
                                                                    logout
                                                                "
                                                            >
                                                                Cerrar sesión
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div class="header-icons">
                                                        <a
                                                            class="shopping-cart hover:no-underline"
                                                            href="#"
                                                        >
                                                            <i
                                                                class="fas fa-shopping-cart mr-1"
                                                            ></i>
                                                            00.00
                                                        </a>
                                                        <button
                                                            class="btn btn-primary text-white px-3 py-2 rounded-lg"
                                                            v-if="
                                                                !isPathObrasCreate
                                                            "
                                                        >
                                                            SUBIR OBRA
                                                        </button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <!-- solo mobile -->
                            <div class="flex-fill d-block d-md-none d-lg-none">
                                <div
                                    class="w-100 d-flex justify-content-center -mt-4"
                                >
                                    <div class="flex-fill">
                                        <i
                                            class="fa-regular fa-user text-white"
                                        ></i>
                                    </div>
                                    <div class="flex-fill">
                                        <i
                                            class="fa-solid fa-cart-shopping text-white"
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- menu end -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Header",
    methods: {
        logout() {
            this.$store.dispatch("authLogout").then(() => {
                this.$router.push("/home");
            });
        },
        openNav() {
            document.getElementById("mySidenav").style.display = "block";
            document.getElementById("mySidenav").style.width = "80%";
        },
        closeNav() {
            document.getElementById("mySidenav").style.display = "none";
            document.getElementById("mySidenav").style.width = "0";
        },
    },
    computed: {
        perfilUsers() {
            return this.$store.getters.getProfile;
        },

        isPathObrasCreate() {
            return this.$route.path == "/obras/crear";
        },
    },
};
</script>
