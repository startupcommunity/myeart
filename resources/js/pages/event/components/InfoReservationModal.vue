<template>
    <v-row justify="center">
        <v-dialog v-model="show" persistent max-width="600">
            <v-card class="rounded-lg">
                <v-card-text class="text-center pt-6">
                    <span
                        class="text-center text-gray-900 font-light text-lg md:text-3xl"
                    >
                        Contáctanos para tu reserva
                    </span>
                </v-card-text>
                <v-card-text class="text-center">
                    <span
                        class="text-center text-gray-900 font-semibold text-lg md:text-3xl"
                    >
                        {{ event.phone_number }}
                    </span>
                </v-card-text>
                <v-card-text class="text-center">
                    <span
                        class="text-center text-gray-900 font-light text-lg md:text-2xl"
                    >
                        Haz tu reserva ahora
                    </span>
                </v-card-text>
                <v-card-actions>
                    <div
                        class="flex flex-row justify-evenly items-center pb-3 pb-md-0"
                    >
                        <button
                            @click.prevent="$emit('close-info')"
                            class="text-gray-800 text-sm  md:text-base hover:no-underline uppercase py-4 px-2"
                        >
                            Volver atrás
                        </button>
                        <a
                            :href="`tel:${event.phone_number}`"
                            class="text-primary text-sm md:text-base hover:no-underline uppercase py-4 px-2"
                        >
                            LLamar ahora
                            <i class="fas fa-phone"></i>
                        </a>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: "InfoReservationModal",
    props: {
        event: {
            type: Object,
            default: () => ({}),
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
