<template>
    <div>
        <loading-overlay
            :active="apiStateFormLoading"
            :is-full-page="true"
            loader="bars"
        />

        <!-- pre-header -->
        <PreHeader />
        <!-- /pre-header -->

        <!-- header -->
        <Header />
        <!-- /header -->

        <!-- hero area -->
        <div class="h-[30rem] sm:h-[48rem] z-[1] hero-area hero-bg">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 offset-lg-2 text-center">
                        <div class="hero-text">
                            <div class="hero-text-tablecell">
                                <h1 class="text-white lg:text-2xl">
                                    El
                                    <span class="text-primary">arte</span> que
                                    todos llevamos dentro
                                </h1>
                                <div
                                    class="hero-btns d-flex justify-content-center"
                                >
                                    <div class="input-group" style="width: 80%">
                                        <input
                                            type="text"
                                            style="height: 50px"
                                            class="form-control"
                                            aria-label="Text input with dropdown button"
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="btn btn-primary px-5 dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                OBRAS
                                            </button>
                                            <div class="dropdown-menu">
                                                <a
                                                    class="dropdown-item"
                                                    href="#"
                                                >
                                                    Action
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ¿Aún no te decides?  -->
        <LastPost />

        <!-- Artistas que quizás te puedan interesar -->
        <OtherUser />

        <!-- Mi comunidad  -->
        <Community />

        <!-- border separador -->
        <div class="container border-t border-gray-200 mt-8 lg:mt-0 mb-1"></div>

        <!-- Últimas noticias en el mundo del arte -->
        <BreakingNews />

        <!-- El newsletter para grandes artistas -->
        <Newletter />
        <!-- /El newsletter para grandes artistas -->

        <!-- extra info -->
        <ExtraInfo />
        <!-- /extra info -->

        <!-- footer -->
        <AppFooter />
        <!-- /Footer -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import ExtraInfo from "../landing/ExtraInfo.vue";
import AppFooter from "../landing/Footer.vue";
import Newletter from "../landing/Newletter.vue";
import Header from "../landing/Header.vue";
import PreHeader from "../landing/PreHeader.vue";
import LastPost from "./sections/LastPost.vue";
import OtherUser from "./sections/OtherUser.vue";
import Community from "./sections/Community.vue";
import BreakingNews from "./sections/BreakingNews.vue";

export default {
    name: "Landing",
    components: {
        AppFooter,
        ExtraInfo,
        Newletter,
        Header,
        PreHeader,
        LastPost,
        OtherUser,
        Community,
        BreakingNews,
    },
    computed: {
        apiStateFormLoading() {
            return this.status === "loading";
        },
        ...mapState({
            status: (state) => state.user.status,
        }),
    },
};
</script>
