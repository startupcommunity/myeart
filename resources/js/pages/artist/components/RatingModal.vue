<template>
    <v-row justify="center">
        <v-dialog v-model="show" persistent max-width="600">
            <v-card class="rounded-lg">
                <v-card-text class="text-left pt-6">
                    <div class="flex justify-between items-center">
                        <h3 class="text-left text-gray-900 font-light text-lg">
                            Calificaciones del artista
                        </h3>
                        <v-btn
                            icon
                            @click="$emit('close')"
                            class="text-gray-900"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-text>
                    <div>
                        <LoadingTailwind v-if="loading" />
                        <div v-else>
                            <div class="flex justify-start items-center gap-3">
                                <div class="text-6xl font-bold text-zinc-900">
                                    {{ average }}
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex gap-1">
                                        <v-icon
                                            v-for="i in 5"
                                            :key="i"
                                            :color="
                                                i <= average ? 'yellow' : 'gray'
                                            "
                                        >
                                            mdi-star
                                        </v-icon>
                                    </div>
                                    <div class="text-sm text-gray-900">
                                        ({{ data.length }}) calificaciones
                                    </div>
                                </div>
                            </div>
                            <div class="py-5">
                                <div class="flex flex-coi gap-3">
                                    <div
                                        class="flex justify-between items-start"
                                        v-for="r in data"
                                        :key="r.id"
                                    >
                                        <div class="flex flex-col gap-1">
                                            <div>
                                                <v-icon
                                                    v-for="i in 5"
                                                    :key="i"
                                                    :color="
                                                        i <= r.rating
                                                            ? 'yellow'
                                                            : 'gray'
                                                    "
                                                >
                                                    mdi-star
                                                </v-icon>
                                            </div>
                                            <div class="text-sm text-gray-900">
                                                {{ r.comment }}
                                            </div>
                                        </div>
                                        <div
                                            class="text-xs text-gray-900 mt-2 font-light"
                                        >
                                            {{ r.created_at | dateFormat }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";

export default {
    name: "RatingModal",
    components: { LoadingTailwind },

    props: {
        id: {
            type: Number,
            default: 0,
            description: "Id del artista",
        },
        show: {
            type: Boolean,
            default: false,
            description: "Mostrar modal",
        },
    },

    data() {
        return {
            loading: false,
            data: [],
        };
    },

    watch: {
        show(val) {
            if (val && this.id) {
                this.getRatings();
            }
        },
    },

    computed: {
        average() {
            if (this.data.length === 0) return 0;

            const sum = this.data.reduce((a, b) => a + b.rating, 0);
            const total = sum / this.data.length;

            // redondear el resultado, ejemplo 4.6 => 5, 4.4 => 4
            return Math.round(total * 2) / 2;
        },
    },

    filters: {
        /**
         * Devolver format: 03 mayo, 2022
         *
         * @param {string} value    Fecha
         */
        dateFormat(value) {
            const date = new Date(value);

            // dia ejemplo: 03
            const day = date.getDate().toString().padStart(2, "0");

            // mes ejemplo: mayo
            const month = date.toLocaleString("es-ES", { month: "long" });

            // año ejemplo: 2022
            const year = date.getFullYear();

            return `${day} ${month}, ${year}`;
        },
    },

    methods: {
        /**
         * Obtener los datos del artista
         * y sus calificaciones
         */
        getRatings() {
            this.loading = true;
            this.axios
                .get(this.ep.user.getArtistRatings + this.id)
                .then((response) => (this.data = response.data))
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
<style scoped>
.v-icon.v-icon {
    font-size: 16px !important;
}
</style>
