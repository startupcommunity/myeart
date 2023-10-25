<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="colectivos"
        v-show="showSection"
    >
        <div class="sm:px-5">
            <div>
                <LoadingTailwind v-if="globalLoading" />
                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-3 content-center gap-5"
                >
                    <CardCollective
                        v-for="collective in collectives"
                        :key="collective.id"
                        :collective="collective"
                        :updateText="true"
                        class="mb-5"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardCollective from "../../collective/components/CardCollective.vue";

export default {
    name: "Collective",
    components: { LoadingTailwind, CardCollective },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            collectives: [],
        };
    },
    watch: {
        show(val) {
            if (val) {
                this.getCollectives();
            }
        },
    },
    methods: {
        getCollectives() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.collectives.getUserCollectives)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.collectives = resp.data;
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
    watch: {
        showSection(val) {
            if (val) {
                
                //this.getArtworks();
                this.getCollectives();
            }
        },
    },
};
</script>
<style scoped>
.v-application a {
    color: #0f0f0f !important;
}
.v-application a:hover {
    color: #fefefe !important;
}

#btn-edit {
    color: #0f0f0f !important;
}

#btn-edit:hover {
    color: #0f0f0f !important;
    text-decoration: none;
}
</style>
