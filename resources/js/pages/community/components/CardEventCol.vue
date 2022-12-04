<template>
    <div>
        <div
            class="flex flex-col space-y-2 hover:animate-shadow-drop-center hover:cursor-pointer"
        >
            <!-- image -->
            <div class="w-full h-48">
                <img
                    :src="event.image"
                    :alt="event.title"
                    class="w-full h-full object-cover object-center"
                />
            </div>

            <!-- content -->
            <div class="px-1">
                <span class="text-base font-medium tracking-wide text-gray-500">
                    {{ event.created_at | formatDate }}
                </span>
            </div>
            <div class="px-1">
                <h5
                    class="text-2xl font-bold text-zinc-900 uppercase tracking-wide"
                >
                    {{ event.title }}
                </h5>
            </div>
            <div class="flex justify-between items-end px-1 pb-2">
                <div class="border-r border-gray-600 pr-2 h-full">
                    <span
                        class="text-xs font-medium tracking-wide text-gray-500"
                    >
                        {{ event.location | truncateText }}
                    </span>
                </div>
                <div class="pl-2">
                    <span
                        class="text-xs font-medium tracking-wide text-gray-500"
                    >
                        Organizador
                        <span class="text-primary">{{ creator?.name }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CardEventCol",
    props: {
        event: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        /**
         * Obtener la fecha del evento
         */
        date() {
            return this.event.date;
        },
        /**
         * Obtener el titulo del evento
         */
        title() {
            return this.event.title;
        },
        /**
         * Obtener la descripcion del evento
         */
        description() {
            return this.event.description;
        },
        /**
         * Obtener la imagen del evento
         */
        image() {
            return this.event.image;
        },
        /**
         * Obtener la url del evento
         */
        url() {
            return this.event.url;
        },
        /**
         * Creador del evento
         */
        creator() {
            return this.event?.creator;
        },
    },
    filters: {
        /**
         * Formatear la fecha del evento, en un formato
         * de texto español, ejemplo:
         * Lunes, 1 de Enero de 2021
         * @param {String} date
         */
        formatDate(date) {
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return new Date(date).toLocaleDateString("es-ES", options);
        },

        /**
         * Acortar texto para que se vea bien
         * en pantalla
         */
        truncateText(text) {
            return text.length > 20 ? text.substring(0, 20) + "..." : text;
        },
    },
    methods: {
        /**
         * Obtener la fecha del evento
         */
        getDate() {
            return this.date;
        },
        /**
         * Obtener el titulo del evento
         */
        getTitle() {
            return this.title;
        },
        /**
         * Obtener la descripcion del evento
         */
        getDescription() {
            return this.description;
        },
        /**
         * Obtener la imagen del evento
         */
        getImage() {
            return this.image;
        },
        /**
         * Obtener la url del evento
         */
        getUrl() {
            return this.url;
        },
    },
};
</script>
