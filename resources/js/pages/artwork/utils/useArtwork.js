/**
 * Gestion de una obra de arte
 * Creación y edición
 *
 * @autor  Luis Annunziato: luisannunziato@gmail.com
 * @link https://luisan.dev
 */

import {
    DRAFT_ARTWORK,
    PUBLISH_ARTWORK,
    SUCCESS_TITLE_NOTY,
} from "../../../util/text";

export default {
    data() {
        return {
            state: 0,
            typeArtwork: 1,
            artCollectiveID: 0,
        };
    },

    methods: {
        /**
         * Cargar mensaje de éxito según sea el caso
         */
        loadSuccessMessage() {
            // obra publicada
            if (this.state === 1) {
                this.notySwal({
                    title: SUCCESS_TITLE_NOTY,
                    text: PUBLISH_ARTWORK,
                });
            } else if (this.state === 3) {
                // obra como borrador
                this.notySwal({
                    title: SUCCESS_TITLE_NOTY,
                    text: DRAFT_ARTWORK,
                });

                // TODO: validación en desuso, nunca va a llegar al estado 5
            } else if (this.state === 5) {
                // mensaje para cuando queda en pausa/borrador
                // const confirm = this.confirmedDialog({
                //     title: inPauseMsj,
                //     text: "Para poder publicarla debe agregar un método de cobro",
                //     icon: "success",
                //     confirmButtonText: "Agregar un método de cobro",
                //     cancelButtonText: "Cancelar",
                // });
                // respuesta promesa
                // confirm.then((resp) => {
                //     if (resp.isConfirmed) {
                //         this.$router.push({
                //             name: "userProfile",
                //             params: {
                //                 id: this.$userAuth.id,
                //                 section: "charging",
                //             },
                //         });
                //     }
                // });
            }
        },

        /**
         * Redireccionar según el tipo de obra
         * 1: obra de usuario
         * 2: obra de colectivo
         */
        redirectAccordingTypeArtwork() {
            // obra de artista
            if (this.typeArtwork === 1) {
                this.$router.push({
                    name: "userProfile",
                    params: {
                        id: this.$userAuth.id,
                        section: "obras",
                    },
                });
            }

            // obra de colectivo
            if (this.typeArtwork === 2) {
                const url = `/colectivos/perfil/${this.artCollectiveID}/artwork`;
                this.$router.push(url);
            }
        },
    },
};
