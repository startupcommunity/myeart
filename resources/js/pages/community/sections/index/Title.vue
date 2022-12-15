<template>
    <section class="bg-white">
        <div class="pt-20 container">
            <div class="flex justify-center items-center">
                <div
                    class="w-full border-b border-zinc-300 pb-4 md:border-0 md:pb-0"
                >
                    <h1
                        class="text-zinc-900 font-bold tracking-wide text-lg md:text-3xl text-center"
                    >
                        <span v-if="hashtag">
                            Resultados de
                            <span class="text-primary">#{{ hashtag }}</span>
                        </span>
                        <span v-else>
                            Descubre las publicaciones de tu comunidad
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "Title",
    props: {
        hashtag: {
            type: String,
            default: "",
        },
    },
};
</script>
