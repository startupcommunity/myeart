<template>
    <div class="relative group">
        <img
            :src="getImage"
            :alt="release.title"
            class="object-cover object-center w-full h-72 group-hover:bg-opacity-50"
        />
        <div
            class="absolute w-full h-full inset-0 hover:cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-zinc-900/60"
            v-if="showActions"
        >
            <div class="flex justify-center items-center h-full">
                <v-btn text @click.stop="editRelease">
                    <span class="text-white">
                        <i class="fa-regular fa-pen-to-square text-white"></i>
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
</template>

<script>
export default {
    name: "ImageActionRelease",
    props: {
        release: {
            type: Object,
            required: true,
        },
        showActions: {
            type: Boolean,
            default: false,
        },
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
