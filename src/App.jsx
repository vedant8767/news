import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { messaging } from './firebase';
import Notification from './components/Notification'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  // useEffect(() => {
  //   messaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //     // Customize the notification here
  //     const notificationTitle = payload.notification.title;
  //     const notificationOptions = {
  //       body: payload.notification.body,
  //       icon: '/firebase-logo.png',
  //     };

  //     if (Notification.permission === 'granted') {
  //       new Notification(notificationTitle, notificationOptions);
  //     }
  //   });
  // }, []);
  
  return !loading ? (
    <div className='w-full flex flex-wrap content-between bg-gray-200 mt-0'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
        {/* <Notification/> */}
      </div>
    </div>
  ) : null
}

export default App
