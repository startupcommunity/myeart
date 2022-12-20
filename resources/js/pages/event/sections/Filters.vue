<template>
    <section class="bg-white">
        <div class="container py-md-10 -mt-5 -mt-md-0">
            <div
                class="flex flex-wrap justify-md-between justify-center border-b border-zinc-700 pb-1 pb-md-4"
            >
                <div class="w-full md:w-1/2 hidden md:block">
                    <div
                        class="flex flex-col md:flex-row md:justify-start items-center mt-md-3"
                    >
                        <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                :class="{
                                    'font-bold': isActiveFeatured,
                                    'font-normal': !isActiveFeatured,
                                }"
                                type="button"
                                text
                                @click.stop="$emit('action', 1)"
                            >
                                Destacados
                            </v-btn>
                        </div>
                        <!-- <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                type="button"
                                text
                                @click.stop="$emit('action', 2)"
                            >
                                Locales
                            </v-btn>
                        </div> -->
                        <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                :class="{
                                    'font-bold': isActiveThisWeek,
                                    'font-normal': !isActiveThisWeek,
                                }"
                                type="button"
                                text
                                @click.stop="$emit('action', 3)"
                            >
                                Esta semana
                            </v-btn>
                        </div>
                        <!-- <div class="md:border-r border-zinc-900">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                type="button"
                                text
                                @click.stop="$emit('action', 4)"
                            >
                                Clases
                            </v-btn>
                        </div> -->
                        <div class="">
                            <v-btn
                                class="uppercase tracking-widest hover:no-underline"
                                :class="{
                                    'font-bold': isActiveFriends,
                                    'font-normal': !isActiveFriends,
                                }"
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
                    <div
                        class="flex justify-center justify-md-end pr-6 pr-md-0"
                    >
                        <div
                            class="inline-flex items-center justify-center justify-md-end md:w-80"
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
const ACTIONS = {
    featured: 1,
    local: 2,
    thisWeek: 3,
    classes: 4,
    friends: 5,
};

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

    computed: {
        isActiveFeatured() {
            return this.filters.action === ACTIONS.featured;
        },
        isActiveLocal() {
            return this.filters.action === ACTIONS.local;
        },
        isActiveThisWeek() {
            return this.filters.action === ACTIONS.thisWeek;
        },
        isActiveClasses() {
            return this.filters.action === ACTIONS.classes;
        },
        isActiveFriends() {
            return this.filters.action === ACTIONS.friends;
        },
    },
};
</script>
