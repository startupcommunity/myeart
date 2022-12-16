<template>
    <div>
        <div class="py-8">
            <h1 class="uppercase text-3xl text-zinc-900 font-bold">
                <i class="fas fa-check-circle"></i>
                Tu evento ha sido publicado
                <span class="text-green-600">con éxito</span>
            </h1>
        </div>
        <div>
            <div class="flex flex-wrap justify-between items-center">
                <div class="w-full md:w-1/2 md:pr-4">
                    <img
                        :src="getImage"
                        :alt="event.name"
                        class="w-full h-full object-cover object-center rounded-lg aspect-square"
                    />
                </div>
                <div class="w-full md:w-1/2 md:pl-4">
                    <p class="text-3xl uppercase text-zinc-900 font-bold mt-3">
                        {{ event.name }}
                    </p>
                    <p class="text-3xl uppercase text-zinc-400 font-bold">
                        {{ event.init_date | formatDate }}
                    </p>
                    <p class="text-xl uppercase text-zinc-400 font-bold">
                        {{ event.init_time | formatTime }}
                    </p>
                    <p class="text-xl uppercase text-zinc-400 font-bold">
                        {{ event.location }}
                    </p>
                    <div
                        class="flex flex-col flex-md-row justify-center justify-md-start py-3 gap-3"
                    >
                        <v-btn
                            color="grey darken-4"
                            class="uppercase tracking-widest text-white"
                            x-large
                            type="button"
                            @click.prevent="share"
                        >
                            <i class="fas fa-share-alt"></i>
                            Compartir
                        </v-btn>
                        <v-btn
                            color="#B2794C"
                            class="uppercase tracking-widest text-white"
                            x-large
                            type="button"
                            @click.stop="backToEvents"
                        >
                            Volver a eventos
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "SuccessSection",
    mixins: [utilMixin],

    props: {
        event: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        getImage() {
            const image = this.event.image;

            if (image) {
                return this.$pathEventImage + image;
            }

            return this.$getDefaultImageEvent;
        },
    },

    methods: {
        share() {
            const url = this.secureUrl;
            const slug = this.event.slug ?? "";
            const route = "/eventos/public/" + slug;
            const text = url + route;
            this.copyToClipboard(text);
        },
        backToEvents() {
            this.$router.push({ name: "eventList" });
        },
    },

    filters: {
        /**
         * Crear un filtro para formatear la fecha
         * con el siguiente formato: 12 Diciembre 2020
         */
        formatDate(value) {
            const date = new Date(value);
            const day = date.getDate();
            const month = date.toLocaleString("es-ES", { month: "long" });
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },

        /**
         * Crear un filtro para formatear la hora
         * con el siguiente formato: 21:00 Hr.
         */
        formatTime(getValue) {
            // si le faltan los segundos, se los agregamos
            if (getValue.length === 5) {
                getValue += ":00";
            }
            // agregar la fecha
            getValue = "2021-01-01 " + getValue;

            const date = new Date(getValue);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours}:${minutes} Hr.`;
        },
    },
};
</script>
