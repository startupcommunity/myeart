<template>
    <button @click.stop="openModalComment">
        <i class="fa-regular fa-comment text-gray-500 text-base"></i>
    </button>
</template>

<script>
export default {
    name: "CommentButton",
    methods: {
        openModalComment() {
            this.$emit("open-modal-comment");
        },
    },
};
</script>
