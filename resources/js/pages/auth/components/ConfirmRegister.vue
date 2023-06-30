<template>
    <div class="text-center">
        <v-dialog
            v-model="show"
            width="600"
            persistent
            :fullscreen="fullScreen"
        >
            <v-card class="rounded p-3">
                <v-card-text class="text-left pt-6">
                    <div class="flex justify-between items-center">
                        <h3
                            class="text-left text-gray-900 font-medium text-2xl"
                        >
                            ¡Ya casi estas listo!
                        </h3>
                        <v-btn
                            icon
                            @click="$emit('close')"
                            class="text-gray-900"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                </v-card-text>
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
                                <h3
                                    class="text-xl font-light leading-7 text-zinc-400"
                                >
                                    <i class="fa fa-check text-green-600"></i>
                                    Te hemos enviado un correo electrónico a
                                    <a :href="'mailto:' + email">
                                        <span class="font-medium text-zinc-900">
                                            {{ email }}
                                        </span>
                                    </a>
                                    para que confirmes tu cuenta.
                                </h3>

                                <h5 class="mt-5 font-light text-zinc-400">
                                    <span class="text-sm">
                                        <i class="fa fa-info-circle"></i>
                                        Si no lo encuentras, revisa tu carpeta
                                        de spam.
                                    </span>
                                </h5>
                            </div>
                            <hr class="border-zinc-400 mt-5" />
                            <div class="w-full">
                                <div class="flex justify-center mt-6">
                                    <v-btn
                                        outlined
                                        small
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
