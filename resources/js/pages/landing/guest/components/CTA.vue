<template>
    <section
        class="lg:py-28 bg-mobile-newsletter md:bg-newsletter bg-cover bg-no-repeat bg-center"
    >
        <div class="container py-12">
            <h2 class="font-bold text-4xl leading-10 text-white text-center">
                <span v-if="isUserGuest"> ¿Aun no te decides? </span>
                <span v-else> Comienza a publicar tus obras </span>
            </h2>
            <div class="flex justify-center py-5">
                <v-btn
                    :to="{ name: 'register' }"
                    class="text-xs text-white hover:no-underline"
                    color="#B2794C"
                    large
                    v-if="isUserGuest"
                >
                    REGÍSTRATE ahora
                </v-btn>
                <v-btn
                    :to="{ name: 'userProfile', params: { id: authUser.id } }"
                    class="text-xs text-white hover:no-underline"
                    color="#B2794C"
                    large
                    v-else
                >
                    Ir a mi perfil
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script>
import utilMixin from "../../../../mixins/utilMixin";

export default {
    name: "CTA",
    mixins: [utilMixin],
};
</script>
