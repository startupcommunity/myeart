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

        <!-- btn colectivo -->
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
        <!-- /btn colectivo -->

        <!-- botonera -->
        <div
            class="flex flex-wrap justify-center items-start mt-6 text-primary text-xs gap-3"
        >
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
                    @click="changeEmitAndClass(mobileSection.order)"
                >
                    <i class="fas fa-shopping-cart text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="sections[0].order ? 'font-black' : 'font-light'"
                    >
                        Pedidos
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.sale)"
                >
                    <i
                        class="fa-solid fa-share-from-square text-primary fa-2x"
                    ></i>
                    <span
                        class="tracking-tight"
                        :class="sections[0].sale ? 'font-black' : 'font-light'"
                    >
                        Ventas
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
        </div>

        <!-- segunda hilera -->
        <div
            class="flex flex-wrap justify-center items-start text-primary text-xs gap-3 mt-5"
        >
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="changeEmitAndClass(mobileSection.rating)"
                >
                    <i class="fas fa-star text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="
                            sections[0].rating ? 'font-black' : 'font-light'
                        "
                    >
                        Calificaciones
                    </span>
                </button>
            </div>
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
                    @click="changeEmitAndClass(mobileSection.charging)"
                >
                    <i class="fas fa-bank text-primary fa-2x"></i>
                    <span
                        class="tracking-tight"
                        :class="
                            sections[0].charging ? 'font-black' : 'font-light'
                        "
                    >
                        Métodos de <br />
                        Cobro
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
                    order: false,
                    sale: false,
                    direcciones: false,
                    payment: false,
                    charging: false,
                    rating: false,
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
                    order: false,
                    sale: false,
                    direcciones: false,
                    payment: false,
                    charging: false,
                    rating: false,
                    seguridad: false,
                },
            ],

            // id de secciones
            mobileSection: {
                personal: "personal",
                pub: "pub",
                obras: "obras",
                fav: "fav",
                order: "order",
                sale: "sale",
                direcciones: "direcciones",
                payment: "payment",
                charging: "charging",
                rating: "rating",
                seguridad: "seguridad",
            },
        };
    },
    mounted() {
        this.sections[0].pub = true;
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
