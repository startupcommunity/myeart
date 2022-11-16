<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 sm:min-h-[43rem] animate-fade-in-down"
        id="personal"
        v-show="showSection"
    >
        <div class="flex justify-center items-center">
            <div class="w-2/4 sm:w-4/5 py-0 sm:py-8">
                <h3
                    class="font-extrabold text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
                >
                    Datos personales
                </h3>
                <div
                    class="mt-6 border-t border-gray-900 w-100 hidden sm:block"
                ></div>
            </div>
            <!-- only escritorio -->
            <div class="w-2/4 sm:w-auto ml-0 sm:ml-8 hidden sm:block">
                <v-btn
                    class="text-primary"
                    depressed
                    text
                    @click="$emit('editDataProfilePersonal')"
                >
                    <i class="fa-solid fa-pen"></i> Editar perfil
                </v-btn>
            </div>

            <!-- only mobile -->
            <div class="w-2/4 sm:w-auto ml-0 sm:ml-8 block sm:hidden">
                <v-btn
                    class="text-primary py-4"
                    outlined
                    :loading="loadingFormProfile"
                    :disabled="loadingFormProfile || !editDataProfile"
                    @click.prevent="updateUser()"
                    x-small
                    block
                >
                    <i class="fa-solid fa-save"></i>
                    Actualizar datos
                </v-btn>
            </div>
        </div>
        <div class="py-10 sm:px-5">
            <v-form @submit.prevent="updateUser()">
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="userProfile.name"
                            name="fullname"
                            label="Nombre y Apellidos"
                            color="#B2794C"
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
                                    color="#B2794C"
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
                            color="#B2794C"
                            item-color="brown darken-2"
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
                            color="#B2794C"
                            item-color="brown darken-2"
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
                            color="#B2794C"
                            item-color="brown darken-2"
                            :disabled="!editDataProfile"
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <h3
                            class="font-extrabold text-xl sm:text-lg md:text-xl tracking-tight uppercase text-gray-900"
                        >
                            Biografía
                        </h3>
                        <v-text-field
                            v-model="userProfile.profile.bio_title"
                            name="bio_title"
                            label="Coloca una frase que te identifique como artista"
                            color="#B2794C"
                            :disabled="!editDataProfile"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            v-model="userProfile.profile.bio_content"
                            label="Cuéntanos tu historia..."
                            name="bio_content"
                            color="#B2794C"
                            :disabled="!editDataProfile"
                        ></v-textarea>
                    </v-col>

                    <v-col cols="12">
                        <h3
                            class="font-extrabold text-xl sm:text-lg md:text-xl tracking-tight uppercase text-gray-900"
                        >
                            Redes sociales
                        </h3>
                        <v-text-field
                            v-model="userProfile.profile.web_url"
                            name="web_url"
                            label="Página web"
                            color="#B2794C"
                            placeholder="ejemplo: https://www.tupagina.com"
                            :disabled="!editDataProfile"
                        ></v-text-field>
                        <div class="flex flex-wrap items-center">
                            <div class="w-full md:w-1/2">
                                <span
                                    class="text-base font-medium text-zinc-500"
                                >
                                    {{ SOCIALNETWORK.FB }}
                                </span>
                            </div>
                            <div class="w-full md:w-1/2">
                                <v-text-field
                                    v-model="
                                        userProfile.social_network.facebook
                                    "
                                    name="facebook"
                                    label="Usuario Facebook"
                                    color="#B2794C"
                                    placeholder="ejemplo: MyEart123"
                                    :disabled="!editDataProfile"
                                ></v-text-field>
                            </div>

                            <div class="w-full md:w-1/2">
                                <span
                                    class="text-base font-medium text-zinc-500"
                                >
                                    {{ SOCIALNETWORK.IG }}
                                </span>
                            </div>
                            <div class="w-full md:w-1/2">
                                <v-text-field
                                    v-model="
                                        userProfile.social_network.instagram
                                    "
                                    name="instagram"
                                    label="Usuario Instagram"
                                    color="#B2794C"
                                    placeholder="ejemplo: MyEart123"
                                    :disabled="!editDataProfile"
                                ></v-text-field>
                            </div>

                            <div class="w-full md:w-1/2">
                                <span
                                    class="text-base font-medium text-zinc-500"
                                >
                                    {{ SOCIALNETWORK.BH }}
                                </span>
                            </div>
                            <div class="w-full md:w-1/2">
                                <v-text-field
                                    v-model="userProfile.social_network.behance"
                                    name="behance"
                                    label="Usuario Behance"
                                    color="#B2794C"
                                    placeholder="ejemplo: MyEart123"
                                    :disabled="!editDataProfile"
                                ></v-text-field>
                            </div>

                            <div class="w-full md:w-1/2">
                                <span
                                    class="text-base font-medium text-zinc-500"
                                >
                                    {{ SOCIALNETWORK.LK }}
                                </span>
                            </div>
                            <div class="w-full md:w-1/2">
                                <v-text-field
                                    v-model="
                                        userProfile.social_network.linkedin
                                    "
                                    name="linkedin"
                                    label="Usuario Linkedin"
                                    color="#B2794C"
                                    placeholder="ejemplo: MyEart123"
                                    :disabled="!editDataProfile"
                                ></v-text-field>
                            </div>
                        </div>
                    </v-col>

                    <!-- botón -->
                    <v-col
                        cols="12"
                        v-if="editDataProfile"
                        class="hidden sm:block"
                    >
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

    methods: {
        /**
         * Actualizar los datos del usuario
         */
        updateUser() {
            this.loadingFormProfile = true;

            const data = this.loadData();

            // request
            this.axios
                .post(this.ep.user.editProfile, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.notySwal({
                            title: "Éxito",
                            text: "Tus datos fueron actualizados satisfactoriamente",
                        });

                        // reload user
                        this.$store.dispatch("userRequest");
                    }
                })
                .catch((error) => this.showRequestErrors(error))
                .finally(() => (this.loadingFormProfile = false));
        },

        /**
         * Data a guardar
         */
        loadData() {
            const p = this.userProfile.profile;
            const social = this.userProfile.social_network;
            return {
                _method: "put",
                name: this.userProfile.name,
                sexo: p.sexo ? p.sexo.abbr : null,
                lang: p.lang ? p.lang.abbr : null,
                pais_id: p.pais_id ? p.pais_id : null,
                fecha_nacimiento: p.fecha_nacimiento
                    ? p.fecha_nacimiento
                    : null,

                // bio
                bio_title: p.bio_title ? p.bio_title : null,
                bio_content: p.bio_content ? p.bio_content : null,

                // social
                web_url: p.web_url ? p.web_url : null,
                facebook: social.facebook ? social.facebook : null,
                instagram: social.instagram ? social.instagram : null,
                behance: social.behance ? social.behance : null,
                linkedin: social.linkedin ? social.linkedin : null,
            };
        },
    },
};
</script>
