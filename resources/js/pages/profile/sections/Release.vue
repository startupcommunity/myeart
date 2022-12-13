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
                <div class="flex justify-center justify-md-end gap-3">
                    <v-btn
                        outlined
                        elevation="0"
                        color="#B2794C"
                        @click.stop="createRelease"
                        v-if="!create && !edit"
                    >
                        <i class="fas fa-plus"></i> Nueva Publicación
                    </v-btn>
                    <v-btn
                        outlined
                        elevation="0"
                        color="#B2794C"
                        @click.stop="backList"
                        v-if="create || edit"
                    >
                        <i class="fas fa-arrow-left"></i> Volver
                    </v-btn>
                </div>
            </div>

            <!-- publicaciones -->
            <div class="py-6 w-full" v-if="!create && !edit">
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
                            :showArtist="false"
                            :showShortInfo="true"
                            :class="index % 2 === 0 ? 'md:pr-4' : ''"
                            class="w-full md:w-1/2 pb-4"
                            @activeEdit="editRelease"
                            @activeDelete="deleteRelease"
                            @showCommentDialog="activeCommentModal"
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
            <CreateRelease @created="created" v-if="create" />

            <!-- editar publicaciones -->
            <EditRelease @edited="edited" :release="release" v-if="edit" />

            <!-- modal de comentarios -->
            <ReleaseCommentsDialog
                :show="showCommentDialog"
                :releaseID="release?.id"
                @close-comments="showCommentDialog = false"
            />
        </div>
    </div>
</template>
<script>
// componentes
import ReleaseCommentsDialog from "../../release/components/ReleaseCommentsDialog.vue";
import CreateRelease from "../../release/Create.vue";
import EditRelease from "../../release/Edit.vue";
import CardRelease from "../components/CardRelease.vue";
import LoadingTailwind from "./../../../components/LoadingTailwind.vue";

// mixin
import getDataMixin from "./../../../mixins/getDataMixin";

// cantidad de obras en aumento
const INIT_RELEASES = 4;
let loadMoreRelease = 2;

export default {
    name: "Artwork",
    components: {
        LoadingTailwind,
        CardRelease,
        CreateRelease,
        EditRelease,
        ReleaseCommentsDialog,
    },
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
            edit: false,
            showCommentDialog: false,
            release: {},
            releases: [],
            original: [],
        };
    },
    computed: {
        /**
         * Verificar si hay mas publicaciones que mostrar
         */
        hasShowRelease() {
            return (
                this.releases.length !== this.original.length &&
                this.releases.length
            );
        },
    },
    watch: {
        showSection(val) {
            if (val) {
                this.getReleases();
            }
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
                    this.releases = resp.data.splice(0, INIT_RELEASES);
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

        /**
         * Volver a la lista de publicaciones
         */
        backList() {
            this.create = false;
            this.edit = false;
        },

        /**
         * Activa el formulario para crear una publicación
         */
        createRelease() {
            this.create = true;
            this.edit = false;
        },

        /**
         * Cuando se crea una una nueva publicación
         */
        created() {
            this.create = false;
            this.getReleases();
        },

        /**
         * Cuando se actualiza una publicación
         */
        edited() {
            this.edit = false;
            this.getReleases();
        },

        /**
         * Activa el formulario para editar una publicación
         *
         * @param {Object} release
         */
        editRelease(release) {
            this.create = false;
            this.edit = true;
            this.release = release;
        },

        /**
         * Activa el modal de comentarios
         *
         * @param {Object} release
         */
        activeCommentModal(release) {
            this.release = release;
            this.showCommentDialog = true;
        },

        /**
         * Confirma y elimina una publicación
         *
         * @param {Object} release
         */
        deleteRelease(release) {
            this.confirmedDialog({
                title: "¿Estás seguro que desea eliminar esta publicación?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.loading = true;
                    const ep = this.ep.releases.delete + release.id;

                    // eliminar publicación
                    try {
                        await this.axios.post(ep, { _method: "DELETE" });

                        await this.notySwal({
                            title: "Eliminado!",
                            text: "La publicación ha sido eliminada con éxito",
                        });

                        this.getReleases();
                    } catch (error) {
                        this.manageError(error);
                    } finally {
                        this.loading = false;
                    }
                }
            });
        },
    },
};
</script>
