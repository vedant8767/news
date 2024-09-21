// importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging.js');
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCznGdMc0zjTbvPnZxqlMkoGypwOQ4Ycvc",
  authDomain: "news-1e811.firebaseapp.com",
  projectId: "news-1e811",
  storageBucket: "news-1e811.appspot.com",
  messagingSenderId: "1056410514332",
  appId: "1:1056410514332:web:86083365811e01f6268e59",
  measurementId: "G-SW4C2DJX8R"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
