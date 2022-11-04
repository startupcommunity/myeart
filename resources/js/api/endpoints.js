import API_URL from "../common/config";

// api v1
const API = `${API_URL}api`;

const endpoints = {
    // obras
    artworks: {
        save: API + "/artworks/create",
        edit: API + "/artworks/edit/",
        update: API + "/artworks/update/",
        getImage: API + "/artworks/image/",
        getPublish: API + "/artworks/publish",
        getUserPublish: API + "/artworks/user/publish/",
        getPublishForCategory: `${API}/artworks/publish/category/`,
        liked: `${API}/artworks/liked/`,
        disliked: `${API}/artworks/disliked/`,
        show: `${API}/artworks/show/`,
        slug: `${API}/artworks/slug/`,
        filterPublished: `${API}/artworks/filterPublished`,
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
        subcategories: `${API}/subcategories/`,
        labels: `${API}/labels/`,
    },
};

export default endpoints;
