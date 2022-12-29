<template>
    <div class="w-full">
        <div class="flex flex-row justify-between items-center">
            <div class="flex justify-start items-center">
                <Avatar :artist="artist" />
                <div class="mt-4 ml-2">
                    <p class="font-medium text-gray-900 text-xs">
                        {{ artist?.name }}
                        <br />
                        <span class="text-gray-400">
                            {{ location }}
                        </span>
                    </p>
                </div>
            </div>
            <div v-if="showButtonsCol" class="flex justify-end items-center">
                <v-btn
                    text
                    small
                    class="text-xs"
                    @click.stop="openEditModal"
                    v-if="isOwner"
                >
                    <i class="fa-solid fa-pencil"></i>
                    <span class="hidden md:block">Editar</span>
                </v-btn>
                <v-btn
                    text
                    small
                    class="text-xs"
                    @click.stop="deleteRelease"
                    :disabled="globalLoading"
                    :loading="globalLoading"
                >
                    <i class="fa-solid fa-trash"></i>
                    <span class="hidden md:block">Eliminar</span>
                </v-btn>
            </div>
        </div>

        <!-- edit modal para publicaciones de colectivos -->
        <EditReleaseModal
            :show="showModal"
            :release="release"
            @updated="$emit('updated-release')"
            @close-modal="showModal = false"
        />
    </div>
</template>

<script>
import Avatar from "../../../../components/Avatar.vue";
import EditReleaseModal from "../../../collective/components/EditReleaseModal.vue";

export default {
    name: "InfoArtist",
    components: { Avatar, EditReleaseModal },
    props: {
        artist: {
            type: Object,
            default: () => {},
        },
        release: {
            type: Object,
            default: () => {},
        },
        location: {
            type: String,
            default: "",
        },
        showButtonsCol: {
            type: Boolean,
            default: false,
            description:
                "Si se muestran botones de acción | solo aplicara para colectivos",
        },
        isOwner: {
            type: Boolean,
            default: false,
            description:
                "Si es el usuario creador de la publicación | solo aplicara para colectivos",
        },
    },

    data() {
        return {
            showModal: false,
        };
    },

    methods: {
        openEditModal() {
            this.showModal = true;
        },

        /**
         * Confirma y elimina una publicación
         */
        deleteRelease() {
            this.confirmedDialog({
                title: "¿Estás seguro que desea eliminar esta publicación?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.globalLoading = true;
                    const ep = this.ep.releases.delete + this.release.id;

                    // eliminar publicación
                    try {
                        await this.axios.post(ep, { _method: "DELETE" });

                        await this.notySwal({
                            title: "Eliminado!",
                            text: "La publicación ha sido eliminada con éxito",
                        });

                        this.$emit("updated-release");
                    } catch (error) {
                        this.manageError(error);
                    } finally {
                        this.globalLoading = false;
                    }
                }
            });
        },
    },
};
</script>
