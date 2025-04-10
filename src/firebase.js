// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your own Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA0YRgZSh9RL1AN19DRXVFFayUuEwAUgfI",
  authDomain: "gamestore-220f3.firebaseapp.com",
  projectId: "gamestore-220f3",
  storageBucket: "gamestore-220f3.firebasestorage.app",
  messagingSenderId: "623697954306",
  appId: "1:623697954306:web:25954c14bc49bf34bdc91b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the auth and db objects correctly
export { auth, db };
