import { useState, useEffect } from 'react';
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

// Custom Hook to fetch drinks
const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      setLoading(true);
      try {
        const drinksCollection = collection(db, 'drinks');
        const drinksSnapshot = await getDocs(drinksCollection);

        const drinksData = drinksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDrinks(drinksData);
      } catch (error) {
        console.error('Error fetching drinks:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  return { drinks, loading, error };
};

export { Drinks };