import axios from 'axios';

import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

const Axios = axios.create({
  baseURL: 'https://withered-feather-36062.botics.co/api/v1',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then((session) => {
        var idTokenExpire = session.getIdToken().getExpiration();
        var refreshToken = session.getRefreshToken();
        var currentTimeSeconds = Math.round(+new Date() / 1000);
        if (idTokenExpire < currentTimeSeconds) {
          Auth.currentAuthenticatedUser().then((res: CognitoUser) => {
            res.refreshSession(refreshToken, (err, data) => {
              if (err) {
                Auth.signOut();
              } else {
                config.headers.Authorization = 'Bearer ' + data.getIdToken().getJwtToken();
                console.log({ Token: data.getIdToken().getJwtToken() });
                resolve(config);
              }
            });
          });
        } else {
          config.headers.Authorization = 'Bearer ' + session.getIdToken().getJwtToken();
          console.log({ Token: session.getIdToken().getJwtToken() });
          resolve(config);
        }
      })
      .catch(() => {
        // No logged-in user: don't set auth header
        resolve(config);
      });
  });
});
export default Axios;
