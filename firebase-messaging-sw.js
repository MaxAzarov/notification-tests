// Give the ServiceWorker access to Firebase Messaging.
// In version 9 it uses modules, so to simplify will use a 'compat' version for the ServiceWorker.
importScripts(
  "https://www.gstatic.com/firebasejs/9.11.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging-compat.js"
);

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwMzz04xiQlArCjT7MMGQgyDfzFsRetuY",
  authDomain: "notifications-tests-16390.firebaseapp.com",
  projectId: "notifications-tests-16390",
  storageBucket: "notifications-tests-16390.appspot.com",
  messagingSenderId: "802065512805",
  appId: "1:802065512805:web:f33cf666c0c1c1fe09098c",
};
// Retrieve an instance of Firebase Messaging so that it can handle background messages.
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Copy data object to get parameters in the click handler
  // payload.data.data = JSON.parse(JSON.stringify(payload.data));

  // navigator.serviceWorker.ready.then(function (registration) {
  //   registration.showNotification("Notification with ServiceWorker", {
  //     data: {
  //       url: "index2.html",
  //     },
  //   });
  // });

  return self.registration.showNotification("test", "asdfadsf");

  // return self.registration.showNotification(payload.data.title, payload.data);
});

// Open/focus link in a notification message.
self.addEventListener("notificationclick", function (event) {
  const target = event.notification.data.click_action || "/";
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === target && "focus" in client) {
            return client.focus();
          }
        }

        return clients.openWindow(target);
      })
  );
});
