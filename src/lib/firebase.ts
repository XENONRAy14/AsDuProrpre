// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGFmxeMJarqeR931Lo7Its-MTxRuuKfTo",
  authDomain: "asdupropre.firebaseapp.com",
  projectId: "asdupropre",
  storageBucket: "asdupropre.firebasestorage.app",
  messagingSenderId: "28156928721",
  appId: "1:28156928721:web:f6bffb1d591f7d8e9edbf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
