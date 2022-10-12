<template>
    <div
        class="w-full sm:w-3/5 bg-white px-12 pb-8 sm:py-20 h-full sm:h-screen animate-fade-in-down"
        id="personal-data"
        v-show="showSection"
    >
        <div class="flex justify-center items-center">
            <div class="w-full sm:w-4/5 py-0 sm:py-8">
                <p
                    class="font-extrabold text-3xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
                >
                    Datos personales
                </p>
                <div
                    class="pt-6 border-t-2 border-gray-900 w-100 hidden sm:block"
                ></div>
            </div>
            <div class="sm:ml-8 hidden sm:block">
                <v-btn
                    class="text-primary"
                    depressed
                    text
                    @click="$emit('editDataProfilePersonal')"
                >
                    <i class="fa-solid fa-pen"></i> Editar perfil
                </v-btn>
            </div>
        </div>
        <div>
            <v-form @submit.prevent="updateUser()">
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="userProfile.name"
                            name="fullname"
                            label="Nombre y Apellidos"
                            :disabled="!editDataProfile"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-menu
                            ref="menu"
                            v-model="menuPickerOne"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="
                                        userProfile.profile.fecha_nacimiento
                                    "
                                    name="fecha_nac"
                                    label="Fecha de nacimiento"
                                    :disabled="!editDataProfile"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="userProfile.profile.fecha_nacimiento"
                                no-title
                                @input="menuPickerOne = false"
                                :max="dateMaxPicker"
                                :disabled="!editDataProfile"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            name="sexo"
                            v-model="userProfile.profile.sexo"
                            :items="listGenre()"
                            item-text="state"
                            item-value="abbr"
                            label="Sexo"
                            return-object
                            :disabled="!editDataProfile"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-autocomplete
                            v-model="userProfile.profile.pais_id"
                            :items="countries.data"
                            auto-select-first
                            clearable
                            name="pais_id"
                            label="País"
                            item-text="nombre"
                            item-value="id"
                            :disabled="!editDataProfile"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="userProfile.profile.lang"
                            :items="listLang()"
                            item-text="state"
                            item-value="abbr"
                            label="Idioma"
                            return-object
                            name="lang"
                            :disabled="!editDataProfile"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" v-if="editDataProfile">
                        <v-btn
                            class="text-primary"
                            outlined
                            :loading="loadingFormProfile"
                            :disabled="loadingFormProfile"
                            type="submit"
                        >
                            <i class="fa-solid fa-save"></i>
                            Actualizar datos
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

// mixin
import utilMixin from "../../../mixins/utilMixin";
import getDataMixin from "../../../mixins/getDataMixin";
import requestErrorsMixin from "../../../mixins/requestErrorsMixin";

export default {
    name: "PersonalData",
    mixins: [utilMixin, getDataMixin, requestErrorsMixin],
    props: {
        editDataProfile: {
            type: Boolean,
        },
        showSection: {
            type: Boolean,
        },
    },
    data() {
        return {
            menuPickerOne: false,
            loadingFormProfile: false,
        };
    },
    methods: {
        /**
         * Actualizar los datos del usuario
         */
        updateUser() {
            this.loadingFormProfile = true;

            // datos
            const profile = this.userProfile.profile;
            const data = {
                _method: "put",
                name: this.userProfile.name,
                sexo: profile.sexo ? profile.sexo.abbr : null,
                lang: profile.lang ? profile.lang.abbr : null,
                pais_id: profile.pais_id ? profile.pais_id : null,
                fecha_nacimiento: profile.fecha_nacimiento
                    ? profile.fecha_nacimiento
                    : null,
            };

            // request
            this.axios
                .post("/api/profile/update-profile", data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$notify({
                            group: "container",
                            text: resp.data.message,
                            type: "success",
                        });

                        // reload user
                        this.$store.dispatch("userRequest");
                    }
                })
                .catch((error) => {
                    this.showRequestErrors(error);
                })
                .finally(() => (this.loadingFormProfile = false));
        },
    },

    computed: {
        /**
         * Acceder a los getters necesarios
         */
        ...mapGetters({
            userProfile: "getProfile",
        }),
    },

    watch: {
        showSection(val) {
            if (val) {
                this.getCountries();
            }
        },
    },
};
</script>
