<template>
    <div :class="css" class="flex items-center justify-center space-x-2">
        <div
            class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full"
            role="status"
        ></div>
    </div>
</template>
<script>
export default {
    name: "LoadingTailwind",
    props: {
        css: {
            type: String,
        },
    },
};
</script>
