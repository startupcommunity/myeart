<template>
    <section
        class="h-[32rem] relative bg-[url('/images/dashboard.png')] bg-no-repeat bg-cover bg-center"
    >
        <div class="absolute inset-0 top-32 container">
            <div class="max-w-2xl mx-auto flex flex-col gap-5">
                <h1 class="text-white text-center text-5xl">
                    La
                    <span class="text-primary">red</span> para el arte
                </h1>
                <p class="text-gray-300 text-center font-thin">
                    Aquí es para que publico va dllit non deserunt ullamco est
                    sit aliqua dolor do amet sint. Velit officia consequat duis
                    enim velit mollit. Exercitation veniam consequat sunt
                    nostrud amet.
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
