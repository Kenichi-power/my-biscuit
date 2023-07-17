import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQEiTNq3Y7cn56bqYgXHxU-V68lkLh5oc",
  authDomain: "mybiscuit-e09b0.firebaseapp.com",
  projectId: "mybiscuit-e09b0",
  storageBucket: "mybiscuit-e09b0.appspot.com",
  messagingSenderId: "569612192330",
  appId: "1:569612192330:web:8718588503dc6c239174b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
