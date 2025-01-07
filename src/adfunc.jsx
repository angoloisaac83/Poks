import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, arrayUnion } from "firebase/firestore";

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

// Add Data
export const addData = async (data) => {
  try {
    await addDoc(collection(db, "dataCollection"), data);
    console.log("Document successfully added!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Fetch Data
export const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "dataCollection"));
  const dataList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log(dataList);
  return dataList;
};

// Update Data
export const updateData = async (id, updatedData) => {
  try {
    const dataRef = doc(db, "dataCollection", id);
    await updateDoc(dataRef, updatedData);
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Add to Existing Data
export const addToExistingData = async (id, newItem) => {
  try {
    const dataRef = doc(db, "dataCollection", id);
    await updateDoc(dataRef, {
      items: arrayUnion(newItem)
    });
    console.log("Item added successfully!");
  } catch (error) {
    console.error("Error adding item: ", error);
  }
};

// Delete Data
export const deleteData = async (id) => {
  try {
    await deleteDoc(doc(db, "dataCollection", id));
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

// Real-Time Listener
export const listenToUpdates = () => {
  const unsub = onSnapshot(collection(db, "dataCollection"), (snapshot) => {
    const updatedData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Real-time data: ", updatedData);
  });

  return unsub; // Call this to unsubscribe from updates
};
