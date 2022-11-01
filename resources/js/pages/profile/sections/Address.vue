<template>
    <div
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 sm:min-h-[43rem] animate-fade-in-down"
        id="direcciones"
        v-show="showSection"
    >
        <loading-overlay
            :active="globalLoading"
            :is-full-page="true"
            loader="bars"
        />
        <div class="sm:px-5">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-center"> Mis Direcciones </span>
            </h3>
            <div
                class="mt-4 py-4 border-t border-gray-900 hidden sm:block"
            ></div>
            <div class="flex flex-wrap pt-2 pb-12 justify-start">
                <div
                    class="w-full lg:w-1/2 h-72 pb-8"
                    :class="shippingAddress.length ? 'sm:pr-8' : ''"
                >
                    <v-btn
                        outlined
                        text
                        x-large
                        block
                        rounded
                        height="100%"
                        @click="showModalCreate = !showModalCreate"
                    >
                        <div class="flex flex-col space-y-4">
                            <i class="fas fa-plus text-gray-300 fa-4x"></i>
                            <span class="font-black"> Añadir dirección </span>
                        </div>
                    </v-btn>
                </div>
                <div
                    v-for="(address, index) in shippingAddress"
                    :key="address.id"
                    class="w-full lg:w-1/2 h-72 pb-8 animate-fade-in-down"
                    :class="index % 1 == 0 ? 'sm:pr-8' : ''"
                >
                    <div
                        class="rounded-3xl border border-gray-100 p-6 h-full hover:animate-shadow-drop-center flex flex-col justify-between"
                    >
                        <h3
                            class="text-lg text-primary uppercase font-semibold"
                            v-if="address.default === 1"
                        >
                            Predeterminada
                        </h3>
                        <div class="py-4">
                            <p class="text-base font-light leading-5">
                                {{ address.direction }}
                            </p>
                            <p class="text-base font-light leading-5">
                                {{ address.postal_code }} {{ address.city }}
                            </p>
                            <p class="text-base font-light leading-5">
                                <span>Teléfono: </span>
                                {{ address.phone_code }}
                                {{ address.phone_number }}
                            </p>
                        </div>
                        <div class="flex justify-start items-end">
                            <v-btn
                                depressed
                                text
                                @click.stop="editAddress(address.id)"
                            >
                                Editar
                            </v-btn>
                            <div
                                class="border-r border-gray-600 h-8 my-0"
                            ></div>
                            <v-btn
                                depressed
                                text
                                @click.stop="deleteAddress(address.id)"
                            >
                                Descartar
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CreateAddressModal
            :show="showModalCreate"
            @close-modal-create-address="showModalCreate = false"
            @reload-address="getShippingAddress"
        />

        <EditAddressModal
            :show="showModalEdit"
            :address="address"
            @close-modal-edit-address="showModalEdit = false"
            @reload-address="getShippingAddress"
        />
    </div>
</template>
<script>
import CreateAddressModal from "../../address/util/CreateAddressModal.vue";
import EditAddressModal from "../../address/util/EditAddressModal.vue";

export default {
    name: "Address",
    props: {
        showSection: {
            type: Boolean,
        },
    },
    components: {
        CreateAddressModal,
        EditAddressModal,
    },
    data() {
        return {
            showModalCreate: false,
            showModalEdit: false,
            shippingAddress: [],
            address: {},
        };
    },
    watch: {
        showSection(val) {
            if (val) {
                this.getShippingAddress();
            }
        },
    },
    methods: {
        /**
         * Obtiene las direcciones de envío del usuario
         */
        getShippingAddress() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.shippingAddress.getShippingAddress)
                .then((resp) => {
                    this.shippingAddress = resp.data;
                })
                .catch((error) => console.error(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Cargar dirección para se editada
         */
        async editAddress(id) {
            const address = this.shippingAddress;
            const addr = await address.find((addr) => addr.id === id);

            this.address = await addr;

            this.showModalEdit = true;
        },

        /**
         * Eliminar una dirección
         */
        deleteAddress(id) {
            this.confirmedDialog().then((resp) => {
                const endpoint = this.ep.shippingAddress.delete + id;
                const params = { _method: "DELETE" };
                if (resp.isConfirmed) {
                    this.axios
                        .post(endpoint, params)
                        .then((resp) => {
                            if (resp.status === 200) {
                                this.noty("Eliminado con éxito");
                                this.getShippingAddress();
                            }
                        })
                        .catch((error) => console.error(error));
                }
            });
        },
    },
};
</script>
