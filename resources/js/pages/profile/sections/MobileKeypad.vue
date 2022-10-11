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
            class="flex flex-wrap justify-center items-center mt-6 text-primary text-[10px] gap-2"
        >
            <!-- <div class=""> -->
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="$emit('loadSectionProfile', 'personal-data')"
                >
                    <i class="fa fa-user fa-2x text-primary"></i>
                    <span class="tracking-tight font-bold">
                        Datos <br />
                        Personales
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="$emit('loadSectionProfile', 'obras')"
                >
                    <i class="fas fa-palette text-primary fa-2x"></i>
                    <span class="tracking-tight font-bold">
                        Mis <br />
                        Obras
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="$emit('loadSectionProfile', 'pedidos')"
                >
                    <i class="fas fa-shopping-cart text-primary fa-2x"></i>
                    <span class="tracking-tight font-bold">
                        Mis <br />
                        Pedidos
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="$emit('loadSectionProfile', 'direcciones')"
                >
                    <i class="fas fa-location-arrow text-primary fa-2x"></i>
                    <span class="tracking-tight font-bold">
                        Mis <br />
                        Direcciones
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="$emit('loadSectionProfile', 'pagos')"
                >
                    <i class="fas fa-money-check text-primary fa-2x"></i>
                    <span class="tracking-tight font-bold">
                        Métodos de <br />
                        Pago
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="flex flex-col items-center justify-start space-y-2"
                    @click="$emit('loadSectionProfile', 'seguridad')"
                >
                    <i class="fas fa-shield text-primary fa-2x"></i>
                    <span class="tracking-tight font-bold">
                        Privacidad <br />y Seguridad
                    </span>
                </button>
            </div>
            <!-- </div> -->
        </div>
        <!-- /botonera -->

        <!-- div border -->
        <div class="w-4/5 mx-o border-t-2 border-primary my-8"></div>
        <!-- /div border -->
    </div>
</template>
<script>
export default {
    name: "MobileKeypad",
};
</script>
