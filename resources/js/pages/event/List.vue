<template>
    <MainLayout :show-header="false" :loading-overlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>
        <!-- header -->

        <!-- botón crear -->
        <ButtonCreate />
        <!-- /botón crear -->

        <!-- title -->
        <Title />
        <!-- /title -->

        <!-- filtros -->
        <Filters :filters="filters" @action="setFilterAction" />
        <!-- /filtros -->

        <!-- content -->
        <section class="bg-white">
            <div class="container pb-20">
                <div
                    class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
                >
                    <CardEvent
                        v-for="event in events"
                        :key="event.id"
                        :event="event"
                        class="w-full animate-fade-in-down md:mb-10"
                        @interested="openReservationInfo"
                    />
                </div>

                <InfoReservationModal
                    :event="event"
                    :show="showReservation"
                    @close-info="showReservation = false"
                />

                <div class="flex justify-center mt-10">
                    <v-btn
                        color="grey darken-4"
                        class="uppercase tracking-widest text-white rounded"
                        x-large
                        type="button"
                        @click="showMore"
                        v-if="events.length < original.length"
                    >
                        Ver más
                    </v-btn>
                </div>
            </div>
        </section>
        <!-- content -->
    </MainLayout>
</template>

<script>
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Filters from "./sections/Filters.vue";
import Title from "./sections/Title.vue";
import ButtonCreate from "./sections/ButtonCreate.vue";
import CardEvent from "./components/CardEvent.vue";
import InfoReservationModal from "./components/InfoReservationModal.vue";

const MAX_INIT_EVENTS = 6;
const ADD_EVENTS = 3;

export default {
    name: "EventList",
    components: {
        MainLayout,
        Header,
        Filters,
        Title,
        ButtonCreate,
        CardEvent,
        InfoReservationModal,
    },
    data() {
        return {
            loading: false,
            showReservation: false,
            event: {},
            events: [],
            original: [],
            filters: {
                sortBy: 1,
                action: 1,
            },
        };
    },

    created() {
        this.getEvents();
    },

    methods: {
        setFilterAction(action) {
            this.filters.action = action;
        },
        getEvents() {
            this.loading = true;

            this.axios
                .get(this.ep.events.getAll)
                .then((resp) => {
                    this.original = JSON.parse(JSON.stringify(resp.data));
                    this.events = this.original.slice(0, MAX_INIT_EVENTS);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },
        openReservationInfo(event) {
            this.event = event;
            this.showReservation = true;
        },
        showMore() {
            this.events = this.original.slice(
                0,
                this.events.length + ADD_EVENTS
            );
        },

        // pendiente de implementar
        // TODO: implementar
        // hacer botón de guardar
        // hacer botón de like
        // filtros varios
        // responsive mobile
    },
};
</script>
