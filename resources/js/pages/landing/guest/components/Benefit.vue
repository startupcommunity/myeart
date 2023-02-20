<template>
    <section class="bg-white" id="beneficios">
        <div class="container py-12">
            <div class="w-full flex flex-col items-center md:items-start">
                <h2 class="text-zinc-900 text-4xl font-bold text-center text-md-left">
                    Beneficios de la plataforma
                </h2>
                <p class="text-zinc-500 font-thin">
                    Conoce otro beneficios dentro de {{ appNAme }}
                </p>
            </div>
            <div
                class="flex flex-col md:flex-row justify-between items-center md:items-start mt-10 gap-5"
            >
                <div class="flex flex-col gap-3 max-w-xs">
                    <i
                        class="fa-solid fa-users fa-3x text-primary flex justify-center"
                    ></i>
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center"
                    >
                        Accede a la comunidad más grande del mundo.
                    </h3>
                    <p class="text-zinc-500 font-thin text-center">
                        Lorem ipsum dolor sit amet, consectetur adr adipiscing
                        elit. Nulla et e adipiscing elit.
                    </p>
                </div>
                <div class="flex flex-col gap-3 max-w-xs">
                    <i
                        class="fa-solid fa-dollar-sign fa-3x text-primary flex justify-center"
                    ></i>
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center"
                    >
                        Monetiza tu talento
                    </h3>
                    <p class="text-zinc-500 font-thin text-center">
                        Lorem ipsum dolor sit amet, consectetur adr adipiscing
                        elit. Nulla et e adipiscing elit.
                    </p>
                </div>
                <div class="flex flex-col gap-3 max-w-xs">
                    <i
                        class="fa-solid fa-images fa-3x text-primary flex justify-center"
                    ></i>
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center"
                    >
                        Muestra tu talento y darte conocer
                    </h3>
                    <p class="text-zinc-500 font-thin text-center">
                        Lorem ipsum dolor sit amet, consectetur adr adipiscing
                        elit. Nulla et e adipiscing elit.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Benefit",

    data() {
        return {
            appNAme: process.env.MIX_APP_NAME,
        };
    },
};
</script>
