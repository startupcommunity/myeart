<template>
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
</template>
<script>
//computed 
function showByElement() {
    switch( this.element ){
        case 'table':
            return 'loading-icon';
        case 'select':
            return 'loading-select';
        default: 
            return 'loading-icon';
    }
}
export default {
    name: 'loading',
    props:{
        element:{
            type: String,
            default: 'table'
        }
    },
    computed:{
        showByElement,
    }

};
</script>
