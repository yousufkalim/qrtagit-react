import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Amplify} from "aws-amplify";
import awsExports from "./aws-exports";

// Configure Amplify!!!!
// Check if you are in localhost or production in order to configure the
// redirect URLs properly.
const isLocalhost = Boolean (

  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.

    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.

    window.location.hostname.match(
      /^127(?:.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

const signInURI = awsExports.oauth.redirectSignIn.split(',')
const signOutURI = awsExports.oauth.redirectSignOut.split(',')

if (isLocalhost) {
  awsExports.oauth.redirectSignIn = signInURI[0]
  awsExports.oauth.redirectSignOut = signOutURI[0]
} else if (window.location.hostname === "main.d1i6i6g25r1vzu.amplifyapp.com") {
  awsExports.oauth.redirectSignIn = signInURI[1]
  awsExports.oauth.redirectSignOut = signOutURI[1]
} else if (window.location.hostname === "dev.qrtag.it") {
  awsExports.oauth.redirectSignIn = signInURI[2]
  awsExports.oauth.redirectSignOut = signOutURI[2]
} else {
  console.log('AMPLIFY NOT CONFIGURED PROPERLY')
}
// Check if you are in localhost or production
// Now we can Configure Resources
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
