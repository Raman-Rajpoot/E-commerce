// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.FIREBASE_KEY,
  authDomain:process.env.FIREBASE_AUTH_DOMAIN,
  projectId:process.env.FIREASE_PROJECTID ,
  storageBucket:process.env.FIREBASE_STORAGE_BACKET ,
  messagingSenderId:process.env.FIREBASE_MESSAGEID,
  appId:process.env.FIREBASE_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);