import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAJ1nt_t-rG0TYQE5JLmACdVzmFR3Cv0jI",
  authDomain: "admin-dash-772ac.firebaseapp.com",
  projectId: "admin-dash-772ac",
  storageBucket: "admin-dash-772ac.appspot.com",
  messagingSenderId: "261020296920",
  appId: "1:261020296920:web:639ce9ed489c7177b2d9ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { db, auth };
