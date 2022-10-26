/**
 * Gestión de métodos y propiedades comunes de obras
 * usadas tanto en la creación como en la actualización de obras
 */

export default {
    methods: {
        /**
         * Agrega una nuevo objeto de categorías
         */
        addNewCategory() {
            const data = {
                category_id: "",
                sub_category_id: "",
                sub_sub_category_id: [],
            };

            this.form.categories.push(data);
        },

        /**
         * Elimina un objecto del array de categorías
         */
        deleteCategory(index) {
            this.form.categories.splice(index, 1);
        },
    },
};
