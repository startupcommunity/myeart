<template>
    <MainLayout :show-header="false" :loading-overlay="globalLoading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>
        <!-- header -->

        <!-- botones -->
        <section class="bg-white">
            <div class="container py-10">
                <BackButton class="block md:hidden" />
                <div
                    class="flex flex-col flex-md-row justify-center justify-md-between items-center"
                >
                    <BackButton class="hidden md:flex" />
                    <ButtonCreate class="mt-8 mt-md-0" />
                </div>
            </div>
        </section>
        <!-- botones -->

        <!-- section event -->
        <section class="bg-white">
            <div class="container pb-20">
                <div class="flex flex-wrap justify-between items-start">
                    <div class="w-full md:w-1/2">
                        <p class="text-lg block md:hidden">
                            <span class="font-bold">Reserva Nº</span>
                            <span>{{ event?.phone_number }}</span>
                        </p>
                        <img
                            class="w-full h-full object-cover object-center aspect-square rounded"
                            :src="getImage"
                            alt="event"
                        />
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="flex flex-col md:pl-10">
                            <p class="text-2xl hidden md:block">
                                <span class="font-bold">Reserva Nº</span>
                                <span>{{ event?.phone_number }}</span>
                            </p>
                            <h3
                                class="text-lg text-zinc-500 font-normal mt-1 mt-md-0"
                            >
                                {{ newDateTime }}
                            </h3>
                            <div class="flex justify-between">
                                <span
                                    class="leading-relaxed text-lg md:text-2xl text-zinc-900 font-bold uppercase"
                                >
                                    {{ event?.name }}
                                </span>
                                <div
                                    class="md:flex gap-5 items-start justify-end text-2xl hidden"
                                >
                                    <ButtonFavEvent :event="event" v-if="event?.id" />
                                    <ButtonLikeEvent :event="event" v-if="event?.id" />
                                    <ButtonShareEvent :event="event" v-if="event?.id" />
                                </div>
                            </div>
                            <p class="text-sm text-zinc-500 font-light">
                                {{ event?.location }} | Organizador:
                                <router-link
                                    :to="getPathProfile"
                                    class="hover:no-underline"
                                >
                                    <span class="text-primary font-bold">
                                        {{ creator?.name }}
                                    </span>
                                </router-link>
                            </p>
                            <p class="text-sm text-zinc-500 font-light" v-if="event?.collective">
                                Colectivo:
                                <router-link
                                    :to="getPathProfileCollective"
                                    class="hover:no-underline"
                                >
                                    <span class="text-primary font-bold">
                                        {{ event?.collective?.name }}
                                    </span>
                                </router-link>
                            </p>
                            <p class="text-primary uppercase text-sm font-bold">
                                {{ getMode }}
                            </p>
                            <p
                                class="text-sm text-zinc-600 font-light"
                            >
                                {{ getDescription }}
                            </p>
                            <div class="mt-5 hidden md:flex items-end">
                                <v-btn
                                    color="#B2794C"
                                    class="uppercase tracking-widest text-white rounded"
                                    type="button"
                                    @click.stop="showReservation = true"
                                >
                                    Me interesa
                                </v-btn>
                            </div>

                            <!-- visible en mobile -->
                            <div class="flex justify-between mt-1 md:hidden">
                                <div>
                                    <v-btn
                                        color="#B2794C"
                                        class="uppercase tracking-widest text-white rounded"
                                        type="button"
                                        @click.stop="showReservation = true"
                                        small
                                    >
                                        Me interesa
                                    </v-btn>
                                </div>
                                <div
                                    class="flex gap-5 items-start justify-end text-2xl"
                                >
                                    <ButtonFavEvent :event="event" v-if="event?.id" />
                                    <ButtonLikeEvent :event="event" v-if="event?.id" />
                                    <ButtonShareEvent :event="event" v-if="event?.id" />
                                </div>
                            </div>
                            <!-- /visible en mobile -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /section event -->

        <!-- section eventos que te pueden interesar -->
        <SectionOtherEvent :event="event" />
        <!-- section eventos que te pueden interesar -->

        <!-- modal ver reserva -->
        <InfoReservationModal
            :event="event"
            :show="showReservation"
            @close-info="showReservation = false"
        />
    </MainLayout>
</template>

<script>
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import ButtonFavEvent from "./components/ButtonFavEvent.vue";
import ButtonLikeEvent from "./components/ButtonLikeEvent.vue";
import ButtonShareEvent from "./components/ButtonShareEvent.vue";
import BackButton from "./../../components/BackButton.vue";
import ButtonCreate from "./sections/ButtonCreate.vue";
import InfoReservationModal from "./components/InfoReservationModal.vue";
import SectionOtherEvent from "./sections/SectionOtherEvent.vue";

export default {
    name: "ShowEvent",
    components: {
        ButtonFavEvent,
        ButtonLikeEvent,
        ButtonShareEvent,
        MainLayout,
        Header,
        BackButton,
        ButtonCreate,
        InfoReservationModal,
        SectionOtherEvent,
    },

    data() {
        return {
            event: {},
            showReservation: false,
        };
    },

    created() {
        this.getEvent();
    },

    computed: {
        getImage() {
            const image = this.event?.image;
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
        getPathProfileCollective() {
            return {
                name: "collectiveShow",
                params: { id: this.event?.collective_id },
            };
        },
        getMode() {
            return this.event?.mode === 1 ? "online" : "presencial";
        },
        getDescription() {
            const description = this.event?.description;

            // si la descripción es una sola linea de texto
            // y no tiene espacios entre palabras
            // se acorta el texto a 100 caracteres
            if (description && description.length > 50) {
                const words = description.split(" ");
                if (words.length === 1) {
                    return description.substring(0, 50) + "...";
                }
            }

            return description;
        },
        /**
         * Crear un fecha formateada
         * con el siguiente formato:
         * Lunes, 12 diciembre a las 21:00
         * copilot, no uses this
         */
        newDateTime() {
            const datetime =
                this.event?.init_date + " " + this.event?.init_time;
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

    methods: {
        /**
         * Obtener el evento
         */
        getEvent() {
            const id = this.$route.params.id;
            this.globalLoading = true;
            this.axios
                .get(this.ep.events.show + id)
                .then((resp) => (this.event = resp.data))
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
