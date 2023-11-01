<template>
    <button @click="share">
        <i class="fa-solid fa-share-nodes text-gray-400"></i>
    </button>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "ButtonShareEvent",
    mixins: [utilMixin],
    props: {
        event: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        share() {
            const path = this.secureUrl;
            const slug = this.event?.slug ?? "";
            const route = `/eventos/public/${slug}`;
            const text = path + route;
            this.copyToClipboard(text);
        },
    },
};
</script>
