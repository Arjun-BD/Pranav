// src/pages/GameList.jsx
import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/GameList.css';

function GameList() {
  const [games, setGames] = useState([]);

  // Fetching games from Firestore on component mount
  useEffect(() => {
    const fetchGames = async () => {
      const gamesCollection = collection(db, 'games'); // Assuming your collection is named 'games'
      const gameSnapshot = await getDocs(gamesCollection);
      const gameList = gameSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gameList);
    };

    fetchGames();
  }, []);

  const handleAddToCart = async (game) => {
    const userId = auth.currentUser?.uid; // Ensure you get the user ID of the logged-in user

    if (!userId) {
      console.log('User is not logged in');
      return;
    }

    // Fetch the user's document
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const updatedCart = [...userData.currentCart, game];

      // Update the user's cart in Firestore
      await updateDoc(userRef, {
        currentCart: updatedCart,
      });

      console.log('Game added to cart');
    } else {
      console.log('No such user!');
    }
  };

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}

export default GameList;
