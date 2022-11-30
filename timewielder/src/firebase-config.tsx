// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC_ilXfqP4lbXwDKKRdGvb7g44JRvYpek",
  authDomain: "timewielder-56b98.firebaseapp.com",
  projectId: "timewielder-56b98",
  storageBucket: "timewielder-56b98.appspot.com",
  messagingSenderId: "1054885935000",
  appId: "1:1054885935000:web:f7f4e5b627464dd7849ded"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);