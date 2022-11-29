<template>
    <div class="flex justify-center">
        <div class="text-gray-800 sm:text-xs md:text-sm lg:text-lg">
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('personal')">
                    <i class="fa fa-user text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="sections.personal ? 'font-black' : 'font-light'"
                    >
                        Datos personales
                    </span>
                </button>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('publicaciones')">
                    <i class="fas fa-camera text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="sections.pub ? 'font-black' : 'font-light'"
                    >
                        Publicaciones
                    </span>
                </button>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('obras')">
                    <i class="fas fa-palette text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="sections.artwork ? 'font-black' : 'font-light'"
                    >
                        Mis obras
                    </span>
                </button>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('favoritos')">
                    <i class="fa-solid fa-bookmark text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="sections.fav ? 'font-black' : 'font-light'"
                    >
                        Favoritos
                    </span>
                </button>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('pedidos')">
                    <i class="fas fa-shopping-cart text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="sections.order ? 'font-black' : 'font-light'"
                    >
                        Mis Pedidos
                    </span>
                </button>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('direcciones')">
                    <i class="fas fa-location-arrow text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="
                            sections.direction ? 'font-black' : 'font-light'
                        "
                    >
                        Mis Direcciones
                    </span>
                </button>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('pagos')">
                    <i class="fas fa-money-check text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="sections.payment ? 'font-black' : 'font-light'"
                    >
                        Métodos de pago
                    </span>
                </button>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-start py-6">
                <button type="button" @click="showSection('seguridad')">
                    <i class="fas fa-shield text-primary"></i>
                    <span
                        class="tracking-tight uppercase"
                        :class="sections.security ? 'font-black' : 'font-light'"
                    >
                        Privacidad y seguridad
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "DesktopKeypad",
    props: {
        sections: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        showSection(section) {
            this.$emit("showSection", section);
        },
    },
};
</script>
