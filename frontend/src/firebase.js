// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6G8aqQH-3uHUkPIPm64FTidUPlCJhhuk",
  authDomain: "socialmediamern-2d9d5.firebaseapp.com",
  projectId: "socialmediamern-2d9d5",
  storageBucket: "socialmediamern-2d9d5.appspot.com",
  messagingSenderId: "853376850301",
  appId: "1:853376850301:web:4f55d08596dea980fc5414",
  measurementId: "G-883X7LW4C4",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
