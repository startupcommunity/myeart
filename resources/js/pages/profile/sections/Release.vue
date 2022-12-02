<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="pub"
        v-show="showSection"
    >
        <div class="md:px-5">
            <div
                class="flex flex-col flex-md-row justify-between pb-4 md:border-b md:border-gray-900 space-y-5 md:space-y-0"
            >
                <h3
                    class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900 text-center text-md-left"
                >
                    <span> Publicaciones </span>
                </h3>
                <div class="flex justify-center justify-md-end">
                    <v-btn
                        outlined
                        elevation="0"
                        color="#B2794C"
                        @click.stop="create = true"
                        v-if="!create"
                    >
                        <i class="fas fa-plus"></i> Nueva Publicación
                    </v-btn>
                    <v-btn
                        outlined
                        elevation="0"
                        color="#B2794C"
                        @click.stop="create = false"
                        v-else
                    >
                        <i class="fas fa-arrow-left"></i> Volver
                    </v-btn>
                </div>
            </div>

            <!-- publicaciones -->
            <div class="py-6 w-full" v-if="!create">
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

                    <div class="w-full text-center" v-if="hasShowRelease">
                        <button
                            class="w-auto px-6 py-3 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                            type="button"
                            @click.stop="showMore"
                        >
                            Ver más
                        </button>
                    </div>
                </div>
            </div>

            <!-- crear publicaciones -->
            <CreateRelease v-else @created="create = false" />
        </div>
    </div>
</template>
<script>
// componentes
import CreateRelease from "../../release/Create.vue";
import CardRelease from "../components/CardRelease.vue";
import LoadingTailwind from "./../../../components/LoadingTailwind.vue";

// mixin
import getDataMixin from "./../../../mixins/getDataMixin";

// cantidad de obras en aumento
const INIT_RELEASES = 2;
let loadMoreRelease = 2;

export default {
    name: "Artwork",
    components: { LoadingTailwind, CardRelease, CreateRelease },
    mixins: [getDataMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            loading: false,
            create: false,
            releases: [],
            original: [],
        };
    },
    computed: {
        /**
         * Verificar si hay mas publicaciones que mostrar
         */
        hasShowRelease() {
            return this.releases.length !== this.original.length;
        },
    },
    methods: {
        /**
         * Obtiene todas las publicaciones del usuario
         */
        getReleases() {
            this.loading = true;
            this.axios
                .get(this.ep.releases.getAllUser)
                .then((resp) => {
                    this.original = JSON.parse(JSON.stringify(resp.data));
                    this.releases = resp.data.splice(INIT_RELEASES);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Muestra mas publicaciones
         */
        showMore() {
            const total = this.releases.length + loadMoreRelease;
            const data = JSON.parse(JSON.stringify(this.original));

            this.releases = data.splice(0, total);
            loadMoreRelease++;
        },
    },
    watch: {
        showSection(val) {
            if (val) {
                this.getReleases();
            }
        },

        create(val) {
            if (!val) {
                console.log("cambio el create a falso");
                this.getReleases();
            }
        },
    },
};
</script>
