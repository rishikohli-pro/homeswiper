import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from './firebaseConfig';

const UserInteractions = () => {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const q = query(collection(db, 'interactions'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        setInteractions(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Your Interactions</h2>
      {interactions.map((interaction, index) => (
        <div key={index}>
          <p>Item ID: {interaction.itemId}</p>
          <p>Liked: {interaction.liked ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default UserInteractions;
