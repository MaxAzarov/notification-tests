console.log("Service Worker");

self.addEventListener("notificationclick", (event) => {
  const rootUrl = new URL("/", location).href;
  event.notification.close();
  // Enumerate windows, and call window.focus(), or open a new one.
  event.waitUntil(
    clients.matchAll().then((matchedClients) => {
      for (let client of matchedClients) {
        if (client.url === rootUrl) {
          return client.focus();
        }
      }
      return clients.openWindow("/");
    })
  );
});
