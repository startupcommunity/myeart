<template>
    <div class="home-login">
        <loading-overlay :active="apiStateFormLoading" :is-full-page="true" loader="bars"/>
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
                            <div v-if="!completed">
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
                                        <div class="login-icon">
                                            <router-link exact-active-class="active" to="/" style="color:#FFF">
                                                <i class="fas fa-arrow-left"></i>
                                            </router-link>
                                        </div>

                                        <div class="login-form-logo" style="height:auto;">
                                            <h1>Define tu usuario <b class="text-primary">Myeart</b></h1>
                                        </div>

                                        <div class="row">
                                            <div class="col-12">
                                                <label for="">Cual es tu perfil de usuario:</label>
                                            </div>
                                            <div class="col-sm-12 col-md-6">
                                                <div class="container-login-form-btn">
                                                    <button class="btn btn-secundary register-form-btn" v-on:click="tabChange(1)">
                                                        Usuario
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-6">
                                                <div class="container-login-form-btn">
                                                    <button class="btn btn-secundary register-form-btn" v-on:click="tabChange(2)">
                                                        Artista
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-12" style="text-align: end;">
                                                <label for="" style="border-bottom: 2px solid #FFF;cursor:pointer;" v-on:click="$router.push('/dashboard')">Definir en otro momento</label>
                                            </div>
                                        </div>
                                    </tab-content>
                                    <tab-content icon=" ">
                                        <div class="login-icon">
                                            <div v-on:click="beforeChanged()" style="color:#FFF;cursor:pointer;">
                                                <i class="fas fa-arrow-left"></i>
                                            </div>
                                        </div>

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
                                                    v-model="dateFormatted"
                                                    label="Fecha de nacimiento"
                                                    prepend-icon="mdi-calendar-month"
                                                    readonly
                                                    @blur="date = parseDate(dateFormatted)"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date"
                                                no-title
                                                @input="menu1 = false"
                                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                            ></v-date-picker>
                                        </v-menu>
                                        <v-select
                                            v-model="select_sexo"
                                            :items="listSexo"
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
                                            :items="listPaises"
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
                                            v-model="select_idioma"
                                            :items="listIdioma"
                                            prepend-icon="mdi-microphone-outline"
                                            item-text="state"
                                            item-value="abbr"
                                            label="Select"
                                            persistent-hint
                                            return-object
                                            single-line
                                        ></v-select>

                                        <v-btn block color="primary" v-on:click="tabChange()">
                                            Siguiente
                                        </v-btn>
                                        <br />
                                        <v-btn block color="dark" v-on:click="tabChange()">
                                            Omitir paso
                                        </v-btn>
                                    </tab-content>
                                    <tab-content icon=" ">
                                        <div class="login-icon">
                                            <div v-on:click="beforeChanged()" style="color:#FFF;cursor:pointer;">
                                                <i class="fas fa-arrow-left"></i>
                                            </div>
                                        </div>

                                        <div class="login-form-logo" style="height:auto;">
                                            <h1>¿Perteneces a algún grupo o colectivos de arte?</h1>
                                        </div>

                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation
                                        >
                                            <v-text-field
                                                v-model="asociacion_arte"
                                                label="Asociación de arte"
                                                prepend-icon="mdi-palette"
                                                required
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="consejeria_ayuntamiento"
                                                label="Consejería o ayuntamiento"
                                                prepend-icon="mdi-home-outline"
                                                required
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="galeria"
                                                label="Galería de Arte"
                                                prepend-icon="mdi-image-outline"
                                                required
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="asociacion_turismo"
                                                label="Asociación de turismo o cultura"
                                                prepend-icon="mdi-web"
                                                required
                                            ></v-text-field>

                                            <v-btn block color="primary" v-on:click="perfil == 2 ? tabChange() : (completed = true)">
                                                Siguiente
                                            </v-btn>
                                            <br />
                                            <v-btn block color="dark" v-on:click="perfil == 2 ? tabChange() : (completed = true)">
                                                Omitir paso
                                            </v-btn>
                                        </v-form>
                                    </tab-content>
                                    <tab-content icon=" " v-if="perfil == 2">
                                        <div class="login-icon">
                                            <div v-on:click="beforeChanged()" style="color:#FFF;cursor:pointer;">
                                                <i class="fas fa-arrow-left"></i>
                                            </div>
                                        </div>

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
                                                    v-for="item in listArtistic"   
                                                    :key="item.id"
                                                >
                                                    <v-checkbox
                                                        class="input_reverse"
                                                        :prepend-icon="'mdi-'+item.icon"
                                                        v-model="artistic_selected"              
                                                        :label="item.nombre"  
                                                        :value="item.id" 
                                                    ></v-checkbox>
                                                </v-col>
                                            </v-row>
                                            <br />
                                            <v-btn block color="primary" v-on:click="completed = true">
                                                Siguiente
                                            </v-btn>
                                            <br />
                                            <v-btn block color="dark" v-on:click="completed = true" >
                                                Omitir paso
                                            </v-btn>
                                        </v-form>
                                    </tab-content>
                                </form-wizard>
                            </div>
                            <div v-else>
                                <div class="login-icon">
                                    <div v-on:click="completed = false" style="color:#FFF;cursor:pointer;">
                                        <i class="fas fa-arrow-left"></i>
                                    </div>
                                </div>
                                <div class="login-form-logo" style="height:auto;">
                                    <h1>Bienvenido a <b class="text-primary">Myeart</b></h1>
                                </div>
                                <div class="login-form-logo" style="height:auto;">
                                    <h4>Resumen de perfil</h4>
                                </div>
                                <div class="w-100 d-flex justify-content-center">
                                    <label style="border: 2px solid #B2794C;padding: 5px;border-radius: 50%;">
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
                                    </label>
                                </div>
                                <div class="login-form-logo" style="height:auto;">
                                    <h4>{{ perfilUsers.name }}</h4>
                                </div>
                                <div class="login-form-logo" style="height:auto;">
                                    <h5>Galería milenaria</h5>
                                </div>
                                <br />
                                <div style="text-align:center;">
                                    <h6><i class="mdi mdi-account-outline"></i> Nombre de usuario: {{ perfilUsers.username }}</h6>
                                    <h6><i class="mdi mdi-email-outline"></i> Correo electrónico: {{ perfilUsers.email }}</h6>
                                    <h6><i class="mdi mdi-calendar-month"></i> Fecha de nacimiento: {{ dateFormatted }}</h6>
                                    <h6><i class="mdi mdi-account-outline"></i> Sexo: {{ select_sexo.state }}</h6>
                                    <h6><i class="mdi mdi-flag-outline"></i> País: {{ select_pais.state }}</h6>
                                    <h6><i class="mdi mdi-microphone-outline"></i> Idioma: {{ select_idioma.state }}</h6>
                                </div>

                                <br />
                                <v-btn block color="primary" v-on:click="submit()">
                                    Ir al home
                                </v-btn>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    //data
    function data(){
        return {
            valid: true,
            indexForm: 0,
            perfil: 2,

            //tab 1
            image: null,
            srcImage: './img/avatar.png',
            activePicker: null,
            date: null,
            dateFormatted: null,
            menu: false,
            select_sexo: { state: 'Seleccione opción', abbr: '' },
            select_pais: { state: 'Seleccione opción', abbr: '' },
            select_idioma: { state: 'Seleccione opción', abbr: '' },

            //tab 2
            asociacion_arte: '',
            consejeria_ayuntamiento: '',
            galeria: '',
            asociacion_turismo: '',

            //tab 3
            artistic_selected: [],

            //finally
            completed: false,
        }
    }
    //methods
    function formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
    }
    function parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    function beforeChanged(){
        if(this.$refs.wizard){
            this.$refs.wizard.prevTab();
        }
    }
    function tabChange(value){
        if(this.$refs.wizard){
            this.$refs.wizard.nextTab();
            if(value) this.perfil = value;
        }
    }
    function submit(){
        const { perfil, image, date,asociacion_arte,consejeria_ayuntamiento,galeria,asociacion_turismo } = this;
        const sexo = this.select_sexo.abbr;
        const pais = this.select_pais.abbr;
        const idioma = this.select_idioma.abbr;
        const artistic_list = this.artistic_selected;

        this.$store.dispatch('registerPerfil', { perfil, image, date, sexo, pais, idioma,asociacion_arte,consejeria_ayuntamiento,galeria,asociacion_turismo,artistic_list })
        .then(() => {
            this.$notify({
                group: 'container',
                text: 'Su perfil se ha registrado',
                type: "success"
            });
            this.$router.push('/dashboard')
        })
    }
    function preview_image() {
      this.srcImage= URL.createObjectURL(this.image)
    }
    async function handleTabChange(preview,next){
        this.indexForm = next;
        if(this.indexForm === 1){

        }
    }
    async function mounted(){
        this.$store.dispatch('paisesRequest');
    }
    //computed
    function perfilUsers(){
        return this.$store.getters.getProfile;
    }
    function listPaises(){
        return this.$store.getters.getPaises;
    }
    function listSexo(){
        return [
            { state: 'Seleccione sexo', abbr: '' },
            { state: 'Hombre', abbr: '1' },
            { state: 'Mujer', abbr: '2' },
            { state: 'Otro', abbr: '3' },
        ];
    }
    function listIdioma(){
        return [
            { state: 'Seleccione idioma', abbr: '' },
            { state: 'Español', abbr: 'es' },
            { state: 'Ingles', abbr: 'en' },
            { state: 'Frances', abbr: 'fr' },
        ];
    }
    function listArtistic(){
        return this.artistic;
    }
    function apiStateFormLoading(){
        return this.status === 'loading';
    }
    export default {
        name:'perfil',
        data,
        mounted,
        methods:{
            tabChange,
            preview_image,
            handleTabChange,
            beforeChanged,
            submit,
            formatDate,
            parseDate
        },
        computed:{
            perfilUsers,
            listPaises,
            listSexo,
            listIdioma,
            listArtistic,
            apiStateFormLoading,
            computedDateFormatted () {
                return this.formatDate(this.date)
            },
            ...mapState({
                status: state=> state.user_information.status,
                artistic: state=> state.user_information.artistic,
            })
        },
        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            },
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
    .wizard-navigation{
        display: flex;
        flex-direction: column-reverse!important;
    }
    .vue-form-wizard.xs .wizard-navigation .wizard-progress-with-circle {
        top: -9px;
    }
    .wizard-card-footer{ position: fixed; bottom: 12px; /* set whatever bottom margin you want */ width: 100%;}
    .vue-form-wizard .wizard-header {
        display: none;
    }
    .vue-form-wizard .wizard-tab-content {
        padding: 0px;
        padding-bottom: 20px;
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
    .theme--dark.v-btn.v-btn--has-bg {
        background-color: transparent;
        border: 2px solid #FFFFFF;
    }
    .v-label{
        margin-bottom: 0px;
    }
</style>