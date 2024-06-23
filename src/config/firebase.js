// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlwMmNv_GRpIk4HKfcyAzLEuDrRq5SvTI",
  authDomain: "vite-contact-48e0e.firebaseapp.com",
  projectId: "vite-contact-48e0e",
  storageBucket: "vite-contact-48e0e.appspot.com",
  messagingSenderId: "27326114246",
  appId: "1:27326114246:web:b7ba89dd3ac3516ce7aac7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
