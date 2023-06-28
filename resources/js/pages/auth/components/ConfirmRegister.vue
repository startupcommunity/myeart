<template>
    <div class="text-center">
        <v-dialog
            v-model="show"
            width="600"
            persistent
            :fullscreen="fullScreen"
        >
            <v-card>
                <v-card-text>
                    <div
                        class="w-full"
                        :class="{
                            'py-5 md:p-10': fullScreen,
                            'py-5': !fullScreen,
                        }"
                    >
                        <div class="flex flex-col">
                            <div class="w-full">
                                <h3 class="text-xl font-light leading-5">
                                    Te hemos enviado un correo electrónico a
                                    <span class="font-bold">{{ email }}</span>
                                    para que confirmes tu cuenta.
                                </h3>

                                <h5 class="mt-5 font-light">
                                    <span class="text-sm">
                                        <i class="fa fa-info-circle"></i>
                                        Si no lo encuentras, revisa tu carpeta
                                        de spam.
                                    </span>
                                </h5>
                            </div>
                            <div class="w-full">
                                <div class="flex justify-center mt-6">
                                    <v-btn
                                        outlined
                                        @click.stop="$emit('close')"
                                    >
                                        Aceptar
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "ConfirmRegisterModal",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        fullScreen: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
            default: "",
        },
    },
};
</script>
