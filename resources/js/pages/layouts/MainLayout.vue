<template>
    <div class="dashboard">

        <!-- loading full page -->
        <loading-overlay
            :active="globalLoading"
            :is-full-page="true"
            loader="bars"
        />
        <!-- /loading full page -->

        <!-- pre y header -->
        <PreHeader :class="preClass" v-if="showPre" />
        <Header :class="headerClass" v-if="showHeader" />
        <!-- /pre y header -->

        <!-- content -->
        <main>
            <slot></slot>
        </main>
        <!-- /content -->

        <!-- El Newletter -->
        <Newletter />
        <!-- /El Newletter -->

        <!-- extra info -->
        <ExtraInfo />
        <!-- /extra info -->

        <!-- footer -->
        <Footer />
        <!-- /Footer -->
    </div>
</template>
<script>
import Header from "../landing/sections/Header.vue";
import PreHeader from "../landing/sections/PreHeader.vue";
import Newletter from "../landing/sections/Newletter.vue";
import ExtraInfo from "../landing/sections/ExtraInfo.vue";
import Footer from "../landing/sections/Footer.vue";
export default {
    name: "MainLayout",
    components: {
        PreHeader,
        Header,
        Newletter,
        ExtraInfo,
        Footer,
    },
    props: {
        showPre: {
            type: Boolean,
            default: true,
        },

        showHeader: {
            type: Boolean,
            default: true,
        },

        preClass: {
            type: String,
            default: "",
        },

        headerClass: {
            type: String,
            default: "",
        },
    },
};
</script>
