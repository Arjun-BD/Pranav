// src/pages/Login.jsx

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // For navigation after successful login
import '../styles/Login.css'; // Add your custom styles

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigating after login

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Log in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect user to a different page (e.g., home or store)
      navigate('/'); // Adjust according to your routing setup
    } catch (err) {
      setError(err.message); // Display any errors that occur
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
