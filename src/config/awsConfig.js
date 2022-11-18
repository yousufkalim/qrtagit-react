const awsConfig = {
  identityPoolId: 'us-west-2_fHUyppSYP',
  region: 'us-west-2',
  userPoolId: 'us-west-2_fHUyppSYP',
  userPoolWebClientId: '2m0624ablii9dtont7jpij0kbf',
  oauth: {
    domain: 'dev-qrtagit.auth.us-west-2.amazoncognito.com/',
    scope: ['email'],
    redirectSignIn: 'qrtagit://token',
    redirectSignOut: 'qrtagit://',
    responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
};
export default awsConfig;
