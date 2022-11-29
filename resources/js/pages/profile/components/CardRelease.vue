<template>
    <div class="animate-swing-in-top-fwd">
        <div class="rounded-md w-full relative">
            <img
                :src="getPathGallery"
                :alt="release.title"
                class="object-cover object-center w-full h-72"
            />
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
                        <span class="text-sm uppercase">{{ likeCounter }}</span>
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
        getPathGallery() {
            // const image = this.release?.image?.path;

            // if (!image) return this.getDefaultImageRelease;

            // return `${this.pathReleaseImage + image}`;

            return this.release?.image;
        },

        likeCounter() {
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
    methods: {},
};
</script>
