<template>
    <section class="bg-white">
        <div class="container py-12">
            <div class="w-full flex flex-col items-center md:items-start mb-5">
                <h2
                    class="text-zinc-900 text-4xl font-bold text-center text-md-left"
                >
                    Adéntrate en el mundo del Arte
                </h2>
                <p class="text-zinc-500 font-thin">
                    Echa un vistazo a las últimas obras y piezas artísticas...
                </p>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8"
            >
                <div>
                    <img
                        src="/img/home/artwork/art_1.webp"
                        alt="arte-contemporáneo"
                        class="aspect-auto object-cover w-72 h-[340px] mx-auto ml-md-0"
                    />
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center text-md-left"
                    >
                        Arte contemporáneo
                    </h3>
                </div>
                <div>
                    <img
                        src="/img/home/artwork/art_2.webp"
                        alt="esculturas"
                        class="aspect-auto object-cover w-72 h-[340px] mx-auto ml-md-0"
                    />
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center text-md-left"
                    >
                        Esculturas
                    </h3>
                </div>
                <div>
                    <img
                        src="/img/home/artwork/art_3.webp"
                        alt="arte-urbano"
                        class="aspect-auto object-cover w-72 h-[340px] mx-auto ml-md-0"
                    />
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center text-md-left"
                    >
                        Arte urbano
                    </h3>
                </div>
                <div>
                    <img
                        src="/img/home/artwork/art_4.webp"
                        alt="obras-reconocidas"
                        class="aspect-auto object-cover w-72 h-[340px] mx-auto ml-md-0"
                    />
                    <h3
                        class="text-xl text-zinc-900 font-semibold text-center text-md-left"
                    >
                        Obras reconocidas
                    </h3>
                </div>
            </div>
            <div class="w-full">
                <p class="text-zinc-500 font-thin text-center text-md-left">
                    Tenemos una de cantidad obras esperando ser vistas por ti.
                    La categoría que más te interese está aquí. Comenta, conoce
                    y disfruta del buen arte.
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "AccessArtwork",
};
</script>
