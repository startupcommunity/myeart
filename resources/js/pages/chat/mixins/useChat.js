const sizes = {
    mobile: 768,
    tablet: 1024,
    desktop: 1500,
};

export default {
    computed: {
        globalChats: {
            get() {
                return this.$store.getters.chats;
            },
        },
    },

    methods: {
        /**
         * Iniciar chat de conversación
         */
        initChat(artist) {
            // si es el mismo usuario, no abrir el chat
            if (artist.id === this.$userAuth?.id) return false;
            // si el chat ya esta abierto, no abrirlo
            const chat = this.isChatOpen(artist.id);
            if (chat) {
                this.$store.dispatch("openChat", chat);
                return false;
            }

            // create new chat
            this.createChat(artist);

            // ajustar la cantidad de chats a mostrar
            this.adjustChats();
        },

        /**
         * Verifica si el chat ya esta abierto
         * @param {Number} id   id del artista
         */
        isChatOpen(id) {
            return this.globalChats.find((c) => c.id === id);
        },

        /**
         * Crear un nuevo chat
         */
        createChat(artist) {
            this.$store.dispatch("addChat", {
                id: artist.id,
                isOpen: true,
                autoUpdate: false,
                artist,
            });
        },

        /**
         * Ajusta la cantidad de chats a mostrar
         */
        adjustChats() {
            // si es menor a 768px, dejar el ultimo chat
            if (window.innerWidth < sizes.mobile) {
                this.$store.dispatch("reduceChats", 1);
            }

            // si es menor a 768px, dejar solo los últimos 2 chats
            if (
                window.innerWidth > sizes.mobile &&
                window.innerWidth < sizes.tablet
            ) {
                this.$store.dispatch("reduceChats", 2);
            }

            // si es mayor a 1024px, dejar solo los últimos 3 chats
            if (
                window.innerWidth > sizes.tablet &&
                window.innerWidth < sizes.desktop
            ) {
                this.$store.dispatch("reduceChats", 3);
            }

            // si es mayor a 1500px, dejar solo los últimos 4 chats
            if (window.innerWidth > sizes.desktop) {
                this.$store.dispatch("reduceChats", 4);
            }
        },
    },
};
