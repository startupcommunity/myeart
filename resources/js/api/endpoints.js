import API_URL from "../common/config";

// api v1
const API = `${API_URL}api`;

const endpoints = {
    // obras
    artworks: {
        save: `${API}/artworks/create`,
        edit: `${API}/artworks/edit/`,
        update: `${API}/artworks/update/`,
        getImage: `${API}/artworks/image/`,
        getPublish: `${API}/artworks/publish`,
        getUserPublish: `${API}/artworks/user/publish/`,
        getPublishForCategory: `${API}/artworks/publish/category/`,
        liked: `${API}/artworks/liked/`,
        disliked: `${API}/artworks/disliked/`,
        show: `${API}/artworks/show/`,
        slug: `${API}/artworks/slug/`,
        filterPublished: `${API}/artworks/filterPublished`,
        addVisit: `${API}/artworks/addvisit`,
    },

    // direcciones del usuario
    shippingAddress: {
        save: `${API}/shippingAddress/save`,
        update: `${API}/shippingAddress/update/`,
        delete: `${API}/shippingAddress/delete/`,
        getShippingAddress: `${API}/shippingAddress/getShippingAddress`,
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

        // colección de artistas activos
        getArtists: `${API}/user/get-artists`, // get

        // obtiene todos los datos de un artista (params :id)
        getArtist: `${API}/user/get-artist/`, // get
    },

    // comentarios
    comments: {
        artworkSave: `${API}/comments/artworks/save`, // post
        artworkAnswerSave: `${API}/comments/artworks/answer/save`, // post
        artworkList: `${API}/comments/artwork-list/`, // get
    },
};

export default endpoints;
