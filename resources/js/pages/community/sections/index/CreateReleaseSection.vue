<template>
    <section class="bg-white">
        <div class="container pt-10 flex justify-md-end justify-center">
            <v-btn
                color="#B2794C"
                class="uppercase tracking-widest text-white hover:no-underline"
                type="button"
                @click.stop="openModal"
            >
                <i class="fas fa-plus pr-2"></i>
                Crear una publicación
            </v-btn>
        </div>

        <!-- modal para crear publicación -->
        <CreateReleaseModal
            :show="showDialog"
            :collectiveID="null"
            :type="1"
            contentClass=""
            :fullScreen="true"
            @close-modal="closeModal"
            @created="closeModal"
        />
    </section>
</template>

<script>
import CreateReleaseModal from "../../../collective/components/CreateReleaseModal.vue";

export default {
    name: "CreateReleaseSection",
    components: { CreateReleaseModal },

    data() {
        return {
            showDialog: false,
        };
    },

    methods: {
        openModal() {
            this.showDialog = true;
            this.$emit("open-modal-create-release");
        },
        closeModal() {
            this.showDialog = false;
            this.$emit("close-modal-create-release");
        },
    },
};
</script>
