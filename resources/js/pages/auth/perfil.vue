<template>
    <div class="home-login">
        <div class="wrap-login p-2 ">
            <div class="row" style="margin:0px;padding:0px;">
                <div class="col-12 d-none d-lg-flex justify-content-md-end" v-if="indexForm == 0">
                    <div class="login-form-logo d-flex justify-content-center" style="width: 544px;margin-right: 12rem;" >
                        <img src="../../../../public/img/Logo_Myeart.svg" style="width: 50%;height: 180px;" alt="">
                    </div>
                </div>
                <div class="col-12 d-flex justify-content-md-end  justify-content-xs-center" style="margin:0px;padding:0px;"> 
                    <div class="container-login"  style="background: rgba(255, 255, 255, 0.05);">
                        <div class="login-form validate-form">
                            <div class="login-icon">
                                <router-link exact-active-class="active" to="/" style="color:#FFF">
                                    <i class="fas fa-arrow-left"></i>
                                </router-link>
                            </div>

                            <form-wizard
                                ref="wizard"
                                title="" 
                                subtitle=""
                                color="#B2794C"
                                stepSize="xs"
                                :hide-buttons="true"
                                @on-change="handleTabChange"
                            >
                                <tab-content icon=" ">
                                    <div class="login-form-logo" style="height:auto;">
                                        <h1>Define tu usuario <b class="text-primary">Myeart</b></h1>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <label for="">Cual es tu perfil de usuario:</label>
                                        </div>
                                        <div class="col-sm-12 col-md-6">
                                            <div class="container-login-form-btn">
                                                <button class="btn btn-secundary register-form-btn" v-on:click="tabChange1(1)">
                                                    Usuario
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-sm-12 col-md-6">
                                            <div class="container-login-form-btn">
                                                <button class="btn btn-secundary register-form-btn" v-on:click="tabChange1(2)">
                                                    Artista
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-12" style="text-align: end;">
                                            <label for="" style="border-bottom: 2px solid #FFF;" v-on:click="tabChange1(3)">Definir en otro momento</label>
                                        </div>
                                    </div>
                                </tab-content>
                                <tab-content icon=" ">
                                    <div class="login-form-logo" style="height:auto;">
                                        <h1>Completa tu perfil <b class="text-primary">Myeart</b></h1>
                                    </div>

                                    <div class="w-100 d-flex justify-content-center">
                                        <label id="myInputFile" style="border: 2px solid #B2794C;padding: 5px;border-radius: 50%;">
                                            <v-avatar size="120">
                                                <v-img
                                                    :src="srcImage"
                                                    :lazy-src="'./img/avatar.png'"
                                                    @error="'URL ON ERROR'"
                                                >
                                                    <!-- ALSO, YOU CAN USE A LOADING ANIMATION -->
                                                    <template v-slot:placeholder>  
                                                        <v-progress-circular
                                                            style="margin-top:40px"
                                                            indeterminate
                                                            color="custm_theme_6"
                                                        ></v-progress-circular> 
                                                    </template>
                                                </v-img>
                                            </v-avatar>
                                            <v-file-input accept="image/png, image/jpeg, image/bmp" style="display:none;" id="myInputFile" name="myInputFile" v-model="image" outlined dense @change="preview_image"/>
                                        </label>
                                    </div>
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date"
                                                label="Fecha de nacimiento"
                                                prepend-icon="mdi-calendar-month"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            :active-picker.sync="activePicker"
                                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            @input="menu = false"
                                        ></v-date-picker>
                                    </v-menu>
                                    <v-select
                                        v-model="select_sexo"
                                        :items="items_sexo"
                                        prepend-icon="mdi-account-outline"
                                        item-text="state"
                                        item-value="abbr"
                                        label="Select"
                                        persistent-hint
                                        return-object
                                        single-line
                                    ></v-select>
                                    <v-select
                                        v-model="select_pais"
                                        :items="items_pais"
                                        prepend-icon="mdi-flag-outline"
                                        append-icon="mdi-map-marker-outline"
                                        item-text="state"
                                        item-value="abbr"
                                        label="Select"
                                        persistent-hint
                                        return-object
                                        single-line
                                    ></v-select>
                                    <v-select
                                        v-model="selectIdioma"
                                        :items="itemsIdioma"
                                        prepend-icon="mdi-microphone-outline"
                                        item-text="state"
                                        item-value="abbr"
                                        label="Select"
                                        persistent-hint
                                        return-object
                                        single-line
                                    ></v-select>

                                    <v-btn block color="primary" v-on:click="tabChange1()">
                                        Siguiente
                                    </v-btn>
                                </tab-content>
                                <tab-content icon=" ">
                                    <div class="login-form-logo" style="height:auto;">
                                        <h1>¿Perteneces a algún grupo o colectivos de arte?</h1>
                                    </div>

                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation
                                    >
                                        <v-text-field
                                            v-model="name_arte"
                                            label="Asociación de arte"
                                            prepend-icon="mdi-palette"
                                            required
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="name_consejeria"
                                            label="Consejería o ayuntamiento"
                                            prepend-icon="mdi-home-outline"
                                            required
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="name_galeria"
                                            label="Galería de Arte"
                                            prepend-icon="mdi-image-outline"
                                            required
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="name_asociacion"
                                            label="Asociación de turismo o cultura"
                                            prepend-icon="mdi-web"
                                            required
                                        ></v-text-field>

                                        <v-btn block color="primary" v-on:click="tabChange1()">
                                            Siguiente
                                        </v-btn>
                                    </v-form>
                                </tab-content>
                                <tab-content icon=" ">
                                    <div class="login-form-logo" style="height:auto;">
                                        <h1>¿Cuál en la actividad artística que realizas?</h1>
                                    </div>
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation
                                    >
                                        <v-row>
                                            <v-col
                                                cols="12"
                                                md="6"
                                            >
                                                <v-checkbox
                                                    class="input_reverse"
                                                    label="Asociación de arte"
                                                    prepend-icon="mdi-palette"
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                            >
                                                <v-checkbox
                                                    class="input_reverse"
                                                    label="Asociación de arte"
                                                    prepend-icon="mdi-palette"
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                            >
                                                <v-checkbox
                                                    class="input_reverse"
                                                    label="Asociación de arte"
                                                    prepend-icon="mdi-palette"
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                            >
                                                <v-checkbox
                                                    class="input_reverse"
                                                    label="Asociación de arte"
                                                    prepend-icon="mdi-palette"
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                            >
                                                <v-checkbox
                                                    class="input_reverse"
                                                    label="Asociación de arte"
                                                    prepend-icon="mdi-palette"
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                            >
                                                <v-checkbox
                                                    class="input_reverse"
                                                    label="Asociación de arte"
                                                    prepend-icon="mdi-palette"
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <v-btn block color="primary" v-on:click="tabChange1()">
                                            Siguiente
                                        </v-btn>
                                    </v-form>
                                </tab-content>
                            </form-wizard>
                        </div>
                        
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //data
    function data(){
        return {
            valid: true,
            indexForm: 0,
            //tab 1
            image: null,
            srcImage: './img/avatar.png',
            activePicker: null,
            date: null,
            menu: false,
            select_sexo: { state: 'Seleccione opción', abbr: '' },
            items_sexo: [
                { state: 'Seleccione sexo', abbr: '' },
                { state: 'Venezuela', abbr: 'GA' },
                { state: 'EEUU', abbr: 'EEUU' },
            ],

            select_pais: { state: 'Seleccione opción', abbr: '' },
            items_pais: [
                { state: 'Seleccione país', abbr: '' },
                { state: 'Venezuela', abbr: 'GA' },
                { state: 'EEUU', abbr: 'EEUU' },
            ],

            selectIdioma: { state: 'Seleccione opción', abbr: '' },
            itemsIdioma: [
                { state: 'Seleccione idioma', abbr: '' },
                { state: 'Español', abbr: 'es' },
                { state: 'Ingles', abbr: 'en' },
            ],

            //tab 2
            name_arte: '',
            name_consejeria: '',
            name_galeria: '',
            name_asociacion: '',
        }
    }
    //methods
    function tabChange1(value){
        if(this.$refs.wizard){
            this.$refs.wizard.nextTab();
        }
    }
    function preview_image() {
      this.srcImage= URL.createObjectURL(this.image)
    }
    async function handleTabChange(preview,next){
        this.indexForm = next;
        if(this.indexForm === 1){

        }
    }
    export default {
        name:'perfil',
        data,
        methods:{
            tabChange1,
            preview_image,
            handleTabChange
        },
    }
