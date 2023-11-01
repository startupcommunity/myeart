<template>
    <section class="animate-fade-in-down">
        <FrontImage
            :bg="profile?.front_image"
            :id-collective="collective?.id"
            :creatorID="collective?.user_id"
        />
        <div
            class="flex flex-col md:flex-row justify-end pt-5 gap-3 border-b border-gray-200 pb-4"
            v-if="isOwner"
        >
            <v-btn
                outlined
                color="grey darken-1"
                class="rounded-md"
                @click.stop="openDialogCollectives"
            >
                Ver mis colectivos
            </v-btn>
            <!-- <v-btn
                outlined
                color="grey darken-1"
                class="rounded-md"
                @click.stop=""
            >
                <i class="fas fa-plus"></i> Crear publicación
            </v-btn> -->
        </div>

        <div class="p-4 mt-5 border" v-if="isOwner">
            <h3 class="font-bold text-lg md:text-2xl mb-3">
                Completa o edita la información de tu colectivo
            </h3>
            <FormCollective :data="collective" v-if="collective?.id" />
        </div>

        <!-- modal mis colectivos -->
        <MyCollectivesModal
            :show="dialogCollectives"
            @close-modal="closeDialogCollectives"
            v-if="isOwner"
        />
    </section>
</template>

<script>
import MyCollectivesModal from "../../profile/components/MyCollectivesModal.vue";
import FormCollective from "../components/FormCollective.vue";
import FrontImage from "../components/FrontImage.vue";

export default {
    name: "InfoCollective",
    components: { FrontImage, FormCollective, MyCollectivesModal },
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
        profile: {
            type: Object,
            default: () => ({}),
        },
        isOwner: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            dialogCollectives: false,
        };
    },

    mounted() {
        window.scrollTo(0, 0);
    },

    methods: {
        openDialogCollectives() {
            this.dialogCollectives = true;
            this.$emit("dialog-collectives-opened");
        },

        closeDialogCollectives() {
            this.dialogCollectives = false;
            this.$emit("dialog-collectives-closed");
        },
    },
};
</script>
