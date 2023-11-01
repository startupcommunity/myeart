<template>
    <section class="bg-white" id="about-us">
        <div class="w-full">
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="bg-quienes-somos bg-no-repeat bg-cover"></div>
                <div class="py-12 bg-[#B2794C]">
                    <div class="max-w-xs mx-auto">
                        <h2 class="text-white text-4xl font-bold text-center">
                            ¿Qué es {{ appName }} ?
                        </h2>
                        <p class="text-gray-200 font-thin text-center pt-3">
                            Somos la comunidad más grande de artistas en la web,
                            dedicados a compartir experiencias y relacionar a
                            personas únicas mediante su arte.
                            <span class="italic">
                                “Una comunidad de artistas hecha por artistas”.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Aboutus",
    data() {
        return {
            appName: process.env.MIX_APP_NAME,
        };
    },
};
</script>
