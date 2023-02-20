<template>
    <div>
        <!-- header -->
        <Header />
        <!-- /header -->

        <!-- hero area -->
        <Hero />
        <!-- /hero area -->

        <!-- beneficios -->
        <Benefit />
        <!-- /beneficios -->

        <!-- quienes somos -->
        <Aboutus />
        <!-- /quienes somos -->

        <!-- conecta con otros artistas -->
        <Connect />
        <!-- /conecta con otros artistas -->

        <!-- Únete a la comunidad -->
        <Joinup />
        <!-- /Únete a la comunidad -->

        <!-- otras cosas -->
        <OtherThing />
        <!-- /otras cosas -->

        <!-- accede a obras -->
        <div class="container border-b border-gray-300"></div>
        <AccessArtwork />
        <div class="container border-b border-gray-300"></div>
        <!-- /accede a obras -->

        <!-- faqs -->
        <Faq />
        <!-- /faqs -->

        <!-- CTA -->
        <CTA />
        <!-- /CTA -->

        <!-- extra info -->
        <Service />
        <!-- /extra info -->

        <!-- footer -->
        <AppFooter />
        <!-- /Footer -->
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import AppFooter from "../sections/Footer.vue";
import Benefit from "./components/Benefit.vue";
import Aboutus from "./components/Aboutus.vue";
import Connect from "./components/Connect.vue";
import Joinup from "./components/Joinup.vue";
import OtherThing from "./components/OtherThing.vue";
import AccessArtwork from "./components/AccessArtwork.vue";
import Faq from "./components/Faq.vue";
import CTA from "./components/CTA.vue";
import Service from "./components/Service.vue";

export default {
    name: "Landing",
    components: {
        Header,
        Hero,
        AppFooter,
        Benefit,
        Aboutus,
        Connect,
        Joinup,
        OtherThing,
        AccessArtwork,
        Faq,
        CTA,
        Service,
    },

    created() {
        // this.$store.dispatch("userRequest");
    },
};
</script>
