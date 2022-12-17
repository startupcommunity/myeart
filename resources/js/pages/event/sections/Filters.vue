<template>
    <section class="bg-white">
        <div class="container py-10">
            <div
                class="flex flex-wrap justify-md-between justify-center border-b border-zinc-700 pb-4"
            >
                <div class="w-full md:w-1/2">
                    <div
                        class="flex flex-col md:flex-row md:justify-start items-center md:mt-3"
                    >
                        <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                type="button"
                                text
                                @click.stop="$emit('action', 1)"
                            >
                                Destacados
                            </v-btn>
                        </div>
                        <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                type="button"
                                text
                                @click.stop="$emit('action', 2)"
                            >
                                Locales
                            </v-btn>
                        </div>
                        <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                type="button"
                                text
                                @click.stop="$emit('action', 3)"
                            >
                                Esta semana
                            </v-btn>
                        </div>
                        <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                type="button"
                                text
                                @click.stop="$emit('action', 4)"
                            >
                                Clases
                            </v-btn>
                        </div>
                        <div class="">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                type="button"
                                text
                                @click.stop="$emit('action', 5)"
                            >
                                Amigos
                            </v-btn>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/2">
                    <div class="flex justify-end">
                        <div
                            class="inline-flex items-center justify-end md:w-80"
                        >
                            <label
                                class="uppercase text-zinc-900 tracking-widest text-xs font-bold w-full text-right"
                            >
                                Ordenar por:
                            </label>
                            <v-select
                                :items="sortBy"
                                item-text="text"
                                item-value="val"
                                color="#B2794C"
                                item-color="brown darken-2"
                                class="pl-2"
                                v-model="filters.sortBy"
                            ></v-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "FiltersSection",
    props: {
        filters: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            sortBy: [
                { text: "Mas reciente", val: 1 },
                { text: "Orden alfabético", val: 2 },
            ],
        };
    },
};
</script>
