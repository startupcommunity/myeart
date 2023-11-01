<template>
    <div class="flex flex-col space-y-8 md:pr-5">
        <v-text-field color="#B2794C" v-model="form.address">
            <template #label>
                <span class="font-medium"> Dirección </span>
            </template>
        </v-text-field>
        <v-text-field color="#B2794C" v-model="form.postal_code">
            <template #label>
                <span class="font-medium"> Código postal </span>
            </template>
        </v-text-field>
        <v-text-field color="#B2794C" v-model="form.city">
            <template #label>
                <span class="font-medium"> Provincia </span>
            </template>
        </v-text-field>
    </div>
</template>

<script>
export default {
    name: "UseFormAddress",
    props: {
        form: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
