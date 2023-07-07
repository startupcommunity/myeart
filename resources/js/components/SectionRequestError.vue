<template>
    <div class="alert alert-danger mt-3" role="alert" v-if="hasErrors">
        <div v-text="authErrors.get('username')"></div>
        <div v-text="authErrors.get('name')"></div>
        <div v-text="authErrors.get('email')"></div>
        <div v-text="authErrors.get('pais_id')"></div>
        <div v-text="authErrors.get('password')"></div>
    </div>
</template>

<script>
export default {
    name: "SectionRequestError",

    props: {
        authErrors: {
            type: Object,
            default: () => {},
            description: "Los errores de validación",
        },
    },

    computed: {
        hasErrors() {
            return (
                this.authErrors.has("username") ||
                this.authErrors.has("name") ||
                this.authErrors.has("email") ||
                this.authErrors.has("pais_id") ||
                this.authErrors.has("password")
            );
        },
    },
};
</script>
