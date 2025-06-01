// firebase.js (or Firebase.js)
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDZ4hfFCeSjnh_T-02zAdv6vOZsJKGxPg8",
  authDomain: "backend-1bb73.firebaseapp.com",
  projectId: "backend-1bb73",
  storageBucket: "backend-1bb73.appspot.com",
  messagingSenderId: "635083454778",
  appId: "1:635083454778:web:94de6f235325225100f803",
  measurementId: "G-YZTK4Z2Y3M",
};

// Initialize Firebase (compat mode)
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db };
