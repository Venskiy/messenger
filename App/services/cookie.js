import CookieManager from 'react-native-cookies';

import { API_ROOT } from '../config/settings';

export const setAccessToken = (accessToken) => {
  return new Promise((resolve, reject) => {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    CookieManager.set({
      name: 'accessToken',
      value: accessToken,
      domain: API_ROOT,
      origin: API_ROOT,
      path: '/',
      version: '1',
      expiration: date.toJSON()
    }, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    CookieManager.getAll((err, res) => {
      res.accessToken ? resolve(res.accessToken.value) : reject('There is not access token.');
    });
  });
};
