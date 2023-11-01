<template>
    <div>
        <v-pagination
            v-model="page"
            :length="Math.ceil(counter)"
            :total-visible="totalVisible"
            color="#B2794C"
            @input="$emit('load-page', $event)"
        ></v-pagination>
    </div>
</template>
<script>
export default {
    name: "Paginator",
    props: {
        totalVisible: {
            type: Number,
            default: 7,
        },
        counter: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            page: 1,
        };
    },
};
</script>
