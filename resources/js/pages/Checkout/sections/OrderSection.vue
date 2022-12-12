<template>
    <section class="bg-white">
        <div class="container pt-12">
            <button
                @click.stop="$router.go(-1)"
                text
                class="flex items-center text-zinc-800 hover:text-zinc-900 py-1 rounded-md mb-4"
            >
                <v-icon class="mr-2">mdi-arrow-left</v-icon>
                Atrás
            </button>
            <h1 class="uppercase text-3xl text-zinc-900 font-bold mb-8">
                ¿Donde quieres recibir tu pedido?
            </h1>
            <div v-if="items.length">
                <div
                    class="flex flex-wrap justify-start animate-fade-in-down mb-5"
                >
                    <div class="w-full md:w-1/2">
                        <div v-if="address?.id">
                            <div class="flex flex-col">
                                <v-radio-group
                                    v-model="defaultAddress"
                                    @change="
                                        $emit('setAddress', $event)
                                    "
                                    mandatory
                                >
                                    <v-radio value="1" color="#B2794C">
                                        <template #label>
                                            <span
                                                class="font-bold text-zinc-900 mt-2"
                                            >
                                                Utilizar dirección por defecto
                                            </span>
                                        </template>
                                    </v-radio>
                                    <v-radio value="2" color="#B2794C">
                                        <template #label>
                                            <span
                                                class="font-bold text-zinc-900 mt-2"
                                            >
                                                Utilizar otra dirección
                                            </span>
                                        </template>
                                    </v-radio>
                                </v-radio-group>

                                <UseDefaultAddress
                                    :addr="address"
                                    v-if="isDefAddr"
                                />
                                <UseFormAddress :form="form" v-else />
                            </div>
                        </div>
                        <div v-else>
                            <UseFormAddress :form="form" />
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 md:px-7">
                        <div class="py-5 border-b border-zinc-900 space-y-5">
                            <CardItemCheckout
                                :artwork="item.artwork"
                                v-for="item in items"
                                :key="item.id"
                            />
                        </div>
                        <div
                            class="flex flex-row justify-between items-start py-5"
                        >
                            <p class="uppercase text-base font-light">
                                + impuestos incluidos
                            </p>
                            <div class="flex flex-col items-end">
                                <p
                                    class="text-lg font-bold text-gray-900 uppercase"
                                >
                                    {{ availableItems }} Artículo(s)
                                    <span class="font-light">
                                        {{ subtotal | fPrice }}
                                    </span>
                                </p>
                                <p
                                    class="text-lg font-bold text-gray-900 uppercase"
                                >
                                    Envío
                                    <span class="font-light">
                                        {{ shipping | fPrice }}
                                    </span>
                                </p>
                                <p
                                    class="text-lg font-bold text-gray-900 uppercase"
                                >
                                    total {{ total | fPrice }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2">
                        <UseShippingMethod
                            @changedMethod="$emit('changedMethod')"
                        />
                    </div>
                    <div class="w-full md:w-1/2 mb-5">
                        <div class="flex justify-center justify-md-end md:pr-4">
                            <v-btn
                                x-large
                                color="grey darken-4"
                                @click.stop="$emit('finalPurchase')"
                                :loading="loading"
                                :disabled="!allPublished || loading"
                            >
                                <span class="uppercase text-white">
                                    Continuar
                                </span>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-5 border-b border-zinc-900 pb-3" v-else>
                <div class="flex flex-wrap justify-between items-start pb-3">
                    <div class="w-full">
                        <h2 class="text-xl text-zinc-900 font-medium">
                            <i class="fas fa-info-circle text-gray-400"></i>
                            No tienes obras en tu cesta
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CardItemCheckout from "../components/CardItemCheckout.vue";
import UseDefaultAddress from "../components/UseDefaultAddress.vue";
import UseFormAddress from "../components/UseFormAddress.vue";
import UseShippingMethod from "../components/UseShippingMethod.vue";

export default {
    name: "OrderSection",
    components: {
        UseFormAddress,
        CardItemCheckout,
        UseShippingMethod,
        UseDefaultAddress,
    },
    data() {
        return {
            defaultAddress: 1,
        };
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Array,
            default: () => [],
        },
        address: {
            type: Object,
            default: () => {},
        },
        shipping: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            default: 0,
        },
        form: {
            type: Object,
            default: () => {},
        },
    },

    filters: {
        /**
         * Formatear el precio
         */
        fPrice(value) {
            return new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(value);
        },
    },

    computed: {
        /**
         * Cantidad de items disponibles
         */
        availableItems() {
            const items = this.items;
            const filter = items.filter((item) => item.artwork?.state === 1);
            return filter.length;
        },

        /**
         * Obtener el monto subtotal de todos
         * los artículos en la cesta
         */
        subtotal() {
            return this.items.reduce((total, item) => {
                const one = parseFloat(total);
                const two = parseFloat(item.artwork?.price);
                const result = one + two;
                return parseFloat(result).toFixed(2);
            }, 0);
        },

        /**
         * devuelve el total
         * subtotal + envío
         */
        total() {
            return parseFloat(this.subtotal) + parseFloat(this.shipping);
        },

        /**
         * Verifica si todas las obras están disponibles
         * state = 1  => publicada
         */
        allPublished() {
            return this.items.every((item) => item.artwork?.state === 1);
        },

        /**
         * Si se ha seleccionad la dirección por defecto
         */
        isDefAddr() {
            return this.defaultAddress == 1;
        },
    },
};
</script>
