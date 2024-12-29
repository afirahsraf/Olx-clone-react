import firebase from "firebase/compat/app";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCV3QoM6U_qmevcNzaya4FwJp2bYCXV8AY",
    authDomain: "olx-pro-1d6b7.firebaseapp.com",
    projectId: "olx-pro-1d6b7",
    storageBucket: "olx-pro-1d6b7.firebasestorage.app",
    messagingSenderId: "364106941024",
    appId: "1:364106941024:web:5057953b0b4db3283d3905",
    measurementId: "G-44491GJL9M"
  };

 export const app= firebase.initializeApp(firebaseConfig);
 export const db=getFirestore(app)
 export const auth=getAuth(app)
 export const storage=getStorage(app)