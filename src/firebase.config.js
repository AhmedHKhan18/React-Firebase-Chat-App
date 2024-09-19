// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOZK11CuG6g2E91lv3BasSDSkiGEEhtkI",
    authDomain: "react-firebase-chatapp-1daf2.firebaseapp.com",
    projectId: "react-firebase-chatapp-1daf2",
    storageBucket: "react-firebase-chatapp-1daf2.appspot.com",
    messagingSenderId: "519616723674",
    appId: "1:519616723674:web:ed804dd9b650be368503e3",
    measurementId: "G-6V4E7GS73S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

