<template>
    <section class="bg-white" id="faqs">
        <div class="container py-12">
            <div class="w-full flex flex-col items-center md:items-start mb-5">
                <h2
                    class="text-zinc-900 text-4xl font-bold text-center text-md-left"
                >
                    Preguntas frecuentes
                </h2>
            </div>

            <!-- tabs de preguntas frecuentes -->
            <div class="flex flex-col md:flex-row">
                <div class="w-full md:w-1/3">
                    <div class="flex flex-col">
                        <div
                            v-for="(item, index) in faq"
                            :key="index"
                            class="flex flex-row items-center justify-between px-4 py-2 mb-2 cursor-pointer"
                            :class="{
                                'bg-zinc-100': index === activeTab,
                                'hover:bg-zinc-100': index !== activeTab,
                            }"
                            @click="activeTab = index"
                        >
                            <span class="text-zinc-900 font-semibold">
                                {{ item.title }}
                            </span>
                            <span
                                class="text-zinc-900 font-semibold"
                                :class="{
                                    'transform rotate-180': index === activeTab,
                                }"
                            >
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-2/3">
                    <div class="flex flex-col">
                        <div
                            v-for="(item, index) in faq"
                            :key="index"
                            v-show="index === activeTab"
                            class="px-4 py-2"
                        >
                            <p class="text-zinc-900 font-thin">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /tabs de preguntas frecuentes -->
        </div>
    </section>
</template>

<script>
export default {
    name: "Faq",

    data() {
        return {
            activeTab: 0,
            faq: [
                {
                    title: "¿Puedo publicar cualquier tipo de arte?",
                    description:
                        "Si, puedes publicar tus obras en esta plataforma y venderlas. No obstante, debes tener en cuenta que las obras que se publican en esta plataforma deben ser originales y no pueden ser copias de obras de otros artistas.",
                },
                {
                    title: "¿Cómo puedo vender mis obras dentro de MyeArt?",
                    description:
                        "Para vender tus obras, debes registrarte en la plataforma y luego iniciar sesión. Una vez que hayas iniciado sesión, debes cargar un método de cobro y publicar una obra.",
                },
                {
                    title: "¿Cómo recibo el pago de mis obras?",
                    description:
                        "Una vez que una obra es vendida, el pago se realiza a través de la plataforma. El dinero se deposita en tu cuenta bancaria al cabo de 3 a 7 días hábiles.",
                },
                {
                    title: "¿Cómo puedo comprar una obra?",
                    description:
                        "Para comprar una obra, debes registrarte en la plataforma y luego iniciar sesión. Una vez que hayas iniciado sesión, debes buscar la obra que deseas comprar. añadirla al carrito de compras y luego proceder al pago con tu tarjeta.",
                },
            ],
        };
    },
};
</script>
