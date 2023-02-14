<template>
    <!-- Footer Start -->
    <div
        class="container bg-white text-dark footer py-12 wow fadeIn"
        data-wow-delay="0.1s"
    >
        <div class="d-flex justify-content-center sm:py-5">
            <div class="row g-5 justify-content-md-center">
                <div class="col-lg-2 col-md-6 col-sm-12 text-center">
                    <img
                        src="/images/myHeartBlack.png"
                        alt="myHeartBlack"
                        class="w-40 sm:w-56 mx-auto"
                    />
                </div>
                <!-- <div
                    class="col-lg-2 col-md-6 col-sm-12 center-mobile mb-4 sm:mb-0"
                >
                    <h5 class="text-gray-900 mb-2 font-black">
                        AYUDA NOSOTROS
                    </h5>
                    <p
                        class="mb-1 font-light uppercase text-xs leading-relaxed"
                    >
                        Quienes
                    </p>
                    <p
                        class="mb-1 font-light uppercase text-xs leading-relaxed"
                    >
                        Somos
                    </p>
                    <p
                        class="mb-1 font-light uppercase text-xs leading-relaxed"
                    >
                        Pregunta Frecuentes
                    </p>
                </div> -->
                <div
                    class="col-lg-2 col-md-6 col-sm-12 center-mobile mb-4 sm:mb-0"
                >
                    <h5 class="text-gray-900 mb-2 font-black">POLÍTICAS</h5>
                    <p class="mb-1">
                        <button
                            @click.prevent="toggleTerms"
                            class="text-zinc-800 hover:underline font-light uppercase text-xs leading-relaxed"
                        >
                            Políticas de Envío
                        </button>
                    </p>
                    <p class="mb-1">
                        <button
                            @click.prevent="toggleTerms"
                            class="text-zinc-800 hover:underline font-light uppercase text-xs leading-relaxed"
                        >
                            Políticas de Privacidad
                        </button>
                    </p>
                    <p class="mb-1">
                        <button
                            @click.prevent="toggleTerms"
                            class="text-zinc-800 hover:underline font-light uppercase text-xs leading-relaxed"
                        >
                            Términos y Condiciones
                        </button>
                    </p>
                    <p class="mb-1">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="text-zinc-800 hover:underline font-light uppercase text-xs leading-relaxed"
                        >
                            <span class="text-zinc-800">
                                Soporte
                            </span>
                        </router-link>
                    </p>
                </div>
                <div
                    class="col-lg-2 col-md-6 col-sm-12 center-mobile mb-4 sm:mb-0"
                >
                    <h5 class="text-gray-900 mb-2 font-black">CONTACTO</h5>
                    <p
                        class="mb-1 font-light uppercase text-xs leading-relaxed"
                    >
                        <a href="mailto:info@myeart.org">info@myeart.org</a>
                    </p>
                </div>
                <div
                    class="col-lg-4 col-md-6 d-flex align-items-center md:-mt-10"
                >
                    <div class="flex flex-wrap justify-center items-center">
                        <div class="w-2/6 md:w-1/5 px-1">
                            <img
                                src="/images/icon-comerce/VisaClassic.png"
                                class="w-20 md:w-48"
                                alt="Responsive image"
                            />
                        </div>
                        <div class="w-2/6 md:w-1/5 px-1">
                            <img
                                src="/images/icon-comerce/MastercardFull.png"
                                class="w-20 md:w-48"
                                alt="Responsive image"
                            />
                        </div>
                        <div class="w-2/6 md:w-1/5 px-1">
                            <img
                                src="/images/icon-comerce/Paypal.png"
                                class="w-20 md:w-48"
                                alt="Responsive image"
                            />
                        </div>
                        <div class="flex justify-center items-center md:w-2/5">
                            <div class="px-1">
                                <img
                                    src="/images/icon-comerce/StorePay.png"
                                    class="w-auto md:w-48"
                                    alt="Responsive image"
                                />
                            </div>
                            <div class="px-1">
                                <img
                                    src="/images/icon-comerce/GooglePay.png"
                                    class="w-auto md:w-48"
                                    alt="Responsive image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Terms :show="showTerms" :full-screen="true" @close="toggleTerms" />
    </div>
</template>

<script>
import Terms from "../../auth/components/Terms.vue";

export default {
    name: "Footer",
    components: { Terms },
    data() {
        return {
            showTerms: false,
        };
    },
    methods: {
        toggleTerms() {
            this.showTerms = !this.showTerms;
        },
    },
};
</script>
