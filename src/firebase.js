// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq7x4Tm9kuSri0DnRMzn8Vv39KE-2nPfA",
    authDomain: "eszti-a6a1b.firebaseapp.com",
    projectId: "eszti-a6a1b",
    storageBucket: "eszti-a6a1b.firebasestorage.app",
    messagingSenderId: "514730549492",
    appId: "1:514730549492:web:6f02a663512bfed1063ea1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
