// import { initializeApp } from 'firebase/app';
// import {getFirestore, setDoc, doc}  from 'firebase/firestore';
// import fs from 'fs';

// // Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyDGE4WBE5V30Ik4tvDWs0jIakfCw_OigOY",
//     authDomain: "foodsite-d76d1.firebaseapp.com",
//     projectId: "foodsite-d76d1",
//     storageBucket: "foodsite-d76d1.firebasestorage.app",
//     messagingSenderId: "873307993394",
//     appId: "1:873307993394:web:533403a67ff6795ecd532b",
//     measurementId: "G-9X4EKVEYPX",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Read JSON file
// const rawData = fs.readFileSync('data.json'); // Path to your JSON file
// const data = JSON.parse(rawData);

// // Upload Data to Firestore
// const uploadData = async () => {
//   try {
//     for (const category in data) {
//       await setDoc(doc(db, 'drinks', category), { items: data[category] });
//       console.log(`Uploaded ${category} successfully!`);
//     }
//     console.log('All data uploaded!');
//   } catch (error) {
//     console.error('Error uploading data:', error);
//   }
// };

// uploadData();
// import { useState, useEffect } from 'react';
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
// const Drinks = () => {
//   const [drinks, setDrinks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinksCollection = collection(db, 'drinks');
        const drinksSnapshot = await getDocs(drinksCollection);

        const drinksData = drinksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // setDrinks(drinksData);
        console.log(drinksData)
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching drinks:', error);
        // setLoading(false);
      }
    };
   
    fetchDrinks();
//   }, []);

//   return { drinks, loading };
// };

// Drinks()
[
  {
    id: "cocktails",
    items: [
      { name: "Mojito", ingredients: "Rum, Mint, Sugar", price: 10, image: "mojito.png" },
      { name: "Martini", ingredients: "Gin, Vermouth", price: 12, image: "martini.png" }
    ]
  },
  {
    id: "smoothies",
    items: [
      { name: "Strawberry Smoothie", ingredients: "Strawberry, Yogurt, Honey", price: 8, image: "strawberry_smoothie.png" },
      { name: "Mango Smoothie", ingredients: "Mango, Yogurt, Sugar", price: 9, image: "mango_smoothie.png" }
    ]
  }
]