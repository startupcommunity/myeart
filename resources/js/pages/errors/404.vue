<template>
    <ErrorLayout :code="404" message="Lo que buscas no ha sido encontrado 💆‍♂️" />
</template>
<script>
import ErrorLayout from "../layouts/ErrorLayout.vue";

export default {
    components: { ErrorLayout },
    name: "NotFound",
};
</script>
