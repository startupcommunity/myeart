<template>
    <MainLayout :showHeader="false" :loading-overlay="globalLoading">
        <div class="bg-zinc-900 pb-32" v-if="!showOptionModal">
            <Header class="mt-5" />
        </div>

        <!-- title -->
        <section>
            <div class="container pt-10">
                <div class="w-full border-b border-gray-800 pb-7">
                    <h1 class="text-zinc-900 font-bold text-2xl text-center">
                        Descubre colectivos de tu interés
                    </h1>
                </div>
                <div class="flex justify-between justify-md-end items-center">
                    <div class="inline-flex items-center">
                        <label
                            class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
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
                    <div class="block md:hidden">
                        <v-btn text @click.stop="showOptionModal = true">
                            <i class="fas fa-list"></i>
                            Filtrar
                        </v-btn>
                    </div>
                </div>
            </div>
        </section>
        <!-- /title -->

        <!-- content -->
        <section class="bg-white">
            <div class="container pb-20">
                <div class="flex flex-wrap justify-start items-start">
                    <!-- filtros -->
                    <div class="w-[30%] md:pr-10 hidden md:block">
                        <!-- tipos -->
                        <div class="py-2">
                            <h3
                                class="text-primary font-bold tracking-wide uppercase text-2xl"
                            >
                                Tipo de colectivo
                            </h3>
                            <div
                                class="my-4 w-full border-t border-gray-900"
                            ></div>
                            <div>
                                <v-chip-group
                                    v-model="filters.type"
                                    column
                                    show-arrows
                                    center-active
                                    class="mx-auto my-4"
                                >
                                    <v-chip
                                        filter
                                        outlined
                                        v-for="type in getTypes"
                                        :key="type.value"
                                        :value="type.value"
                                        :color="changeColor(type.value)"
                                        class="border-o"
                                    >
                                        <span
                                            class="font-medium text-xs tracking-tighter"
                                        >
                                            {{ type.text }}
                                        </span>
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </div>
                        <!-- /tipos -->

                        <!-- categorías -->
                        <h3
                            class="text-primary font-bold tracking-wide uppercase text-2xl"
                        >
                            Categorías
                        </h3>
                        <div class="my-4 w-full border-t border-gray-900"></div>
                        <CategoryTypeFilter
                            :selected="filters"
                            :categories="categories"
                            :subCategories="subCategories"
                        />
                        <!-- categorías -->
                    </div>
                    <!-- /filtros -->

                    <!-- resultados -->
                    <div class="w-full md:w-[70%]">
                        <!-- cards - obras -->
                        <div>
                            <LoadingTailwind v-if="collectiveLoading" />
                            <div
                                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch md:gap-5"
                                v-else
                            >
                                <CardCollective
                                    v-for="col in collectives"
                                    :key="col.id"
                                    :collective="col"
                                    :follow-btn="true"
                                    class="mb-5"
                                />
                            </div>

                            <!-- paginación -->
                            <Paginator
                                class="w-full text-center my-4"
                                :counter="totalPages"
                                @load-page="loadPage"
                                v-if="collectives.length"
                            />
                            <!-- /paginación -->
                        </div>
                        <!-- /cards - obras -->
                    </div>
                    <!-- /resultados -->
                </div>
            </div>
        </section>
        <!-- /content -->

        <!-- modal de filtros para version mobile -->
        <FilterCollectiveModal
            @close-dialog="showOptionModal = !showOptionModal"
            :show="showOptionModal"
            :options="filters"
            :cats="categories"
            :subs="subCategories"
            v-if="showOptionModal"
        />
    </MainLayout>
</template>

<script>
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import Paginator from "../../components/Paginator.vue";
import getDataMixin from "../../mixins/getDataMixin";
import CategoryTypeFilter from "../artwork/components/CategoryTypeFilter.vue";
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import CardCollective from "./components/CardCollective.vue";
import FilterCollectiveModal from "./components/FilterCollectiveModal.vue";

export default {
    name: "IndexCollective",
    mixins: [getDataMixin],
    components: {
        MainLayout,
        Header,
        CategoryTypeFilter,
        LoadingTailwind,
        CardCollective,
        Paginator,
        FilterCollectiveModal,
    },

    data() {
        return {
            showOptionModal: false,
            collectiveLoading: false,
            totalRecords: 0,
            showPage: 1,
            collectives: [],
            sortBy: [
                { text: "Mas reciente", val: 1 },
                { text: "Orden alfabético", val: 2 },
            ],
            filters: {
                category: 0,
                subcategory: 0,
                label: 0,
                type: 0,
                sortBy: 0,
            },
        };
    },

    created() {
        // @getDataMixin
        this.getCategories();

        // consulta de colectivos que sigue el usuario
        this.$store.dispatch("userFollowCollectives");
    },

    mounted() {
        this.filters.sortBy = 1;
    },

    watch: {
        filters: {
            handler(_) {
                // reset de la pagina a mostrar
                this.showPage = 1;

                // @this
                this.getFilterCollectives();
            },
            deep: true,
        },
    },

    computed: {
        getTypes() {
            return this.collectiveTypes.filter((t) => t.value !== "");
        },
        showPerPage() {
            return 12;
        },
        totalPages() {
            return this.totalRecords / this.showPerPage;
        },
    },

    methods: {
        /**
         * Cambia el color según el type seleccionado
         */
        changeColor(id) {
            return this.filters.type === id ? "#B2794C" : "#a9afb9";
        },

        /**
         * Obtienes todos los colectivos filtrados o no filtrados
         */
        getFilterCollectives() {
            this.collectiveLoading = true;

            const params = {
                sortBy: this.filters.sortBy,
                type: this.filters.type,
                category: this.filters.category,
                page: this.showPage,
            };

            this.axios
                .get(this.ep.collectives.getAll, { params })
                .then((res) => {
                    if (res.status === 200) {
                        this.collectives = res.data.data;
                        this.totalRecords = res.data.total;
                    }
                })
                .catch((err) => this.manageError(err))
                .finally(() => (this.collectiveLoading = false));
        },

        /**
         * Cambia a la pagina indicada y realiza la consulta
         * al backend
         * @param {Number} page Numero de la pagina a mostrar
         */
        loadPage(page) {
            this.showPage = page;
            const top = globalThis.innerWidth < 450 ? 170 : 490;
            this.toScrollTo(null, top);
            this.getFilterCollectives();
        },
    },
};
</script>
