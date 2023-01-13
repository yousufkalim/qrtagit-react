// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "GOOGLE_API_KEY_REDACTED",
  authDomain: "dev-qrtagit.firebaseapp.com",
  projectId: "dev-qrtagit",
  storageBucket: "dev-qrtagit.appspot.com",
  messagingSenderId: "201451935162",
  appId: "1:201451935162:web:b7bbff1d202a0fc1df7983",
  measurementId: "G-BS2LTS1PPW",
};
export const vapidKey = "BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu";
// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
export const messaging = getMessaging(Firebase);
