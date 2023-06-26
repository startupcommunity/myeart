<template>
    <section class="bg-white">
        <div class="py-5 md:py-10 container px-5 px-md-0">
            <div
                class="flex flex-col md:flex-row justify-center items-center md:gap-16 md:border-b border-zinc-700 md:pb-5"
            >
                <div
                    class="md:border-r border-gray-900 h-full md:pr-16 order-2 order-md-1"
                >
                    <button
                        class="rounded-md p-2"
                        :disabled="isUserGuest"
                        :class="{
                            'cursor-not-allowed': isUserGuest,
                            'opacity-50': isUserGuest,
                        }"
                    >
                        <span
                            class="text-zinc-900 font-bold tracking-normal uppercase text-sm md:text-base"
                        >
                            <i class="fas fa-user text-zinc-900"> </i>
                            Publicaciones de amigos
                        </span>
                    </button>
                </div>
                <!-- <div
                    class="md:border-r border-gray-900 h-full md:pr-16 order-3 order-md-2"
                >
                    <button class="hover:animate-bg-gray-light rounded-md p-2">
                        <span
                            class="text-zinc-400 font-bold tracking-normal uppercase text-sm md:text-base"
                        >
                            <i class="fa-solid fa-bars-staggered text-zinc-400">
                            </i>
                            Blog
                        </span>
                    </button>
                </div> -->
                <div class="order-1 order-md-2">
                    <div class="flex flex-wrap items-center">
                        <div class="w-auto">
                            <span
                                class="text-zinc-900 font-bold tracking-normal uppercase text-sm md:text-base"
                            >
                                Ordenar por:
                            </span>
                        </div>
                        <v-select
                            :items="sortBy"
                            item-text="text"
                            item-value="val"
                            color="#B2794C"
                            item-color="brown darken-2"
                            class="pl-2 uppercase w-52 text-sm md:text-base mt-2 md:mt-0"
                            v-model="filters.sortBy"
                        ></v-select>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import utilMixin from "../../../../mixins/utilMixin";

export default {
    name: "Filters",
    mixins: [utilMixin],
    data() {
        return {
            sortBy: [
                { text: "Mas reciente", val: 1 },
                { text: "Orden alfabético", val: 2 },
            ],

            filters: {
                sortBy: 1,
            },
        };
    },

    watch: {
        filters: {
            handler() {
                // convertir a entero antes de enviar
                this.filters.sortBy = parseInt(this.filters.sortBy);
                this.$emit("filters", this.filters);
            },
            deep: true,
        },
    },
};
</script>
