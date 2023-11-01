<template>
    <div>
        <loading-overlay
            :active="apiStateFormLoading"
            :is-full-page="true"
            loader="bars"
        />

        <!-- pre-header -->
        <!-- <PreHeader /> -->
        <!-- /pre-header -->

        <!-- header -->
        <Header class="py-11" />
        <!-- /header -->

        <!-- hero area -->
        <Hero />
        <!-- /hero area -->

        <!-- ¿Aún no te decides? obras  -->
        <LastPost />
        <!-- /¿Aún no te decides? obras  -->

        <!-- Artistas que quizás te puedan interesar -->
        <OtherUser />
        <!-- /Artistas que quizás te puedan interesar -->

        <!-- Mi comunidad  -->
        <Community />
        <!-- /Mi comunidad  -->

        <!-- border separador -->
        <div class="container border-t border-gray-200 mt-8 lg:mt-0 mb-1"></div>
        <!-- /border separador -->

        <!-- Últimas noticias en el mundo del arte -->
        <!-- <BreakingNews /> -->
        <!-- /Últimas noticias en el mundo del arte -->

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
import ExtraInfo from "./sections/ExtraInfo.vue";
import Newletter from "./sections/Newletter.vue";
import PreHeader from "./sections/PreHeader.vue";
import Header from "./sections/Header.vue";
import AppFooter from "./sections/Footer.vue";
import LastPost from "./sections/LastPost.vue";
import OtherUser from "./sections/OtherUser.vue";
import Community from "./sections/Community.vue";
// import BreakingNews from "./sections/BreakingNews.vue";
import Hero from "./sections/Hero.vue";

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
        // BreakingNews,
        Hero,
    },

    mounted() {
        this.$vuetify.theme.dark = false;
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
