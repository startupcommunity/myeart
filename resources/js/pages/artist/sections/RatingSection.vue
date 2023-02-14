<template>
    <section class="bg-white">
        <div class="container">
            <div class="w-full border-b pb-1 pb-md-2 border-zinc-800">
                <h2
                    class="text-primary text-lg md:text-2xl font-bold tracking-widest uppercase text-left"
                >
                    <span v-if="title"> {{ title }} </span>
                    <span v-else>Mas publicaciones de {{ artist?.name }}</span>
                </h2>
            </div>
            <div class="md:py-10">
                <LoadingTailwind
                    v-show="loading"
                    css="w-full animate-swing-in-top-fwd"
                />
                <div class="md:py-10">
                    <CardUserRating :ratings="ratings" />
                </div>

                <div class="py-10 flex justify-center" v-if="hasMore">
                    <button
                        class="bg-app-brown-1 px-6 py-4 uppercase text-gray-50 hover:animate-shadow-and-color-app rounded"
                        @click.stop="loadMore()"
                        :disabled="loading"
                    >
                        Mostrar más
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardUserRating from "../../profile/components/CardUserRating.vue";

const INIT_RATING = 5;
const LOAD_MORE = 3;

export default {
    name: "RatingUserSection",
    components: { LoadingTailwind, CardUserRating },
    props: {
        artist: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            loading: false,
            ratings: [],
            original: [],
        };
    },

    created() {
        this.loadRatings();
    },

    computed: {
        /**
         * Verifica si hay mas calificaciones que cargar
         */
        hasMore() {
            return this.ratings.length < this.original.length;
        },
    },

    methods: {
        /**
         * carga las calificaciones de un artista
         */
        loadRatings() {
            this.loading = true;
            this.axios
                .get(this.ep.user.getArtistRatings + this.artist.id)
                .then((resp) => {
                    this.original = JSON.parse(JSON.stringify(resp.data));
                    this.ratings = resp.data.slice(0, INIT_RATING);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * carga mas calificaciones
         */
        loadMore() {
            const total = this.ratings.length + LOAD_MORE;
            this.ratings = this.original.slice(0, total);
        },
    },
};
</script>
