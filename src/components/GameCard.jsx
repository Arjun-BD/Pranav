import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import '../styles/GameCard.css';

import Notification from './Notification';

function GameCard({ game }) {
    const [notificationMessage, setNotificationMessage] = useState('');

    const showNotification = (message) => {
        setNotificationMessage(message);
        setTimeout(() => setNotificationMessage(''), 4000); // Hide after 4 seconds
    };

    const handleAddToCart = async () => {
        if (!auth.currentUser) {
            showNotification('Please log in to add items to your cart'); // Show notification instead of alert
            return;
        }

        try {
            // Get a reference to the game document in Firestore
            const gameRef = doc(db, 'games', game.id); // Assuming each game has a unique 'id' in Firestore

            // Update the user's document with the game reference in the currentCart field
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, {
                currentCart: arrayUnion(gameRef) // Add the reference to the user's cart
            });

            console.log('Game reference added to cart!');
            showNotification('You have added item to cart'); // Show notification
        } catch (error) {
            console.error('Error adding game reference to cart:', error);
        }
    };

    return (
        <div className="game-card">
            {notificationMessage && (
                <Notification message={notificationMessage} onClose={() => setNotificationMessage('')} />
            )}

            <img src={game.imageUrl} alt={game.name} />
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <p>${game.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}

export default GameCard;
