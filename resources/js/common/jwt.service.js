import Cookies from 'js-cookie';
const ID_API_TOKEN = '5ZVzK4RMa1EKNYW9FvoNi8eJGcsZzVsPmd4xhgvV';

export const getUser = () => {
    return Cookies.get(ID_API_TOKEN)
};

export const setUser = ( user ) => {
    Cookies.set(ID_API_TOKEN, JSON.stringify(user), { expires: user.expires_in });
};

export const unsetUser = () => {
    Cookies.remove(ID_API_TOKEN);
};

export default {getUser, setUser, unsetUser}