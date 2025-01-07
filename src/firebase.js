
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGE4WBE5V30Ik4tvDWs0jIakfCw_OigOY",
  authDomain: "foodsite-d76d1.firebaseapp.com",
  projectId: "foodsite-d76d1",
  storageBucket: "foodsite-d76d1.firebasestorage.app",
  messagingSenderId: "873307993394",
  appId: "1:873307993394:web:533403a67ff6795ecd532b",
  measurementId: "G-9X4EKVEYPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};