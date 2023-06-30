<template>
    <button @click="share">
        <i class="fa-solid fa-share-nodes text-gray-500 text-base"></i>
    </button>
</template>
<script>
import utilMixin from "../../../mixins/utilMixin";
export default {
    name: "ShareButtonRelease",
    mixins: [utilMixin],
    props: {
        release: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        share() {
            const path = this.secureUrl;
            const slug = this.release?.slug ?? "";
            const route = `/publicaciones/slug/${slug}`;
            const text = path + route;
            this.copyToClipboard(text);
        },
    },
};
</script>
