// src/firebase.js
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/messaging';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyCznGdMc0zjTbvPnZxqlMkoGypwOQ4Ycvc",
    authDomain: "news-1e811.firebaseapp.com",
    projectId: "news-1e811",
    storageBucket: "news-1e811.appspot.com",
    messagingSenderId: "1056410514332",
    appId: "1:1056410514332:web:86083365811e01f6268e59",
    measurementId: "G-SW4C2DJX8R"
  };
  
// const serviceAccount = require("C:/Users/vedant bhadkamkar/Desktop/ved_news/news-1e811-firebase-adminsdk-qu201-120e770488.json");

// export const app = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
// export { messaging };
// import {initializeApp} from 'firebase-admin/app'
// import {getMessaging} from 'firebase-admin/messaging'


// const serviceAccount = require("../news-1e811-firebase-adminsdk-qu201-120e770488.json");

// initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// export const messaging = getMessaging();
