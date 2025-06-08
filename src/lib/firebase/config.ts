
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "NAIzaSyAQJbVLkC7uSxTAA5NJ1xsENajJdIagv6E",
  authDomain: "reboxit-2274c.firebaseapp.com" ,
  projectId: "reboxit-2274c",
  storageBucket: "reboxit-2274c.firebasestorage.app",
  messagingSenderId: "491217215921",
  appId: "1:491217215921:web:074745edee0bfc3d529d90",
  measurementId: "G-ZK1YL7968D", // Optional
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);

export { app, auth };
