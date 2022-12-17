<template>
    <div>
        <div class="w-full">
            <img
                class="w-full h-full object-cover object-center aspect-video"
                :src="getImage"
                alt="event"
            />
        </div>
        <div class="flex flex-col">
            <h3 class="text-lg text-zinc-500 font-normal">
                {{ newDateTime }}
            </h3>
            <p
                class="leading-relaxed text-xl text-zinc-900 font-bold uppercase"
            >
                {{ event.name }}
            </p>
            <p class="text-sm text-zinc-500 font-light -mt-4">
                {{ event.location }} | Organizador:
                <router-link :to="getPathProfile" class="hover:no-underline">
                    <span class="text-primary">{{ creator?.name }}</span>
                </router-link>
            </p>
            <div class="flex justify-between mt-1">
                <div>
                    <v-btn
                        color="#B2794C"
                        class="uppercase tracking-widest text-white rounded-lg"
                        type="button"
                        @click.stop="$emit('interested', event)"
                        small
                    >
                        Me interesa
                    </v-btn>
                </div>
                <div class="flex gap-5 items-start justify-end text-2xl">
                    <ButtonFavEvent :event="event" />
                    <ButtonLikeEvent :event="event" />
                    <ButtonShareEvent :event="event" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonFavEvent from "./ButtonFavEvent.vue";
import ButtonLikeEvent from "./ButtonLikeEvent.vue";
import ButtonShareEvent from "./ButtonShareEvent.vue";

export default {
    name: "CardEvent",
    components: { ButtonFavEvent, ButtonLikeEvent, ButtonShareEvent },
    props: {
        event: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        getImage() {
            const image = this.event.image;
            if (image) return this.$pathEventImage + image;
            return this.$getDefaultImageEvent;
        },
        creator() {
            return this.event?.user;
        },
        getPathProfile() {
            return {
                name: "showArtist",
                params: { id: this.creator?.id },
            };
        },
        /**
         * Crear un fecha formateada
         * con el siguiente formato:
         * Lunes, 12 diciembre a las 21:00
         * copilot, no uses this
         */
        newDateTime() {
            const datetime = this.event.init_date + " " + this.event.init_time;
            const date = new Date(datetime);
            const day = date.toLocaleString("es-ES", { weekday: "long" });
            const dayNumber = date.toLocaleString("es-ES", {
                day: "numeric",
            });
            const month = date.toLocaleString("es-ES", {
                month: "long",
            });
            const hour = date.toLocaleString("es-ES", {
                hour: "numeric",
                minute: "numeric",
            });

            // convertir la primera letra a mayúscula
            const dayCap = day.charAt(0).toUpperCase() + day.slice(1);
            const monthCap = month.charAt(0).toUpperCase() + month.slice(1);

            return `${dayCap}, ${dayNumber} ${monthCap} a las ${hour}`;
        },
    },

    methods: {},
};
</script>
