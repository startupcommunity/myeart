<template>
    <div class="flex flex-col justify-center items-center sm:hidden">
        <div class="mt-12" v-if="sections[0].personal">
            <v-btn
                class="text-primary font-bold"
                depressed
                text
                @click="$emit('editDataProfile')"
            >
                <i class="fa-solid fa-pen"></i> Editar perfil
            </v-btn>
        </div>

        <div
            :class="sections[0].personal ? 'mt-3' : 'mt-12'"
            class="flex flex-col justify-center gap-3"
        >
            <v-btn
                elevation="0"
                color="#B2794C"
                class="rounded-md"
                :to="{ name: 'collectiveCreate' }"
            >
                <span class="text-white"> Crear colectivo </span>
            </v-btn>
            <v-btn
                elevation="0"
                color="#B2794C"
                class="rounded-md"
                @click.stop="$emit('openCollectivesModal')"
            >
                <span class="text-white"> Ver mis colectivos </span>
            </v-btn>
        </div>
        <!-- botonera -->
        <div
            class="flex flex-wrap justify-center items-start mt-6 text-primary text-xs gap-3"
        >
            <!-- <div class=""> -->
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.personal)"
                >
                    <i class="fa fa-user fa-2x text-primary"></i>
                    <span
                        class="tracking-tight"
                        :class="
                            sections[0].personal ? 'font-black' : 'font-light'
                        "
                    >
                        Datos
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.pub)"
                >
                    <i class="fas fa-camera text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="sections[0].pub ? 'font-black' : 'font-light'"
                    >
                        Publicaciones
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.obras)"
                >
                    <i class="fas fa-palette text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="sections[0].obras ? 'font-black' : 'font-light'"
                    >
                        Obras
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.fav)"
                >
                    <i class="fa-solid fa-bookmark text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="sections[0].fav ? 'font-black' : 'font-light'"
                    >
                        Favoritos
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.pedidos)"
                >
                    <i class="fas fa-shopping-cart text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="
                            sections[0].pedidos ? 'font-black' : 'font-light'
                        "
                    >
                        Pedidos
                    </span>
                </button>
            </div>
            <!-- </div> -->
        </div>

        <!-- segunda hilera -->
        <div
            class="flex flex-wrap justify-center items-start text-primary text-xs gap-3 mt-5"
        >
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.direcciones)"
                >
                    <i class="fas fa-location-arrow text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="
                            sections[0].direcciones
                                ? 'font-black'
                                : 'font-light'
                        "
                    >
                        Direcciones
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.pagos)"
                >
                    <i class="fas fa-money-check text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="sections[0].pagos ? 'font-black' : 'font-light'"
                    >
                        Métodos de <br />
                        Pago
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.seguridad)"
                >
                    <i class="fas fa-shield text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="
                            sections[0].seguridad ? 'font-black' : 'font-light'
                        "
                    >
                        Privacidad <br />y Seguridad
                    </span>
                </button>
            </div>
        </div>
        <!-- /botonera -->

        <!-- div border -->
        <div class="w-[90%] border-t-2 border-primary my-8"></div>
        <!-- /div border -->
    </div>
</template>
<script>
export default {
    name: "MobileKeypad",
    data() {
        return {
            // secciones
            sections: [
                {
                    personal: false,
                    pub: false,
                    obras: false,
                    fav: false,
                    pedidos: false,
                    direcciones: false,
                    pagos: false,
                    seguridad: false,
                },
            ],

            // original secciones
            original: [
                {
                    personal: false,
                    pub: false,
                    obras: false,
                    fav: false,
                    pedidos: false,
                    direcciones: false,
                    pagos: false,
                    seguridad: false,
                },
            ],

            // id de secciones
            mobileSection: {
                personal: "personal",
                pub: "pub",
                obras: "obras",
                fav: "fav",
                pedidos: "pedidos",
                direcciones: "direcciones",
                pagos: "pagos",
                seguridad: "seguridad",
            },
        };
    },
    mounted() {
        this.sections[0].personal = true;
    },
    methods: {
        /**
         * Emitir evento para cambiar entre secciones
         * y cambiar clase activa de cada botón de activación
         * de la sección que corresponda
         */
        changeEmitAndClass(id) {
            // emit
            this.$emit("loadSection", id);

            // ocultar y mostrar secciones
            this.sections = JSON.parse(JSON.stringify(this.original));
            this.sections.map((section) => (section[id] = true));
        },
    },
};
</script>
