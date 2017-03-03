import CookieManager from 'react-native-cookies';

export const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    CookieManager.getAll((err, res) => {
      if (res.accessToken) {
        resolve(res.accessToken.value);
      }
      resolve('pow');
    });
  });
};
