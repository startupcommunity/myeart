<template>
    <section class="bg-black" id="home">
        <div class="w-full">
            <div class="container">
                <div class="flex justify-between items-center">
                    <!-- solo mobile -->
                    <!-- <div class="block lg:hidden">
                        <div
                            class="w-100 d-flex justify-content-center -mt-4 xl:-mt-0"
                        >
                            <i
                                class="fa-solid fa-bars text-white"
                                @click="openNav()"
                            ></i>
                        </div>
                    </div> -->

                    <!-- logo all -->
                    <div>
                        <div
                            class="flex justify-center justify-md-start max-w-[180px] -mr-16"
                        >
                            <router-link :to="{ name: 'guestHome' }">
                                <img
                                    src="/images/Logo_Myeart.svg"
                                    alt="my-eart"
                                    class="w-40 mx-auto"
                                />
                            </router-link>
                        </div>
                    </div>

                    <!-- solo mobile -->
                    <div class="block lg:hidden" v-if="isUserGuest">
                        <div class="flex flex-col gap-3">
                            <router-link
                                :to="{ name: 'login' }"
                                class="text-xs text-white"
                            >
                                <i
                                    class="fa-solid fa-right-to-bracket text-white"
                                ></i>
                                LOGIN
                            </router-link>
                            <router-link
                                :to="{ name: 'register' }"
                                class="text-xs text-white"
                            >
                                <i
                                    class="fa-solid fa-floppy-disk text-white"
                                ></i>
                                REGISTRO
                            </router-link>
                        </div>
                    </div>

                    <!-- solo escritorio -->
                    <!-- Navbar -->
                    <div class="hidden lg:block">
                        <nav class="">
                            <ul
                                class="flex justify-start uppercase text-white font-light text-sm gap-8"
                            >
                                <li>
                                    <a
                                        @click.stop="goToScroll('#home')"
                                        class="hover:no-underline text-white"
                                    >
                                        HOME
                                    </a>
                                </li>
                                <li>
                                    <a
                                        @click.stop="goToScroll('#about-us')"
                                        class="hover:no-underline text-white"
                                    >
                                        Quienes somos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        @click.stop="goToScroll('#faqs')"
                                        class="hover:no-underline text-white"
                                    >
                                        Faqs
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <!-- login y registros  -->
                    <div class="hidden lg:block">
                        <div class="flex gap-3">
                            <v-btn
                                :to="{ name: 'login' }"
                                class="text-xs text-white hover:no-underline"
                                color="#B2794C"
                                v-if="isUserGuest"
                            >
                                LOGIN
                            </v-btn>
                            <v-btn
                                :to="{ name: 'register' }"
                                class="text-xs text-white hover:no-underline"
                                color="#B2794C"
                                v-if="isUserGuest"
                            >
                                REGISTRARME
                            </v-btn>
                            <v-btn
                                :to="{
                                    name: 'userProfile',
                                    params: { id: authUser.id },
                                }"
                                class="text-xs text-white hover:no-underline uppercase"
                                color="#B2794C"
                                v-if="!isUserGuest"
                            >
                                IR a mi perfil
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import utilMixin from "../../../../mixins/utilMixin";

export default {
    name: "Header",
    mixins: [utilMixin],
    methods: {
        openNav() {
            document.getElementById("mySidenav").style.display = "block";
            document.getElementById("mySidenav").style.width = "80%";
        },

        goToScroll(id) {
            const element = document.querySelector(id);

            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        },
    },
};
</script>
