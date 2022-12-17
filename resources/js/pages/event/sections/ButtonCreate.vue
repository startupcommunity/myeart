<template>
    <section class="bg-white">
        <div class="container py-10 flex justify-md-end justify-center">
            <v-btn
                color="#B2794C"
                class="uppercase tracking-widest text-white hover:no-underline"
                x-large
                type="button"
                :to="{ name: 'eventCreate' }"
            >
                <i class="fas fa-plus pr-2"></i>
                Crear un evento
            </v-btn>
        </div>
    </section>
</template>
