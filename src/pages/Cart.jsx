import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../styles/Cart.css';
import Notification from '../components/Notification';
import Modal from '../components/Modal'; // Import the Modal component

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const userId = auth.currentUser?.uid; // Get the user ID

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) {
        console.log('No user logged in');
        return;
      }

      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const cartRefs = userData.currentCart || []; // Get the array of references

        // Fetch game data from the references
        const gameDetails = await Promise.all(
          cartRefs.map(async (gameRef) => {
            const gameSnap = await getDoc(gameRef);
            return gameSnap.exists() ? { ...gameSnap.data(), ref: gameRef } : null;
          })
        );

        // Filter out any null values (in case a game does not exist)
        const validGames = gameDetails.filter((game) => game !== null);

        setCartItems(validGames);
        calculateTotal(validGames);
      } else {
        console.log('No such user!');
      }
    };

    fetchCartItems();
  }, [userId]);

  const calculateTotal = (cart) => {
    const totalAmount = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    setTotal(totalAmount);
  };

  const handleRemoveItem = async (gameRef) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (!gameRef || !gameRef.id) {
      console.error('Invalid game reference:', gameRef);
      return;
    }

    // Update Firestore: remove the game reference from the user's cart
    const updatedCart = userData.currentCart.filter((itemRef) => itemRef.id !== gameRef.id);

    // Update Firestore with the new cart
    await updateDoc(userRef, { currentCart: updatedCart });

    // Update the local state and recalculate total
    const updatedCartItems = cartItems.filter((item) => item.ref.id !== gameRef.id);
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    setNotificationMessage('You have removed item from cart');
  };

  const handleCheckout = () => {
    // Open the modal when the checkout button is clicked
    setIsModalOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <span className="game-name">
              {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
            </span>
            <span className="game-price">${item.price}</span>
            <button className="remove-btn" onClick={() => handleRemoveItem(item.ref)}>
              Remove
            </button>
          </div>
        ))
      )}
      <div className="cart-total">Total: ${total}</div>
      <button className="cart-checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>

      {/* Show Modal if checkout is clicked */}
      {isModalOpen && (
        <Modal message="Thank you for purchasing!" onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Cart;
