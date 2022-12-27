<template>
    <div>
        <v-row justify="center">
            <v-dialog
                v-model="show"
                persistent
                width="1200"
                content-class=""
                scrollable
            >
                <v-card class="bg-white">
                    <v-card-title class="hidden sm:block">
                        <div
                            class="flex justify-between border-b border-gray-800 pb-3"
                        >
                            <h1 class="text-2xl font-medium">
                                Colectivos al cual pertenezco
                            </h1>
                            <button type="button" @click="$emit('close-modal')">
                                <i class="fa fa-times text-primary"></i>
                            </button>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <LoadingTailwind v-if="globalLoading" />
                            <div
                                v-else
                                class="grid grid-cols-1 md:grid-cols-3 content-center gap-5"
                            >
                                <CardCollective
                                    v-for="collective in collectives"
                                    :key="collective.id"
                                    :collective="collective"
                                    class="mb-5"
                                />
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions class="bg-white">
                        <div class="flex justify-center py-5 py-md-8">
                            <v-btn
                                class="text-white"
                                :disabled="globalLoading"
                                @click="$emit('close-modal')"
                                color="#B2794C"
                            >
                                continuar
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardCollective from "../../collective/components/CardCollective.vue";

export default {
    name: "MyCollectivesModal",
    components: { LoadingTailwind, CardCollective },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            collectives: [],
        };
    },
    watch: {
        show(val) {
            if (val) {
                this.getCollectives();
            }
        },
    },
    methods: {
        getCollectives() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.collectives.getUserCollectives)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.collectives = resp.data;

                        console.log(this.collectives);
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
