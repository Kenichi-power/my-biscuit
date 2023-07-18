import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBApYsp_I6__VvsZwlDHQ56p_v6ZZUb0YM",
  authDomain: "biscuit-6905d.firebaseapp.com",
  projectId: "biscuit-6905d",
  storageBucket: "biscuit-6905d.appspot.com",
  messagingSenderId: "609108989888",
  appId: "1:609108989888:web:6cd50fdb2d04133cb49a25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
