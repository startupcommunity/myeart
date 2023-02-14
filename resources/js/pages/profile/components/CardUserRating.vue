<template>
    <div>
        <div class="flex justify-start items-center gap-3">
            <div class="text-6xl font-bold text-zinc-900">
                {{ average }}
            </div>
            <div class="flex flex-col">
                <div class="flex gap-1">
                    <v-icon
                        v-for="i in 5"
                        :key="i"
                        :color="i <= average ? 'yellow' : 'gray'"
                    >
                        mdi-star
                    </v-icon>
                </div>
                <div class="text-sm text-gray-900">
                    ({{ ratings.length }}) calificaciones
                </div>
            </div>
        </div>
        <div class="py-5 w-full">
            <div class="flex flex-wrap gap-3">
                <div
                    v-for="r in ratings"
                    :key="r.id"
                    class="w-full animate-fade-in-down shadow-md p-3"
                >
                    <div class="flex justify-between items-start">
                        <div class="flex flex-col gap-1">
                            <div>
                                <v-icon
                                    v-for="i in 5"
                                    :key="i"
                                    :color="i <= r.rating ? 'yellow' : 'gray'"
                                >
                                    mdi-star
                                </v-icon>
                            </div>
                            <div class="text-sm text-gray-900">
                                {{ r.comment }}
                            </div>
                        </div>
                        <div class="text-xs text-gray-900 mt-2 font-light">
                            {{ r.created_at | dateFormat }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardUserRating",
    props: {
        ratings: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        average() {
            if (this.ratings.length === 0) return 0;

            const sum = this.ratings.reduce((a, b) => a + b.rating, 0);
            const total = sum / this.ratings.length;

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
            const day = date.getDate().toString().padStart(2, "0");
            const month = date.toLocaleString("es-ES", { month: "long" });
            const year = date.getFullYear();
            return `${day} ${month}, ${year}`;
        },
    },
};
</script>
