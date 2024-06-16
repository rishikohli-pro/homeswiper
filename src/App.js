// src/App.js
import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';
import SignIn from './SignIn';
import SwipeCards from './SwipeCards';
import UserInteractions from './UserInteractions';

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/hnm_skirts.json'); // URL to your JSON file
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInteraction = async (itemId, liked) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const data = {
          userId: currentUser.uid,
          itemId: itemId,
          liked: liked,
          timestamp: new Date(),
        };

        await addDoc(collection(db, "interactions"), data);
        console.log("Document written with ID: ", itemId);
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <SwipeCards onInteraction={handleInteraction} items={products} />
          <UserInteractions />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default App;
