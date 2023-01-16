console.log("Service Worker", self);

self.addEventListener("load", () => {
  console.log("load");
});

self.addEventListener("install", (event) => {
  console.log("install", event);
  // event.waitUntil(
  //   addResourcesToCache([
  //     "/",
  //     "/index.html",
  //     "/style.css",
  //     "/app.js",
  //     "/image-list.js",
  //     "/star-wars-logo.jpg",
  //     "/gallery/bountyHunters.jpg",
  //     "/gallery/myLittleVader.jpg",
  //     "/gallery/snowTroopers.jpg",
  //   ])
  // );
});

self.addEventListener("notificationclick", (event) => {
  console.log("🚀 ~ file: sw.js:4 ~ self.addEventListener ~ event", event);
  const rootUrl = new URL("/", location).href;
  console.log("🚀 ~ file: sw.js:27 ~ self.addEventListener ~ rootUrl", rootUrl);
  event.notification.close();
  // Enumerate windows, and call window.focus(), or open a new one.
  // event.waitUntil(
  //   clients.matchAll().then((matchedClients) => {
  //     for (let client of matchedClients) {
  //       if (client.url === rootUrl) {
  //         return client.focus();
  //       }
  //     }
  //     return clients.openWindow("/");
  //   })
  // );

  if (clients.openWindow && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }

  // return clients.openWindow("/index2.html");
});
