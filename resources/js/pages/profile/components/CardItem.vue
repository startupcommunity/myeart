<template>
    <div
        :id="'item_' + item.id"
        :class="{ 'animate-fade-in-down': !loadingPdf }"
    >
        <div
            class="p-3 w-full text-white"
            :class="{
                'bg-green-600': status === ITEM_STATES.shipped.val,
                'bg-zinc-900': status === ITEM_STATES.delivered.val,
                'bg-red-600': status === ITEM_STATES.canceled.val,
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

        <div class="w-full border-b border-gray-200">
            <div class="text-zinc-900 font-bold py-2">
                {{ orderDate }}
            </div>
        </div>

        <div class="w-full py-3">
            <div class="flex flex-wrap justify-between">
                <div class="w-full lg:w-[70%]">
                    <div
                        :class="{
                            'animate-fade-in-both': !loadingPdf,
                        }"
                    >
                        <div class="flex justify-start mb-3 gap-5">
                            <img
                                :src="getImage"
                                alt="obra-de-arte"
                                class="w-28 h-28 object-cover object-center aspect-square cursor-pointer"
                                @click.stop="goToArtwork"
                            />
                            <div>
                                <p class="text-xl font-bold text-zinc-900">
                                    {{ title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-[30%]">
                    <div class="flex flex-col gap-3" v-if="!loadingPdf">
                        <v-btn
                            color="gray darken-1"
                            outlined
                            class="text-zinc-900"
                            @click.stop="$emit('see-purchase', item)"
                            v-if="status === ITEM_STATES.canceled.val"
                        >
                            Ver detalles
                        </v-btn>
                        <v-btn
                            color="#B2794C"
                            class="text-white"
                            @click.stop="$emit('see-purchase', item)"
                            v-if="status !== ITEM_STATES.canceled.val"
                        >
                            Ver compra
                        </v-btn>
                        <v-btn
                            color="gray darken-1"
                            outlined
                            class="text-zinc-900"
                            @click.stop="$emit('contact-seller', item)"
                            v-if="status === ITEM_STATES.shipped.val"
                        >
                            <span> Contactar vendedor </span>
                        </v-btn>
                        <v-btn
                            color="gray darken-1"
                            outlined
                            class="text-zinc-900"
                            @click.stop="$emit('confirm-order', item)"
                            v-if="status === ITEM_STATES.shipped.val"
                        >
                            Calificar pedido
                        </v-btn>
                        <v-btn
                            color="gray darken-1"
                            outlined
                            class="text-zinc-900"
                            @click.stop="downloadPdf"
                            v-if="status !== ITEM_STATES.canceled.val"
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
import html2pdf from "html2pdf.js";
import getDataMixin from "../../../mixins/getDataMixin";

export default {
    name: "CardItem",
    mixins: [getDataMixin],

    props: {
        item: {
            type: Object,
            default: () => ({}),
            description: "Información del pedido/articulo",
        },
        shippingAddress: {
            type: Object,
            default: () => ({}),
            description: "Información de la dirección de envío",
        },
    },

    data() {
        return {
            loadingPdf: false,
        };
    },

    computed: {
        /**
         * Titulo de la obra
         */
        title() {
            return this.item.title;
        },

        /**
         * Estado del pedido
         */
        status() {
            return this.item.status;
        },

        /**
         * Numero de pedido
         */
        orderNumber() {
            return this.item.number;
        },

        /**
         * Formato: 7 de enero de 2023
         */
        orderDate() {
            const date = new Date(this.item.created_at);

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
            const states = this.ITEM_STATES;

            if (states.shipped.val === this.status) {
                return "Pedido realizado con éxito. Envío en curso.";
            }

            if (states.canceled.val === this.status) {
                return "Cancelado. El pedido ha sido cancelado";
            }

            if (states.delivered.val === this.status) {
                return "Finalizado. Ha sido entregado en la dirección indicada";
            }

            return "---";
        },

        /**
         * Dirección de entrega
         */
        address() {
            const address = this.shippingAddress;
            const city = address?.city || "";
            const state = address?.state || "";
            const code = address?.postal_code || "";
            return `${address?.address}, ${code} ${(city, state)}`;
        },

        /**
         * Foto de portada de la obra
         */
        getImage() {
            const photo = this.item.photo;
            if (!photo) return this.getURLDefaultFrontArtwork;
            return `${this.pathArtworkGallery + photo}`;
        },
    },

    methods: {
        downloadPdf() {
            this.loadingPdf = true;
            this.$noty("Descargando certificado...", "info", 5000);

            const element = document.getElementById("item_" + this.item.id);
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

        /**
         * Ir a la obra
         */
        goToArtwork() {
            this.$router.push({
                name: "showArtwork",
                params: { id: this.item.artwork_id },
            });
        },
    },
};
</script>
