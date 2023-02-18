<template>
    <section class="bg-white">
        <div class="container py-12">
            <div class="w-full flex flex-col items-center md:items-start">
                <h2
                    class="text-zinc-900 text-4xl font-bold text-center text-md-left"
                >
                    Que otras cosas puedes hacer en {{ appNAme }}
                </h2>
                <p class="text-zinc-500 font-thin">
                    Echa un vistazo a las últimas publicaciones...
                </p>
            </div>
            <div
                class="flex flex-col md:flex-row justify-between items-center md:items-start mt-10 gap-5"
            >
                <div class="flex flex-col gap-3 max-w-xs">
                    <img
                        src="/img/home/other/info_1.png"
                        alt="infórmate"
                        class="w-40 h-40 aspect-square mx-auto"
                    />
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center"
                    >
                        Infórmate
                    </h3>
                    <p class="text-zinc-500 font-thin text-center">
                        Lorem ipsum dolor sit amet, consectetur adr adipiscing
                        elit. Nulla et e adipiscing elit.
                    </p>
                </div>
                <div class="flex flex-col gap-3 max-w-xs">
                    <img
                        src="/img/home/other/info_2.png"
                        alt="infórmate"
                        class="w-40 h-40 aspect-square mx-auto"
                    />
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center"
                    >
                        Vende
                    </h3>
                    <p class="text-zinc-500 font-thin text-center">
                        Lorem ipsum dolor sit amet, consectetur adr adipiscing
                        elit. Nulla et e adipiscing elit.
                    </p>
                </div>
                <div class="flex flex-col gap-3 max-w-xs">
                    <img
                        src="/img/home/other/info_3.png"
                        alt="infórmate"
                        class="w-40 h-40 aspect-square mx-auto"
                    />
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center"
                    >
                        Compra
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
    name: "OtherThing",

    data() {
        return {
            appNAme: process.env.MIX_APP_NAME,
        };
    },
};
</script>
