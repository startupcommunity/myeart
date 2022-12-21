<template>
    <div class="w-full h-screen bg-cover bg-no-repeat bg-woman-black bg-center flex items-center">
        <!-- loading full page -->
        <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
        <!-- /loading full page -->

        <!-- content -->
        <div class="container">
            <slot></slot>
        </div>
        <!-- /content -->
    </div>
</template>
<script>
export default {
    name: "WomanLayout",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
