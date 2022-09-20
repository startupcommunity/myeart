import axios from 'axios';
import { routes } from '../router/routes';
import { store } from '../store/store';

export default () => {

  axios.interceptors.response.use(async (response) => {
    return await response;
  }, async (error) => {
    if (!error.response || error.response.data.status !== 401) {
      return await new Promise((resolve, reject) => {
        reject(error);
      });
    }

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.refreshToken){
      const refreshToken = user.refreshToken;

      const config = error.config;
      config.headers['refresh'] = `${refreshToken}`;

      return await new Promise( async (resolve, reject) => {
        await axios.request(config).then(response => {
          user.token = response.data.newToken;
          localStorage.setItem('user', JSON.stringify(user));

          resolve(response);
        }).catch((error) => {
          store.dispatch('auth/logout');
          routes.push({ name: 'login' });
          reject(error);
        })
      });
      
    }else {
      return await new Promise((resolve, reject) => {
        store.dispatch('auth/logout');
        routes.push({ name: 'login' });
        reject(error);
      });
    }
  });
}