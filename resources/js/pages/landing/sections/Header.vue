<template>
    <div class="top-header-area" id="sticker">
        <!-- menu mobile -->
        <MobileMenu />
        <!-- /menu mobile -->

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-sm-12 text-center">
                    <div class="main-menu-wrap">
                        <div class="flex justify-center items-center">
                            <!-- solo mobile -->
                            <div class="flex-fill block lg:hidden">
                                <div
                                    class="w-100 d-flex justify-content-center -mt-4 xl:-mt-0"
                                >
                                    <i
                                        class="fa-solid fa-bars text-white"
                                        @click="openNav()"
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
                                            class="w-40"
                                        />
                                    </router-link>
                                </div>
                            </div>

                            <!-- solo escritorio -->
                            <div class="flex-fill hidden lg:block">
                                <!-- menu start -->
                                <nav class="main-menu lg:mr-8 xl:mr-32">
                                    <ul class="text-left text-[9px] xl:text-xs">
                                        <li>
                                            <router-link
                                                :to="{ name: 'listArtwork' }"
                                            >
                                                OBRAS
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link
                                                :to="{ name: 'listArtist' }"
                                            >
                                                ARTISTAS
                                            </router-link>
                                        </li>
                                        <li>
                                            <a href="#">EVENTOS</a>
                                        </li>
                                        <li>
                                            <router-link
                                                :to="{ name: 'indexCommunity' }"
                                            >
                                                MI COMUNIDAD
                                            </router-link>
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
                                                            {{ user.username }}
                                                        </a>
                                                    </div>
                                                    <ul class="sub-menu">
                                                        <li class="bg-zinc-900">
                                                            <router-link
                                                                :to="
                                                                    pathProfile
                                                                "
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
                                                        <router-link
                                                            :to="
                                                                pathShoppingCart
                                                            "
                                                            class="hover:no-underline"
                                                        >
                                                            <i
                                                                class="fas fa-shopping-cart mr-1"
                                                            ></i>
                                                            {{ totalCart }}
                                                        </router-link>
                                                        <button
                                                            class="btn btn-primary text-white px-3 py-2 rounded-lg"
                                                            v-if="
                                                                !isPathObrasCreate
                                                            "
                                                            @click.stop="
                                                                $router.push(
                                                                    `/obras/crear`
                                                                )
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
                            <div class="flex-fill block lg:hidden">
                                <div
                                    class="w-100 d-flex justify-content-center -mt-4"
                                >
                                    <div class="flex-fill">
                                        <router-link :to="pathProfile">
                                            <i
                                                class="fa-regular fa-user text-white"
                                            ></i>
                                        </router-link>
                                    </div>
                                    <div class="flex-fill">
                                        <router-link :to="pathShoppingCart">
                                            <i
                                                class="fas fa-shopping-cart text-white"
                                            ></i>
                                        </router-link>
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
import MobileMenu from "./components/MobileMenu.vue";

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
        closeAndGo(val) {
            if (val == "obras") {
                this.$router.push("/obras/crear");
            }
            this.closeNav();
        },
    },
    computed: {
        user() {
            return this.$store.getters.getProfile;
        },
        isPathObrasCreate() {
            return this.$route.path == "/obras/crear";
        },
        pathProfile() {
            return {
                name: "userProfile",
                params: {
                    id: this.user.id,
                },
            };
        },
        pathShoppingCart() {
            return {
                name: "shoppingCart",
            };
        },
        totalCart() {
            const shoppingCart = this.user?.shopping_cart || [];

            // devolver la cantidad de artículos en el carrito
            return shoppingCart.length || 0;
        },
    },
    components: { MobileMenu },
};
</script>
