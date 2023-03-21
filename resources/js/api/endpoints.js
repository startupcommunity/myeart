import API_URL from "../common/config";

// api v1
const API = `${API_URL}api`;

const endpoints = {
    // obras
    artworks: {
        save: `${API}/artworks/create`, // post
        edit: `${API}/artworks/edit/`, // get - params :id
        update: `${API}/artworks/update/`, // put - params :id
        delete: `${API}/artworks/delete/`, // delete - params :id
        getImage: `${API}/artworks/image/`, // get - params :id
        getPublish: `${API}/artworks/publish`, // get
        getUserPublish: `${API}/artworks/user/publish/`, // get - params :id
        getPublishForCategory: `${API}/artworks/publish/category/`, // get - params :id
        liked: `${API}/artworks/liked/`,
        disliked: `${API}/artworks/disliked/`,
        show: `${API}/artworks/show/`,
        slug: `${API}/artworks/slug/`,
        filterPublished: `${API}/artworks/filterPublished`,
        addVisit: `${API}/artworks/addvisit`,
    },

    // direcciones del usuario
    shippingAddress: {
        save: `${API}/shippingAddress/save`, // post
        update: `${API}/shippingAddress/update/`, // put
        delete: `${API}/shippingAddress/delete/`, // delete
        getShippingAddress: `${API}/shippingAddress/getShippingAddress`, // get
    },

    // acceso global
    global: {
        categories: `${API}/categories`, // get
        subcategories: `${API}/subcategories/`, // get
        labels: `${API}/labels/`, // get
    },

    // user
    user: {
        // actualizar profile
        editProfile: `${API}/profile/update-profile`, // put

        // user - seguir artista
        followArtist: `${API}/user/follow-artist`, // post

        // user - dejar de seguir artista
        unfollowArtist: `${API}/user/unfollow-artist`, // post

        // artistas seguidos por el usuario
        getFollowArtists: `${API}/user/get-follow-artists`, // get

        // obras seguidas por el usuario
        getFollowArtworks: `${API}/user/get-follow-artworks`, // get

        // obtiene las publicaciones seguidas por el usuario
        getFollowReleases: `${API}/user/get-follow-releases`, // get

        // obtiene los eventos seguidos por el usuario
        getFollowEvents: `${API}/user/get-follow-events`, // get

        // obtiene los colectivos seguidos por el usuario
        getFollowCollectives: `${API}/user/get-follow-collectives`, // get

        // artistas seguidos por el usuario, info corta y necesaria
        getFASI: `${API}/user/get-follow-artists-short-info`, // get

        // colección de artistas activos
        getArtists: `${API}/user/get-artists`, // get

        // colección de artistas activos, de forma random
        getRandomArtists: `${API}/user/get-random-artists`, // get

        // obtiene todos los datos de un artista (params :id)
        getArtist: `${API}/user/get-artist/`, // get

        // agregar obra a favoritos
        addArtworkToFav: `${API}/user/add-favorite-artwork`, // post

        // eliminar obra de favoritos
        removeArtworkToFav: `${API}/user/remove-favorite-artwork`, // post

        // obtiene las calificaciones del artista (params :id)
        getArtistRatings: `${API}/user/get-artist-ratings/`, // get

        // obtiene los métodos de pago del usuario - {id}
        getUserPaymentMethods: `${API}/user/get-user-payment-methods/`, // get

        // obtiene los métodos de cobro del usuario - {id}
        getUserChargeMethods: `${API}/user/get-user-charge-methods/`, // get
    },

    // comentarios
    comments: {
        artworkSave: `${API}/comments/artworks/save`, // post
        artworkAnswerSave: `${API}/comments/artworks/answer/save`, // post
        artworkList: `${API}/comments/artwork-list/`, // get
        addReleaseLike: `${API}/comments/add-release-like`, // post
        deleteReleaselike: `${API}/comments/delete-release-like`, // post
        addAnswerRelease: `${API}/comments/add-release-answer`, // post
    },

    // publicaciones
    releases: {
        // guardar una nueva publicación
        save: `${API}/releases/store`, // post

        // actualiza una publicación
        update: `${API}/releases/update/`, // post

        // elimina una publicación
        delete: `${API}/releases/delete/`, // delete

        // obtiene todas las publicaciones del usuario
        getAllUser: `${API}/releases/get-user-releases`, // get

        // obtiene todas las publicaciones de un artista especifico - {id}
        getAllUserForID: `${API}/releases/get-user-releases/`, // get

        // obtiene todas las publicaciones de la app
        getAll: `${API}/releases/get-all-releases`, // get

        // get publicaciones de artistas seguidos
        followArtists: `${API}/releases/get-follow-artists-releases`, // get

        // agrega un like a una publicación
        like: `${API}/releases/like`, // post

        // elimina un like a una publicación
        dislike: `${API}/releases/dislike`, // post

        // agregar a favoritos la publicación
        addFav: `${API}/releases/add-favorite`, // post

        // eliminar de favoritos la publicación
        removeFav: `${API}/releases/remove-favorite`, // post

        // obtiene los comentarios de una publicación / {id}
        getComment: `${API}/releases/get-comments/`, // get

        // obtiene los comentarios de una publicación por slug / {slug}
        getCommentSlug: `${API}/releases/get-comments-slug/`, // get

        // guarda un comentario en una publicación
        storeComment: `${API}/releases/store-comment`, // post
    },

    // carrito de compras
    carts: {
        // agregar un item al carrito
        addItem: `${API}/cart/add-item`, // post

        // obtiene los artículos del carrito
        getItems: `${API}/cart/get-items`, // get

        // elimina un item del carrito - {id}
        deleteItem: `${API}/cart/delete-item/`, // delete

        // finalizar compra
        finish: `${API}/cart/finish-shop`, // post

        // intento de pago
        intent: `${API}/cart/intent`, // get
    },

    // pedidos - ordenes
    orders: {
        // obtiene los artículos del pedido
        getItems: `${API}/orders/get-items/`, // get

        // obtiene las ordenes del usuario logueado o indicado / {id?}
        getUserOrders: `${API}/orders/get-user-orders/`, // get

        // cancelar una orden / {id}
        cancel: `${API}/orders/cancel/`, // put

        // cancela el item de una orden // params: {user_id, item_id, order_id}
        cancelItem: `${API}/orders/cancel-item`, // post

        // confirma el item de una orden // params: {user_id, item_id, order_id}
        confirmItem: `${API}/orders/confirm-item`, // post

        // confirma una orden y marca como entregada
        confirm: `${API}/orders/confirm`, // post

        // obtiene el item de una orden / {id}
        getItem: `${API}/orders/get-item/`, // get

        // obtener mensajes entre comprador y vendedor / {id}
        getMessages: `${API}/orders/contact/get-messages/`, // get

        // envía un mensaje entre comprador y vendedor
        sendContactMessage: `${API}/orders/contact/send-message`, // post
    },

    // ventas
    sales: {
        // devuelve las ventas de un usuario / {id?}
        getUserSales: `${API}/orders/get-user-sales/`, // get
    },

    // eventos
    events: {
        // guarda un nuevo evento
        store: `${API}/events/store`, // post

        // devuelve todos los eventos
        getAll: `${API}/events/get-all`, // get

        // devuelve todos los eventos de un usuario / {id}
        getUserEvents: `${API}/events/get-user-events/`, // get

        // agregar a favoritos el evento
        addFav: `${API}/events/add-favorite`, // post

        // eliminar de favoritos el evento
        removeFav: `${API}/events/remove-favorite`, // post

        // agregar un like al evento
        like: `${API}/events/like`, // post

        // eliminar un like al evento
        dislike: `${API}/events/dislike`, // post

        // muestre el detalle de un evento / {id}
        show: `${API}/events/show/`, // get
    },

    // colectivos
    collectives: {
        // guarda un nuevo colectivo
        store: `${API}/collectives/store`, // post

        // actualizar datos planos de un colectivo / {id}
        update: `${API}/collectives/update/`, // put

        // devuelve un colectivo / {id}
        getCollective: `${API}/collectives/get-collective/`, // get

        // actualiza la foto de perfil de un colectivo / {id}
        updateProfilePhoto: `${API}/collectives/update-profile-photo/`, // put

        // actualiza la foto de portada de un colectivo / {id}
        updateFrontPhoto: `${API}/collectives/update-front-photo/`, // put

        // devuelve todos los colectivos de un usuario / {id?}
        // si no se envía el id, devuelve los colectivos del usuario logueado
        // se devuelven todos los colectivos, invitado y administrador
        getUserCollectives: `${API}/collectives/get-user-collectives/`, // get

        // devuelve todas las publicaciones de un colectivo / {id}
        getAllRelease: `${API}/collectives/get-collective-releases/`, // get

        // devuelve las publicaciones de un colectivo filtradas por una opción / {id}
        getReleaseByOption: `${API}/collectives/get-collective-releases-by-option/`, // get

        // envía una invitación a un usuario para unirse a un colectivo / {id}
        sendInvitation: `${API}/collectives/send-invitation`, // post

        // devuelve los miembros de un colectivo / {id}
        members: `${API}/collectives/get-members/`, // get

        // elimina un miembro de un colectivo / {id}
        removeMember: `${API}/collectives/remove-member`, // post

        // devuelve las obras del colectivo / {id}
        artworks: `${API}/collectives/get-artworks/`, // get

        // devuelve las obras del colectivo filtrada por request / {id}
        filterArtworks: `${API}/collectives/get-filters-artworks/`, // get

        // devuelve todos los colectivos creados
        // pueden estar filtrados por request
        getAll: `${API}/collectives/get-all`, // get

        // agrega un like a el colectivo
        like: `${API}/collectives/like`, // post

        // elimina un like del colectivo
        dislike: `${API}/collectives/dislike`, // post

        // seguir un colectivo
        follow: `${API}/collectives/follow`, // post

        // dejar de seguir un colectivo
        unfollow: `${API}/collectives/unfollow`, // post

        // aceptar invitación al colectivo
        acceptInvitation: `${API}/collectives/accept-invitation`, // post

        // rechazar invitación al colectivo
        declineInvitation: `${API}/collectives/decline-invitation`, // post
    },

    // notificaciones de la app
    notifications: {
        // marca una notificación como leída / {id}
        markAsRead: `${API}/notifications/mark-as-read/`, //get

        // marcas todas las notificaciones como leídas
        markAllAsRead: `${API}/notifications/mark-all-as-read`, //post
    },

    // métodos de pago
    paymentMethods: {
        // Agrega un método de pago al usuario
        store: `${API}/payment-methods/store`, // post

        // eliminar un método de pago del usuario / {id}
        delete: `${API}/payment-methods/delete/`, // delete
    },

    // métodos de cobro
    chargingMethods: {
        // Agrega un método de cobro al usuario
        store: `${API}/charging-methods/store`, // post

        // actualiza un método de cobro del usuario / {id}
        update: `${API}/charging-methods/update/`, // put

        // eliminar un método de cobro del usuario / {id}
        delete: `${API}/charging-methods/delete/`, // delete

        // obtiene los métodos de cobro del usuario / {id}
        // getUserChargingMethods: `${API}/charging-methods/get-user-charging-methods/`, // get
    },

    // contacto
    contact: {
        // envía un mensaje de contacto
        send: `${API}/contact/send`, // post
    },

    // newsletter
    newsletter: {
        // envía un mensaje de contacto
        suscribe: `${API}/newsletter/suscribe`, // post
    },

    // endpoints públicos sin middleware
    guest: {
        // devuelve todas las obras publicadas de la app
        getPublishedArtworks: `${API}/guest/artworks/published`, // get

        // devuelve todos losa artistas activos, de forma random
        getRandomArtists: `${API}/guest/artists/random`, // get

        // devuelve las publicaciones de la app
        getAllReleases: `${API}/guest/releases`, // get
    },
};

export default endpoints;
