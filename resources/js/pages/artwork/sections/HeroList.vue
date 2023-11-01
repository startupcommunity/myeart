<template>
    <div
        class="relative w-full h-80 sm:h-[28rem] bg-no-repeat bg-cover bg-center"
        :class="'bg-categories-pintura'"
    >
        <div class="absolute w-full h-full flex justify-center items-center">
            <h1
                class="font-black tracking-[0.3rem] text-white text-2xl sm:text-4xl uppercase text-center"
            >
                {{
                    objCategory ? objCategory.name : keyword ? keyword : "Obra"
                }}
            </h1>
        </div>
        <!-- <div
                class="absolute top-0 bottom-auto pb-24 md:pb-20 lg:pb-24 inset-x-0 bg-gray-900 bg-opacity-40"
            ></div> -->
    </div>
</template>
<script>
export default {
    name: "HeroList",
    props: {
        category: {
            type: Number,
            default: 0,
            description: "la categoría seleccionada",
        },
        keyword: {
            type: String,
            default: "",
            description: "la palabra clave para la búsqueda",
        },
        categories: {
            type: Array,
            default: [],
            description: "el arreglo de todas las categorías disponibles",
        },
    },
    computed: {
        objCategory() {
            if (!this.category) return null;
            return this.categories.find((cat) => cat.id === this.category);
        },
    },
};
</script>
