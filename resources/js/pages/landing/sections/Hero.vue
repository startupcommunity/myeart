<template>
    <div class="h-[30rem] sm:h-[48rem] z-[1] hero-area hero-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 offset-lg-2 text-center">
                    <div class="hero-text">
                        <div class="hero-text-tablecell">
                            <h1 class="text-white lg:text-2xl">
                                El
                                <span class="text-primary">arte</span> que todos
                                llevamos dentro
                            </h1>
                            <div
                                class="hero-btns d-flex justify-content-center"
                            >
                                <v-form @submit.prevent="search" class="w-full flex justify-center">
                                    <div class="input-group w-4/5">
                                        <input
                                            type="text"
                                            class="form-control h-12"
                                            v-model="searchText"
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="btn btn-primary px-5 h-12"
                                            >
                                                <i class="fas fa-search"></i>
                                                Buscar
                                            </button>
                                            <!-- <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">
                                                Action
                                            </a>
                                        </div> -->
                                        </div>
                                        <div
                                            class="ml-2 spinner-border animate-spin inline-block w-12 h-12 border-2 rounded-full text-white"
                                            v-if="loading"
                                        ></div>
                                    </div>
                                </v-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Hero",
    data() {
        return {
            searchText: "",
            loading: false,
        };
    },
    methods: {
        /**
         * Buscar obras por el texto indicado
         */
        search() {
            this.loading = true;

            // enviar a la vista de obras
            this.$router.push({
                name: "listArtwork",
                query: {
                    keyword: this.searchText,
                },
            });

            // cuando se cargue el otro componente detener el loading
            this.$nextTick(() => {
                this.loading = false;
            });
        },
    },
};
</script>
