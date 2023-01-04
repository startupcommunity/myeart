<template>
    <section class="animate-fade-in-down">
        <!-- title -->
        <div
            class="flex flex-col md:flex-row md:justify-between items-center border-b border-zinc-800 pb-5 gap-5"
        >
            <h3 class="text-lg md:text-3xl text-zinc-900 font-bold">
                Obras del colectivo
            </h3>
            <v-btn color="#B2794C" @click.stop="goToCreate" outlined large>
                <i class="fas fa-plus"></i> Agregar obra
            </v-btn>
        </div>
        <!-- /title -->

        <!-- listado de obras -->
        <div class="py-8 py-md-0 pb-md-10">
            <LoadingTailwind v-if="globalLoading" />
            <div
                class="grid grid-cols-1 md:grid-cols-2 xl:md:grid-cols-3 gap-5 py-5"
                v-else
            >
                <CardArtwork
                    v-for="art in artworks"
                    :key="art.id"
                    :artwork="art"
                    :type="2"
                    @deleted="getArtworks"
                />
            </div>

            <!-- show more -->
            <div
                class="flex flex-col items-center justify-center"
                v-if="artworks.length < original.length"
            >
                <v-btn
                    color="grey darken-4"
                    @click.stop="showMore"
                    depressed
                    large
                    class="text-white"
                >
                    <i class="fas fa-plus"></i> Ver más obras
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardArtwork from "../components/CardArtwork.vue";

const INIT_ARTWORK = 9;
const ADD_ARTWORK = 3;

export default {
    name: "ArtworkSectionCollective",
    components: { LoadingTailwind, CardArtwork },
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            artworks: [],
            original: [],
        };
    },

    created() {
        this.getArtworks();
    },

    methods: {
        goToCreate() {
            this.$router.push({
                name: "createArtwork",
                params: { type: 2 },
            });
        },

        getArtworks() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.collectives.artworks + this.collective.id)
                .then((res) => {
                    this.original = JSON.parse(JSON.stringify(res.data));
                    this.artworks = this.original.slice(0, INIT_ARTWORK);
                })
                .catch((err) => this.manageError(err))
                .finally(() => (this.globalLoading = false));
        },

        showMore() {
            const total = this.artworks.length + ADD_ARTWORK;
            this.artworks = this.original.slice(0, total);
        },
    },
};
</script>
