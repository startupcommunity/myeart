<template>
    <div
        :id="'order_' + order.id"
        :class="{ 'animate-fade-in-down': !loadingPdf }"
    >
        <div
            class="p-3 w-full text-white"
            :class="{
                'bg-green-600': status === ORDER_STATES.pending.val,
                'bg-zinc-900': status === ORDER_STATES.delivered.val,
                'bg-red-600': status === ORDER_STATES.canceled.val,
            }"
        >
            <div
                class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3"
            >
                <h3 class="font-light">
                    <span class="uppercase font-bold">ESTATUS</span>&nbsp;
                    {{ textStatus }}
                </h3>
                <div class="font-bold">
                    <span class="uppercase">PEDIDO Nº</span>&nbsp;
                    {{ orderNumber }}
                </div>
            </div>
        </div>

        <div class="w-full border-b border-gray-200 pt-2 -mb-1">
            <p class="text-zinc-900 font-bold">
                {{ orderDate }}
            </p>
        </div>

        <div class="w-full py-3">
            <div class="flex flex-wrap justify-between">
                <div class="w-full lg:w-[70%]">
                    <div
                        v-for="art in items"
                        :key="art.id"
                        :class="{
                            'animate-fade-in-both': !loadingPdf,
                        }"
                    >
                        <div class="flex justify-start gap-5 mb-3">
                            <img
                                :src="getImage(art)"
                                alt="obra-de-arte"
                                class="w-28 h-28 object-cover object-center aspect-square"
                            />
                            <div>
                                <p class="text-xl font-bold text-zinc-900">
                                    {{ art.artwork?.title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-[30%]">
                    <!-- <LoadingTailwind v-if="loadingPdf" /> -->
                    <div class="flex flex-col gap-3" v-if="!loadingPdf">
                        <v-btn
                            color="gray darken-1"
                            large
                            outlined
                            class="text-zinc-900"
                            @click.stop="$emit('see-purchase', order)"
                            v-if="status === ORDER_STATES.canceled.val"
                        >
                            Ver detalles
                        </v-btn>
                        <v-btn
                            color="#B2794C"
                            large
                            class="text-white"
                            @click.stop="$emit('see-purchase', order)"
                            v-if="status !== ORDER_STATES.canceled.val"
                        >
                            Ver compra
                        </v-btn>
                        <v-btn
                            color="gray darken-1"
                            large
                            outlined
                            class="text-zinc-900"
                            @click.stop="$emit('confirm-order', order)"
                            v-if="status === ORDER_STATES.pending.val"
                        >
                            Confirmar pedido
                        </v-btn>
                        <v-btn
                            color="gray darken-1"
                            large
                            outlined
                            class="text-zinc-900"
                            @click.stop="downloadPdf"
                            v-if="status !== ORDER_STATES.canceled.val"
                        >
                            <span class="block md:hidden">
                                Descargar certificado
                            </span>
                            <span
                                class="hidden md:block lg:block xl:block 2xl:hidden"
                            >
                                Descargar certif.
                            </span>
                            <span class="hidden 2xl:block">
                                Descargar certificado
                            </span>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="w-full pt-3">
                <p class="font-bold text-zinc-900">
                    Enviado:
                    <span class="font-light text-zinc-800">
                        {{ address }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import getDataMixin from "../../../mixins/getDataMixin";
import html2pdf from "html2pdf.js";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";

export default {
    name: "CardOrder",
    mixins: [getDataMixin],
    components: { LoadingTailwind },

    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            loadingPdf: false,
        };
    },

    computed: {
        items() {
            return this.order.items || [];
        },

        shipping_address() {
            return this.order.shipping_address || {};
        },

        subtotal() {
            return this.order.subtotal || 0;
        },

        tax() {
            return this.order.tax || 0;
        },

        total() {
            return this.order.total || 0;
        },

        status() {
            return this.order.status;
        },

        orderNumber() {
            return "000" + this.order.id;
        },

        /**
         * Formato: 7 de enero de 2023
         */
        orderDate() {
            const date = new Date(this.order.created_at);

            // const day = date.toLocaleString("es-ES", { weekday: "long" });
            const dayNumber = date.toLocaleString("es-ES", { day: "numeric" });
            const month = date.toLocaleString("es-ES", { month: "long" });
            const year = date.toLocaleString("es-ES", { year: "numeric" });

            // nombre de dia y meses en PascalCase
            const monthPascal = month.charAt(0).toUpperCase() + month.slice(1);

            // imprimir el formato, ejemplo: 7 de enero de 2023
            return `${dayNumber} de ${monthPascal} de ${year}`;
        },

        /**
         * texto según elñ status
         */
        textStatus() {
            const states = this.ORDER_STATES;

            if (states.pending.val === this.status) {
                return "Pedido realizado con éxito. Envío en curso.";
            }

            if (states.canceled.val === this.status) {
                return "Cancelado. El pedido ha sido cancelado";
            }

            if (states.delivered.val === this.status) {
                return "Finalizado. Ha sido entregado en la dirección indicada";
            }

            return "";
        },

        /**
         * Dirección de entrega
         */
        address() {
            const address = this.shipping_address;
            const city = address?.city || "";
            const state = address?.state || "";
            const code = address?.postal_code || "";
            return `${address?.address}, ${code} ${(city, state)}`;
        },
    },

    methods: {
        getImage(art) {
            const artwork = art.artwork || {};
            const gallery = artwork?.gallery || [];

            if (!gallery.length) return this.getURLDefaultFrontArtwork;

            const front_page = gallery.filter((pic) => pic.front_page === 1);

            return `${this.pathArtworkGallery + front_page[0]?.picture}`;
        },

        downloadPdf() {
            this.loadingPdf = true;

            const element = document.getElementById("order_" + this.order.id);
            const opt = {
                margin: 1,
                filename: "invoice.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 3 },
                jsPDF: {
                    unit: "in",
                    format: "letter",
                    orientation: "portrait",
                },
            };

            // New Promise-based usage:
            const pdf = html2pdf().from(element).set(opt);
            pdf.save();

            setTimeout(() => {
                this.loadingPdf = false;
            }, 1000);
        },
    },
};
</script>
