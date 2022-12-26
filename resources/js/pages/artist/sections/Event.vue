<template>
    <section class="bg-white">
        <div class="container">
            <div class="w-full border-b pb-1 pb-md-2 border-zinc-800">
                <h2
                    class="text-primary text-lg md:text-2xl font-bold tracking-widest uppercase text-left"
                >
                    <span v-if="title"> {{ title }} </span>
                    <span v-else>Mas eventos de {{ artist?.name }}</span>
                </h2>
            </div>
            <div class="pt-10">
                <LoadingTailwind
                    v-show="loading"
                    css="w-full animate-swing-in-top-fwd"
                />
                <div class="md:py-10">
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch"
                    >
                        <CardEvent
                            v-for="evt in events"
                            :key="evt.id"
                            :event="evt"
                            class="w-full animate-fade-in-down md:mb-10"
                            @interested="openReservationInfo"
                        />
                    </div>
                </div>
            </div>
        </div>

        <InfoReservationModal
            :event="event"
            :show="showReservation"
            @close-info="showReservation = false"
        />
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardEvent from "../../event/components/CardEvent.vue";
import InfoReservationModal from "../../event/components/InfoReservationModal.vue";

const MAX_INIT_EVENTS = 4;

export default {
    name: "EventSection",
    components: { CardEvent, LoadingTailwind, InfoReservationModal },
    props: {
        artist: {
            type: Object,
            default: {},
        },
        title: {
            type: String,
            default: null,
        },
        loadComponent: {
            type: Boolean,
            default: true,
            description:
                "define si el componente debe cargarse/cuando debe cargarse de data",
        },
    },

    created() {
        this.getEvents();
    },

    data() {
        return {
            loading: false,
            showReservation: false,
            post: [],
            event: {},
            events: [],
        };
    },

    methods: {
        /**
         * Obtiene los post del usuario
         */
        getEvents() {
            this.loading = true;

            this.axios
                .get(this.ep.events.getUserEvents + this.artist.id)
                .then((resp) => {
                    this.events = resp.data.slice(0, MAX_INIT_EVENTS);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        openReservationInfo(event) {
            this.event = event;
            this.showReservation = true;
        },
    },
};
</script>
