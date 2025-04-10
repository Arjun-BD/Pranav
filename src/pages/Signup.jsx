// src/pages/Signup.jsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import '../styles/Signup.css'; // Make sure to add your custom styles

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle user signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Sign up the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a user document in Firestore with email and empty cart
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        currentCart: [] // Start with an empty cart
      });

      // Redirect or show success message
      console.log('User created and document added!');
    } catch (err) {
      setError(err.message); // Display any errors that occur
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
