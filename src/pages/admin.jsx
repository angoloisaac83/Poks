import React, { useState, useEffect } from 'react';
import { collection, getFirestore, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGE4WBE5V30Ik4tvDWs0jIakfCw_OigOY",
  authDomain: "foodsite-d76d1.firebaseapp.com",
  projectId: "foodsite-d76d1",
  storageBucket: "foodsite-d76d1.appspot.com",
  messagingSenderId: "873307993394",
  appId: "1:873307993394:web:533403a67ff6795ecd532b",
  measurementId: "G-9X4EKVEYPX"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('cocktails');
  const [newDrink, setNewDrink] = useState({ name: '', ingredients: '', price: '', image: '' });
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Prompt for username and password on component mount
  useEffect(() => {
    const username = prompt("Enter Username:");
    const password = prompt("Enter Password:");

    if (username !== 'pokaribs' || password !== 'pokaribs123') {
      alert('Invalid credentials! Redirecting...');
      navigate('/login'); // Redirect to login page if credentials are incorrect
    }
  }, [navigate]);
  
  // Fetch categories and drinks
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const drinksCollection = collection(db, 'drinks');
        const drinkSnapshot = await getDocs(drinksCollection);
        const drinkList = drinkSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(drinkList);
      } catch (error) {
        console.error('Error fetching drinks:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddDrink = async () => {
    if (!newDrink.name || !newDrink.ingredients || !newDrink.price || !newDrink.image) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const categoryDocRef = doc(db, 'drinks', category);
      const updatedItems = [...categories.find(cat => cat.id === category).items, newDrink];

      // Update the category document with the new drink
      await updateDoc(categoryDocRef, { items: updatedItems });

      // Update local state
      setCategories(prevCategories =>
        prevCategories.map(cat =>
          cat.id === category ? { ...cat, items: updatedItems } : cat
        )
      );

      setNewDrink({ name: '', ingredients: '', price: '', image: '' });
    } catch (error) {
      console.error('Error adding drink:', error);
    }
  };

  const handleUpdateDrink = async () => {
    if (selectedDrinkIndex !== null) {
      try {
        const categoryDocRef = doc(db, 'drinks', category);
        const items = categories.find(cat => cat.id === category).items;
        items[selectedDrinkIndex] = newDrink; // Update drink

        await updateDoc(categoryDocRef, { items });

        // Update local state
        setCategories(prevCategories =>
          prevCategories.map(cat =>
            cat.id === category ? { ...cat, items } : cat
          )
        );

        setNewDrink({ name: '', ingredients: '', price: '', image: '' });
        setSelectedDrinkIndex(null);
      } catch (error) {
        console.error('Error updating drink:', error);
      }
    }
  };

  const handleDeleteDrink = async (index) => {
    try {
      const categoryDocRef = doc(db, 'drinks', category);
      const items = categories.find(cat => cat.id === category).items.filter((_, i) => i !== index);

      await updateDoc(categoryDocRef, { items });

      // Update local state
      setCategories(prevCategories =>
        prevCategories.map(cat =>
          cat.id === category ? { ...cat, items } : cat
        )
      );
    } catch (error) {
      console.error('Error deleting drink:', error);
    }
  };

  return (
    <div className="container mx-auto p-6"><head><title>Admin - Dashboard</title></head>
      <h1 className="text-3xl font-bold text-center mb-6">Drink Menu</h1>
      <div className="mb-4 text-center">
        <label htmlFor="category" className="text-lg font-semibold">Select Category:</label>
        <select
          id="category"
          onChange={handleCategoryChange}
          value={category}
          className="ml-2 p-2 rounded bg-gray-100 border border-gray-300"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <ul className="space-y-4">
          {categories.find(cat => cat.id === category)?.items.map((drink, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <div>
                <strong className="text-xl">{drink.name}</strong>
                <p className="text-sm text-gray-500">{drink.ingredients}</p>
                <p className="text-sm font-semibold">${drink.price}</p>
                {drink.image && <img src={drink.image} alt={drink.name} className="w-16 h-16" />}
              </div>
              <div>
                <button
                  onClick={() => {
                    setSelectedDrinkIndex(index);
                    setNewDrink(drink); // Load drink data for editing
                  }}
                  className="mr-2 text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDrink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Drink</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={newDrink.name} 
            onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })} 
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="text" 
            placeholder="Ingredients" 
            value={newDrink.ingredients} 
            onChange={(e) => setNewDrink({ ...newDrink, ingredients: e.target.value })} 
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="text" 
            placeholder="Price" 
            value={newDrink.price} 
            onChange={(e) => setNewDrink({ ...newDrink, price: e.target.value })} 
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="text" 
            placeholder="Image URL" 
            value={newDrink.image} 
            onChange={(e) => setNewDrink({ ...newDrink, image: e.target.value })} 
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <button 
            onClick={handleAddDrink} 
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Drink
          </button>
        </div>
      </div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Drink</h3>
        {selectedDrinkIndex !== null && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Name" 
              value={newDrink.name} 
              onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })} 
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="text" 
              placeholder="Ingredients" 
              value={newDrink.ingredients} 
              onChange={(e) => setNewDrink({ ...newDrink, ingredients: e.target.value })} 
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="text" 
              placeholder="Price" 
              value={newDrink.price} 
              onChange={(e) => setNewDrink({ ...newDrink, price: e.target.value })} 
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="text" 
              placeholder="Image URL" 
              value={newDrink.image} 
              onChange={(e) => setNewDrink({ ...newDrink, image: e.target.value })} 
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              onClick={handleUpdateDrink} 
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Update Drink
            </button>
            <button 
              onClick={() => {
                setSelectedDrinkIndex(null);
                setNewDrink({ name: '', ingredients: '', price: '', image: '' });
              }}
              className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