</script>

<style lang="scss">
    .vue-form-wizard.xs .wizard-navigation .wizard-progress-with-circle {
        position: relative;
        top: 15px;
        height: 4px;
        background: #373737;
    }
    .vue-form-wizard.xs .wizard-icon-circle {
        width: 20px;
        height: 20px;
        font-size: 16px;
    }
    .vue-form-wizard.xs .wizard-icon-circle {
        width: 20px;
        height: 20px;
        font-size: 16px;
        background: rgb(178, 121, 76);
        border-color:rgb(178, 121, 76);
    }
    /*.vue-form-wizard .wizard-nav-pills {
        top: 20rem;
    }
    .vue-form-wizard.xs .wizard-navigation .wizard-progress-with-circle {
        top: 21rem;
    }*/
    .wizard-card-footer{ position: fixed; bottom: 12px; /* set whatever bottom margin you want */ width: 100%;}
    .vue-form-wizard .wizard-header {
        display: none;
    }
    .vue-form-wizard .wizard-tab-content {
        padding: 0px;
        padding-top: 20px;
        //padding-bottom: 40px;
    } 
    @media (max-width: 576px) {
        /*.vue-form-wizard .wizard-nav-pills {
            top: 21rem;
        }
        .vue-form-wizard.xs .wizard-navigation .wizard-progress-with-circle {
            top: 22rem;
        }*/
    }
    .input_reverse{
        .v-input__slot{
            flex-direction: row-reverse!important;
        }
    }   
    
</style>