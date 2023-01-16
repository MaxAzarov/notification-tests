const btn = document.querySelector(".simpleNotificationBtn");

btn.addEventListener("click", () => {
  notifyMe();
});

function notifyMe() {
  console.log("here");
  const notification = new Notification("First notification!", {
    data: {
      url: "index2.html",
    },
  });

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    const notification = new Notification("Hi there!", {
      data: {
        url: "index2.html",
      },
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      console.log("🚀 ~ file: index.js:10 ~ permission", permission);
      if (permission === "granted") {
        const notification = new Notification("Hi there!", {
          data: {
            url: "index2.html",
          },
        });
      }
    });
  }
}

navigator.serviceWorker.register("sw.js");
Notification.requestPermission(function (result) {
  console.log("🚀 ~ file: index.js:27 ~ result", result);
  if (result === "granted") {
    navigator.serviceWorker.ready
      .then(function (registration) {
        registration.showNotification("Notification with ServiceWorker", {
          data: {
            url: "index2.html",
          },
        });
      })
      .catch((e) => console.log(e));
  }
});
