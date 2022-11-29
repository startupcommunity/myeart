<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="publicaciones"
        v-show="showSection"
    >
        <div class="md:px-5">
            <div class="flex justify-between pb-4 border-b border-gray-900">
                <h3
                    class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
                >
                    <span class="text-left text-md-center">
                        Publicaciones
                    </span>
                </h3>
                <div>
                    <v-btn outlined elevation="0" color="#B2794C">
                        <i class="fas fa-plus"></i> Nueva Publicación
                    </v-btn>
                </div>
            </div>

            <!-- publicaciones -->
            <div class="py-6 w-full">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind
                        v-if="loading"
                        css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                    />

                    <div class="flex flex-wrap">
                        <CardRelease
                            v-for="(release, index) in releases"
                            :key="release.id"
                            :release="release"
                            class="w-full md:w-1/2 pb-4"
                            :class="index % 2 === 0 ? 'md:pr-4' : ''"
                        />
                    </div>

                    <!-- <div
                        class="w-full text-center"
                        v-if="remainingArtworks.length"
                    >
                        <button
                            class="w-auto px-6 py-3 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                            type="button"
                            @click.stop="showMoreArtworks(SHOW_ARTWORKS)"
                        >
                            Ver más
                        </button>
                    </div> -->
                </div>
            </div>
            <!-- /publicaciones -->
        </div>
    </div>
</template>
<script>
// componentes
import CardRelease from "../components/CardRelease.vue";
import LoadingTailwind from "./../../../components/LoadingTailwind.vue";

// mixin
import getDataMixin from "./../../../mixins/getDataMixin";

// cantidad de obras en aumento
let LOAD_MORE_RELEASE = 4;

export default {
    name: "Artwork",
    components: { LoadingTailwind, CardRelease },
    mixins: [getDataMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            loading: false,
            releases: [],
        };
    },
    created() {
        // this.getReleases();
    },
    methods: {},
    watch: {
        showSection(val) {
            if (val) {
                // this.changeStateArtwork();
                // this.resetData();

                // generar mockup de prueba
                this.releases = [
                    {
                        id: 1,
                        text: "Nisi culpa id minim mollit enim nulla proident sint culpa dolor do occaecat et amet.",
                        created_at: "2021-05-05 00:00:00.000000",
                        image: "https://picsum.photos/200/300",
                    },
                    {
                        id: 2,
                        text: "Nisi culpa id minim mollit enim nulla proident sint culpa dolor do occaecat et amet.",
                        created_at: "2021-07-10 00:00:00.000000",
                        image: "https://picsum.photos/400/300",
                    },
                    {
                        id: 3,
                        text: "Nisi culpa id minim mollit enim nulla proident sint culpa dolor do occaecat et amet.",
                        created_at: "2021-10-28 00:00:00.000000",
                        image: "https://picsum.photos/300/300",
                    },
                    {
                        id: 4,
                        text: "Nisi culpa id minim mollit enim nulla proident sint culpa dolor do occaecat et amet.",
                        created_at: "2021-11-07 00:00:00.000000",
                        image: "https://picsum.photos/600/300",
                    },
                ];
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
