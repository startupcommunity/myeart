<template>
    <button
        @click.stop="$router.go(-1)"
        text
        class="flex items-center text-zinc-800 hover:text-zinc-900 rounded"
    >
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        Atrás
    </button>
</template>
<script>
export default {
    name: "BackButton",
};
</script>
