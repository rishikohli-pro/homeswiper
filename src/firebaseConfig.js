// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4AbER_Zfd5xdfL4GDYEubOQLlrmLFVLw",
  authDomain: "homeswiper-13b86.firebaseapp.com",
  projectId: "homeswiper-13b86",
  storageBucket: "homeswiper-13b86.appspot.com",
  messagingSenderId: "935431611455",
  appId: "1:935431611455:web:79a3c818f0763f5448c48a",
  measurementId: "G-Z4KZHHSYLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
