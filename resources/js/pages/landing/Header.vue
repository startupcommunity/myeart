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
                        <div class="d-flex">
                            <div class="flex-fill d-block d-md-none d-lg-none">
                                <div
                                    class="w-100 d-flex justify-content-center"
                                    style="
                                        height: 100%;
                                        font-size: 20px;
                                        padding-top: 10px;
                                    "
                                >
                                    <i
                                        class="fa-solid fa-bars"
                                        v-on:click="openNav()"
                                    ></i>
                                </div>
                            </div>
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
                            <div class="flex-fill d-none d-md-block d-lg-block">
                                <!-- menu start -->
                                <nav class="main-menu">
                                    <ul style="text-align: left">
                                        <li class="current-list-item">
                                            <a href="#">OBRAS</a>
                                        </li>
                                        <li>
                                            <a href="about.html">ARTISTAS</a>
                                        </li>
                                        <li>
                                            <a href="news.html">EVENTOS</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">
                                                MI COMUNIDAD
                                            </a>
                                        </li>
                                        <li>
                                            <ul>
                                                <li class="menu-items-sub">
                                                    <div class="header-icons">
                                                        <a
                                                            class="mobile-hide search-bar-icon"
                                                            href="#"
                                                        >
                                                            <i
                                                                class="fas fa-user"
                                                                style="
                                                                    margin-right: 5px;
                                                                "
                                                            ></i>
                                                            {{
                                                                perfilUsers.username
                                                            }}
                                                        </a>
                                                    </div>
                                                    <ul class="sub-menu">
                                                        <li>
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
                                                        <li>
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
                                                            class="shopping-cart"
                                                            href="cart.html"
                                                        >
                                                            <i
                                                                class="fas fa-shopping-cart"
                                                                style="
                                                                    margin-right: 5px;
                                                                "
                                                            ></i>
                                                            00.00
                                                        </a>
                                                        <button
                                                            class="btn btn-primary text-white"
                                                            style="
                                                                margin-right: 32px;
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
                            <div class="flex-fill d-block d-md-none d-lg-none">
                                <div
                                    class="w-100 d-flex justify-content-center"
                                    style="
                                        height: 100%;
                                        font-size: 20px;
                                        padding-top: 10px;
                                    "
                                >
                                    <div class="flex-fill">
                                        <i class="fa-regular fa-user"></i>
                                    </div>
                                    <div class="flex-fill">
                                        <i
                                            class="fa-solid fa-cart-shopping"
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
    },
};
</script>
