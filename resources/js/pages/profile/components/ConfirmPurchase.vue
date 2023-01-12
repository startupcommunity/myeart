<template>
    <div>
        <v-btn
            text
            depressed
            large
            class="uppercase tracking-wide font-bold"
            @click.stop="$emit('back-to-orders')"
        >
            <v-icon class="mr-2"> mdi-arrow-left </v-icon>
            Volver atrás
        </v-btn>
        <div class="mt-4 py-4 border-t border-gray-900"></div>

        <!-- detalles de la compra -->
        <div class="w.full">
            <h3
                class="text-3xl uppercase font-bold text-zinc-900 tracking-wider"
            >
                Confirmar pedido
            </h3>
            <p class="uppercase text-2xl font-medium">
                Nº {{ getOrderNumber(order.id) }}
            </p>
            <p class="text-base font-medium">
                {{ getOrderDate(order.created_at) }}
            </p>
        </div>
        <!-- /detalles de la compra -->

        <!-- items y valoración -->
        <div class="w-full pb-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
                <div>
                    <div
                        v-for="art in items"
                        :key="art.id"
                        class="animate-fade-in-both"
                    >
                        <div class="flex flex-col justify-start gap-2 mb-5">
                            <h2 class="text-xl font-bold text-zinc-900">
                                {{ art.artwork?.title }}
                            </h2>
                            <img
                                :src="getFrontArtwork(art)"
                                alt="obra-de-arte"
                                class="w-28 h-28 object-cover object-center aspect-square"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="font-light text-gray-900">
                        ¿Has recibido tu pedido?
                    </h3>
                    <div>
                        <v-radio-group
                            v-model="form.delivered"
                            row
                            class="flex gap-5"
                        >
                            <v-radio value="1" color="#B2794C">
                                <template v-slot:label>
                                    <span class="font-bold mt-2 text-gray-900"
                                        >SI</span
                                    >
                                </template>
                            </v-radio>
                            <v-radio value="2" color="#B2794C">
                                <template v-slot:label>
                                    <span class="font-bold mt-2 text-gray-900"
                                        >No</span
                                    >
                                </template>
                            </v-radio>
                        </v-radio-group>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <!-- <label class="font-light text-gray-900">
                    ¿Como valoras tu experiencia?
                </label> -->

                <label class="font-light text-gray-900"
                    >Envía un comentario</label
                >
                <v-textarea
                    v-model="form.comment"
                    color="#B2794C"
                    outlined
                    placeholder="Escribe aquí tu comentario"
                ></v-textarea>

                <div class="pt-2">
                    <v-btn
                        large
                        color="#B2794C"
                        @click.stop="confirmOrder"
                        :loading="globalLoading"
                        :disabled="globalLoading"
                        class="text-white"
                    >
                        Enviar y confirmar
                    </v-btn>
                </div>
            </div>
        </div>
        <!-- /items y valoración -->
    </div>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "ConfirmPurchase",
    mixins: [utilMixin],

    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            form: {
                order_id: this.order.id,
                delivered: null,
                rating: null,
                comment: null,
            },
        };
    },

    computed: {
        /**
         * Artículos de la orden
         */
        items() {
            return this.order.items || [];
        },
    },

    methods: {
        confirmOrder() {
            this.globalLoading = true;
            this.axios
                .post(this.ep.orders.confirm, this.form)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.notySwal({
                            title: "Agradecemos tu tiempo",
                            text: "Confirmado con éxito.",
                        });

                        this.$emit("confirmed-order");
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
