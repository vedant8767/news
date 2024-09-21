// src/components/Notification.js
import React, { useEffect } from 'react';
import { messaging } from '../firebase';

function Notification() {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');

          // Get FCM token
          const token = await messaging.getToken();
          console.log('FCM Token:', token);
          // Send this token to your backend or store it in your app
        } else {
          console.log('Notification permission denied.');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestPermission();
  }, []);

  return <div>Notification Component</div>;
}

export default Notification;
