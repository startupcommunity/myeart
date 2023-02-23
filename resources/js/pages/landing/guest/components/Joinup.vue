<template>
    <section class="bg-white">
        <div class="w-full">
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="py-12 bg-[#B2794C]">
                    <div class="max-w-lg mx-auto">
                        <h2 class="text-white text-4xl font-bold text-center">
                            ¡Esta comunidad es para ti!
                        </h2>
                        <div class="py-5 flex justify-center">
                            <v-btn
                                color="black"
                                class="text-white hover:no-underline"
                                large
                                :to="{ name: 'register' }"
                                v-if="isUserGuest"
                            >
                                Registrarme
                            </v-btn>
                            <v-btn
                                color="black"
                                class="text-white hover:no-underline"
                                large
                                :to="{
                                    name: 'userProfile',
                                    params: { id: authUser.id },
                                }"
                                v-else
                            >
                                Ir a mi perfil
                            </v-btn>
                        </div>
                        <p class="text-gray-200 font-thin text-center">
                            Únete y conoce las maravillosas obras de muchos
                            artistas como tú, date a conocer mediante tu arte y
                            llévate el reconocimiento que mereces.
                        </p>
                    </div>
                </div>
                <div class="bg-joined bg-no-repeat bg-cover"></div>
            </div>
        </div>
    </section>
</template>

<script>
import utilMixin from "../../../../mixins/utilMixin";

export default {
    name: "Joinup",
    mixins: [utilMixin],
};
</script>
