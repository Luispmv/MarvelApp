// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import * as firebase from "firebase"
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // linea recien añadida


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "TUAPIKEY",
  authDomain: "fir-react-3ec54.firebaseapp.com",
  projectId: "fir-react-3ec54",
  // storageBucket: "fir-react-3ec54.firebasestorage.app",
  storageBucket: "fir-react-3ec54.appspot.com",
  messagingSenderId: "1011837157609",
  appId: "1:1011837157609:web:af9949a15641ad9d76b078"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app) // linea recien añadida

export { auth, db }; // agregamos db aqui
