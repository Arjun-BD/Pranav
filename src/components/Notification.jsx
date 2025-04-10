// src/components/Notification.jsx
import React, { useEffect } from 'react';
import '../styles/Notification.css';

function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-close after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [onClose]);

  return (
    <div className="notification">
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
}

export default Notification;
