<template>
    <section class="bg-white">
        <div class="py-10 container">
            <div
                class="flex justify-center items-center md:gap-16 border-b border-zinc-700 pb-5"
            >
                <div class="md:border-r border-gray-900 h-full md:pr-16">
                    <button class="hover:animate-bg-gray-light rounded-md p-2">
                        <span
                            class="text-zinc-900 font-medium tracking-widest uppercase text-base"
                        >
                            <i class="fas fa-user text-zinc-900">
                                Publicaciones de amigos
                            </i>
                        </span>
                    </button>
                </div>
                <div class="md:border-r border-gray-900 h-full md:pr-16">
                    <button class="hover:animate-bg-gray-light rounded-md p-2">
                        <span
                            class="text-zinc-400 font-medium tracking-wide uppercase text-base"
                        >
                            <i class="fa-solid fa-bars-staggered text-zinc-400">
                                Blog
                            </i>
                        </span>
                    </button>
                </div>
                <div>
                    <div class="flex flex-wrap items-center">
                        <div class="w-auto">
                            <span
                                class="text-zinc-900 font-medium tracking-wide uppercase text-base"
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
                            class="pl-2 uppercase w-52"
                            v-model="filters.sortBy"
                        ></v-select>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "Filters",
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
                this.$emit("filters", this.filters);
            },
            deep: true,
        },
    },
};
</script>
