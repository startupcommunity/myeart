<template>
    <section class="animate-fade-in-down">
        <FrontImage
            :bg="profile?.front_image"
            :id-collective="collective?.id"
        />
        <div
            class="flex flex-col md:flex-row justify-end pt-5 gap-3 border-b border-gray-200 pb-4"
        >
            <v-btn outlined color="grey darken-1" class="rounded-md">
                Ver mis colectivos
            </v-btn>
            <v-btn outlined color="grey darken-1" class="rounded-md">
                <i class="fas fa-plus"></i> Crear publicación
            </v-btn>
        </div>

        <div class="p-4 mt-5 border">
            <h3 class="font-bold text-lg md:text-2xl mb-3">
                Completa o edita la información de tu colectivo
            </h3>
            <FormCollective :data="collective" v-if="collective?.id" />
        </div>
    </section>
</template>

<script>
import FormCollective from "../components/FormCollective.vue";
import FrontImage from "../components/FrontImage.vue";

export default {
    name: "InfoCollective",
    components: { FrontImage, FormCollective },
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
        profile: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
