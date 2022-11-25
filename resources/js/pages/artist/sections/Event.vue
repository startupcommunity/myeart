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
                    <div class="flex flex-wrap animate-swing-in-top-fwd">
                        <CardEvent
                            :event="{}"
                            :artist="artist"
                            class="w-full md:w-1/2 md:pr-4 mb-5"
                            key="1"
                        />
                        <CardEvent
                            :event="{}"
                            :artist="artist"
                            class="w-full md:w-1/2 mb-5"
                            key="2"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardEvent from "../components/CardEvent.vue";

export default {
    name: "EventSection",
    components: { CardEvent, LoadingTailwind },
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
    data() {
        return {
            loading: false,
            post: [],
        };
    },
    methods: {
        /**
         * Obtiene los post del usuario
         */
        getEvents() {},
    },
};
</script>
