<template>
    <div class="flex">
        <div class="border w-auto p-3">
            <p class="text-lg font-medium">
                <v-icon> mdi-map-marker-outline </v-icon>
                {{ addr?.direction }}
            </p>
            <p class="text-lg font-medium">
                <v-icon> mdi-map-marker-outline </v-icon>
                {{ addr?.postal_code }}
            </p>
            <p class="text-lg font-medium">
                <v-icon> mdi-map-marker-outline </v-icon>
                {{ addr?.city }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "UseDefaultAddress",
    props: {
        addr: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
