<template>
    <ErrorLayout :code="500" message="Error interno en el servidor 💆‍♂️" />
</template>
<script>
import ErrorLayout from "../layouts/ErrorLayout.vue";

export default {
    components: { ErrorLayout },
    name: "ServerError",
};
</script>
