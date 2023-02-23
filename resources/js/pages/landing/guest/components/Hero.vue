<template>
    <section
        class="h-[32rem] relative bg-[url('/images/dashboard.png')] bg-no-repeat bg-cover bg-center"
    >
        <div class="absolute inset-0 top-32 container">
            <div class="max-w-2xl mx-auto flex flex-col gap-5">
                <h1 class="text-white text-center text-5xl">
                    Conecta con el
                    <span class="text-primary">Arte</span>
                </h1>
                <p class="text-gray-300 text-center font-thin">
                    Bienvenido a la primera comunidad más grande de artistas en
                    todo el mundo, un espacio donde la creatividad, la
                    inspiración y el amor por el arte reinan.
                </p>
                <div class="flex justify-center pt-10">
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
                        :to="{
                            name: 'userProfile',
                            params: { id: authUser.id },
                        }"
                        class="text-xs text-white hover:no-underline"
                        color="#B2794C"
                        large
                        v-else
                    >
                        Ir a mi perfil
                    </v-btn>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import utilMixin from "../../../../mixins/utilMixin";

export default {
    name: "HeroGuest",
    mixins: [utilMixin],
};
</script>
