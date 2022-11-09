<template>
    <div class="flex flex-col justify-center items-center sm:hidden">
        <div class="mt-12">
            <v-btn
                class="text-primary font-bold"
                depressed
                text
                @click="$emit('editDataProfile')"
            >
                <i class="fa-solid fa-pen"></i> Editar perfil
            </v-btn>
        </div>
        <!-- botonera -->
        <div
            class="flex flex-wrap justify-center items-start mt-6 text-primary text-[10px] gap-2"
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
                        Datos <br />
                        Personales
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
                        Mis <br />
                        Obras
                    </span>
                </button>
            </div>
            <div>
                <button type="button" class="flex flex-col items-center justify-start space-y-2" @click="changeEmitAndClass(mobileSection.fav)">
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
                        Mis <br />
                        Pedidos
                    </span>
                </button>
            </div>
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
                        Mis <br />
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
            <!-- </div> -->
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
                obras: "obras",
                fav: "favoritos",
                pedidos: "pedidos",
                direcciones: "direcciones",
                pagos: "pagos",
                seguridad: "seguridad",
            },
        };
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
