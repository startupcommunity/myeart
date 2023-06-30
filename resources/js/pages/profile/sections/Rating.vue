<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="rating"
        v-show="showSection"
    >
        <div class="sm:px-5">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-md-left text-center"> Calificaciones </span>
            </h3>
            <div
                class="mt-4 py-4 border-t border-gray-900 hidden sm:block"
            ></div>
            <div class="pt-2 pb-12">
                <LoadingTailwind v-if="loading" />
                <CardUserRating :ratings="ratings" v-else />
            </div>
        </div>
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardUserRating from "../components/CardUserRating.vue";

export default {
    name: "RatingSection",
    components: { LoadingTailwind, CardUserRating },

    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            ratings: [],
        };
    },

    computed: {
        user() {
            return this.$store.getters.getProfile;
        },
    },

    watch: {
        showSection(val) {
            if (val) {
                this.showModal = false;
                this.getRatings();
            }
        },
    },

    methods: {
        /**
         * Obtiene las calificaciones del usuario
         */
        getRatings() {
            this.loading = true;
            this.axios
                .get(this.ep.user.getArtistRatings + this.user.id)
                .then((resp) => (this.ratings = resp.data))
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
