<template>
    <div class="animate-swing-in-top-fwd">
        <div class="rounded-md w-full">
            <div class="relative group">
                <img
                    :src="getImage"
                    :alt="release.title"
                    class="object-cover object-center w-full h-72 group-hover:bg-opacity-50"
                />
                <div
                    class="absolute w-full h-full inset-0 hover:cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-zinc-900/60"
                >
                    <div class="flex justify-center items-center h-full">
                        <v-btn text @click.stop="editRelease">
                            <span class="text-white">
                                <i
                                    class="fa-regular fa-pen-to-square text-white"
                                ></i>
                                Editar
                            </span>
                        </v-btn>
                        <v-btn text @click.stop="deleteRelease">
                            <span class="text-white">
                                <i class="fa-regular fa-trash text-white"></i>
                                Eliminar
                            </span>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="flex justify-between pt-1 pb-3">
                <div>
                    <span
                        class="text-sm font-medium tracking-wide text-gray-500"
                    >
                        {{ release.created_at | formatTextDate }}
                    </span>
                </div>
                <div class="flex gap-3 items-center justify-end">
                    <div class="text-gray-400">
                        <span class="text-sm uppercase">{{ likes }}</span>
                        <i class="fa-regular fa-heart text-gray-400"></i>
                    </div>
                    <i class="fa-solid fa-share-nodes text-gray-400"></i>
                </div>
            </div>
        </div>

        <loading-overlay :active="false" :is-full-page="true" loader="bars" />
    </div>
</template>
<script>
export default {
    name: "CardReleaseProfile",
    props: {
        release: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    computed: {
        getImage() {
            const image = this.release?.image;

            if (!image) return this.getDefaultImageRelease;

            return `${this.pathReleaseImage + image}`;
        },

        likes() {
            return this.release?.likes?.length || 0;
        },
    },
    filters: {
        formatTextDate(value) {
            const date = new Date(value);
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            return date.toLocaleDateString("es-ES", options);
        },
    },
    methods: {
        editRelease() {
            this.$emit("edit", this.release);
        },

        deleteRelease() {
            this.$emit("delete", this.release);
        },
    },
};
</script>
