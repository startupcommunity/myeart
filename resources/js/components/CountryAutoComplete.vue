<template>
    <v-autocomplete
        v-model="localModelID"
        :items="countries"
        auto-select-first
        clearable
        :name="name"
        :label="label"
        item-text="nombre"
        item-value="id"
        :color="textColor"
        item-color="brown darken-2"
        :disabled="!isEditable"
        :prepend-icon="icon"
        @change="emitValue"
        :dark="isDarkMode"
    >
        <template v-slot:selection="data">
            <div class="pt-3">
                <v-avatar left :size="sizeImg">
                    <v-img :src="getAbbrImage(data.item.abbr)"></v-img>
                </v-avatar>
                {{ data.item.nombre }}
            </div>
        </template>
        <template v-slot:item="data">
            <v-list-item-avatar :size="sizeImg">
                <img :src="getAbbrImage(data.item.abbr)" />
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title
                    v-html="data.item.nombre"
                ></v-list-item-title>
            </v-list-item-content>
        </template>
    </v-autocomplete>
</template>

<script>
export default {
    name: "CountryAutoComplete",

    props: {
        isEditable: {
            type: Boolean,
            default: false,
            description: "Si se puede editar o no",
        },

        modelID: {
            type: Number | String,
            default: null,
            description: "El id del país",
        },

        name: {
            type: String,
            default: null,
            description: "El nombre del campo",
        },

        label: {
            type: String,
            default: null,
            description: "El label del campo",
        },

        countries: {
            type: Array,
            default: () => [],
            description: "Los países",
        },

        textColor: {
            type: String,
            default: "#B2794C",
            description: "El color del texto",
        },

        icon: {
            type: String,
            default: "",
            description: "El icono del campo",
        },

        isDarkMode: {
            type: Boolean,
            default: false,
            description: "Si esta en modo oscuro o no",
        },

        sizeImg: {
            type: Number,
            default: 30,
            description: "El tamaño de la imagen",
        },
    },

    data() {
        return {
            localModelID: "",
        };
    },

    mounted() {
        this.localModelID = this.modelID;
    },

    methods: {
        /**
         * cargar imagenes de las banderas
         */
        getAbbrImage(abbr) {
            const appUrl = this.secureUrl;
            const flagsUrl = appUrl + "/img/country_flags/" + abbr + ".png";
            return flagsUrl ? flagsUrl : null;
        },

        emitValue() {
            this.$emit("change-value", this.localModelID);
        },
    },
};
</script>