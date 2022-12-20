<template>
    <v-btn
        color="#B2794C"
        class="uppercase tracking-widest text-white hover:no-underline"
        x-large
        type="button"
        :to="{ name: 'eventCreate' }"
    >
        <i class="fas fa-plus pr-2"></i>
        Crear un evento
    </v-btn>
</template>
<script>
export default {
    name: "ButtonCreateEvent",
};
</script>
