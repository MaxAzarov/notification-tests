import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging.js";

const btn = document.querySelector(".simpleNotificationBtn");
const tokenPlace = document.querySelector(".token");

btn.addEventListener("click", () => {
  notifyMe();
});

function notifyMe() {
  console.log("here");
  const notification = new Notification("First notification!", {
    data: {
      url: "/data/test",
    },
  });

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    const notification = new Notification("Hi there!", {
      data: {
        url: "/data/test",
      },
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      console.log("🚀 ~ file: index.js:10 ~ permission", permission);
      if (permission === "granted") {
        const notification = new Notification("Hi there!", {
          data: {
            url: "/data/test",
          },
        });
      }
    });
  }
}
const firebaseConfig = {
  apiKey: "AIzaSyAwMzz04xiQlArCjT7MMGQgyDfzFsRetuY",
  authDomain: "notifications-tests-16390.firebaseapp.com",
  projectId: "notifications-tests-16390",
  storageBucket: "notifications-tests-16390.appspot.com",
  messagingSenderId: "802065512805",
  appId: "1:802065512805:web:f33cf666c0c1c1fe09098c",
};

navigator.serviceWorker.register("sw.js");

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);

  // new Notification("Message received!", {
  //   data: {
  //     url: "/data/test",
  //   },
  // });

  navigator.serviceWorker.ready
    .then(function (registration) {
      registration.showNotification("Notification with ServiceWorker", {
        data: {
          url: "index2.html",
        },
      });
    })
    .catch((e) => console.log(e));
});

if (
  !(
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "localStorage" in window &&
    "fetch" in window &&
    "postMessage" in window
  )
) {
  if (!("Notification" in window)) {
    console.error("Notification not supported");
  } else if (!("serviceWorker" in navigator)) {
    console.error("ServiceWorker not supported");
  } else if (!("localStorage" in window)) {
    console.error("LocalStorage not supported");
  } else if (!("fetch" in window)) {
    console.error("fetch not supported");
  } else if (!("postMessage" in window)) {
    console.error("postMessage not supported");
  }

  console.warn("This browser does not support push-notifications.");
  console.log("Is HTTPS", window.location.protocol === "https:");
  console.log("Support Notification", "Notification" in window);
  console.log("Support ServiceWorker", "serviceWorker" in navigator);
  console.log("Support LocalStorage", "localStorage" in window);
  console.log("Support fetch", "fetch" in window);
  console.log("Support postMessage", "postMessage" in window);
} else {
  if (Notification.permission === "granted") {
    getUserToken();
  } else {
    requestPermission();
  }
}

// Request user permission for push-notifications
function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getUserToken();
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

// Get user registration token
function getUserToken() {
  // Register a service worker to use script with github pages. As firebase required to store serviceWorker only in the root.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
        // Get registration token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        getToken(messaging, {
          vapidKey:
            "BEVCe-SZNd8hshsGo-lqh4PhzSRLjujI1BLgpAkWC1KDVarSG4dFSvkJknU3w4_tib2oCoIF71KNskozI2OeHxo",
          serviceWorkerRegistration: registration,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log(
                "🚀 ~ file: index.js:108 ~ .then ~ currentToken",
                currentToken
              );
              // document.write(currentToken);

              tokenPlace.innerHTML = currentToken;
            } else {
              // Show permission request.
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            setTokenSentToServer(false);
          });
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
      });
  }
}
