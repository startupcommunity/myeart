<template>
    <MainLayout :show-header="false" :loading-overlay="globalLoading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>
        <!-- /header -->

        <h1>
            {{ collective.name }}
        </h1>
    </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import Header from "../landing/sections/Header.vue";

export default {
    name: "Profile",
    components: { MainLayout, Header },
    data() {
        return {
            collective: {},
        };
    },

    created() {
        this.getCollective();
    },

    methods: {
        getCollective() {
            const ep = this.ep.collectives.getCollective;
            this.globalLoading = true;
            this.axios
                .get(`${ep + this.$route.params.id}`)
                .then((response) => {
                    this.collective = response.data;
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
