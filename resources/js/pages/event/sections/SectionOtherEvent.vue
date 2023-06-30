<template>
    <section class="bg-gray-100">
        <div class="container mx-auto">
            <div class="py-md-8">
                <div class="border-b pb-3 w-full border-zinc-800 mt-3">
                    <h6
                        class="text-primary text-center text-xl font-bold uppercase tracking-wider"
                    >
                        Eventos que te pueden interesar
                    </h6>
                </div>
                <div class="py-8">
                    <LoadingTailwind
                        v-show="globalLoading"
                        css="w-full animate-swing-in-top-fwd"
                    />
                    <div id="slider-other-events" v-if="events.length">
                        <CardEvent
                            :event="event"
                            :key="event.id"
                            v-for="event in events"
                            class="mb-5"
                            @interested="openReservationInfo"
                        />
                    </div>
                    <div v-else>
                        <p class="text-center text-gray-500 text-lg font-light">
                            No hay eventos disponibles
                        </p>
                        <p class="text-center text-gray-500 text-lg font-light -mt-2">
                            <i class="fas fa-frown fa-2x text-gray-400"></i>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal ver reserva -->
        <InfoReservationModal
            :event="event"
            :show="showReservation"
            @close-info="showReservation = false"
        />
    </section>
</template>

<script>
import { tns } from "tiny-slider";
import CardEvent from "../components/CardEvent.vue";
import InfoReservationModal from "../components/InfoReservationModal.vue";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";

export default {
    name: "SectionOtherEvent",
    components: { CardEvent, InfoReservationModal, LoadingTailwind },
    data() {
        return {
            events: [],
            event: {},
            showReservation: false,
        };
    },
    created() {
        this.getEvents();
    },
    methods: {
        getEvents() {
            const ep = this.$isUserGuest
                ? this.ep.events.getGuestAll
                : this.ep.events.getAll;

            this.globalLoading = true;
            this.axios
                .get(ep, {
                    params: {
                        sortBy: 1,
                        exclude: this.$route.params.id,
                    },
                })
                .then((resp) => (this.events = resp.data))
                .then(() => this.showTNS())
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },
        openReservationInfo(event) {
            this.event = event;
            this.showReservation = true;
        },

        showTNS() {
            tns({
                container: "#slider-other-events",
                mode: "carousel",
                speed: 800,
                gutter: 20,
                items: 3,
                autoplay: false,
                mouseDrag: true,
                autoplayButtonOutput: false,
                autoplayHoverPause: true,
                lazyload: true,
                controls: false,
                responsive: {
                    0: {
                        items: 1,
                        edgePadding: 30,
                    },
                    500: {
                        items: 2,
                        edgePadding: 30,
                    },
                    700: {
                        items: 3,
                        edgePadding: 10,
                        gutter: 30,
                    },
                },
            });
        },
    },
};
</script>
