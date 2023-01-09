<template>
    <MainLayout :loading-overlay="globalLoading">

        <!-- Hero -->
        <Hero :photo="frontPhoto" />

        <!-- post hero -->
        <PostHero :collective="collective" v-if="collective.id" />

        <!-- content -->
        <ContentCollective :collective="collective" v-if="collective.id" />
    </MainLayout>
</template>

<script>
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Hero from "./components/Hero.vue";
import PostHero from "./components/PostHero.vue";
import ContentCollective from "./components/ContentCollective.vue";

export default {
    components: { MainLayout, Hero, Header, PostHero, ContentCollective },
    name: "ShowCollective",

    data() {
        return {
            collective: {},
        };
    },

    created() {
        this.getCollective();
    },

    mounted() {
        globalThis.scrollTo(0, 0);
    },

    computed: {
        profile() {
            return this.collective.profile;
        },
        frontPhoto() {
            return this.profile?.front_image || "";
        },
    },

    methods: {
        getCollective() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.collectives.getCollective + this.$route.params.id)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.collective = resp.data;
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
