<template>
    <div class="w-full flex flex-col items-center md:items-start">
        <h3 class="text-lg font-bold text-zinc-900 text-md-left text-center">Métodos de envío</h3>
        <v-radio-group
            v-model="selected"
            mandatory
            @change="$emit('changedMethod', $event)"
        >
            <v-radio value="1" color="#B2794C">
                <template #label>
                    <span class="font-bold text-zinc-900 mt-2">
                        Acordar con el vendedor
                    </span>
                </template>
            </v-radio>
        </v-radio-group>
    </div>
</template>

<script>
export default {
    name: "UseShippingMethod",
    data() {
        return {
            selected: 1,
        };
    },
};
</script>
