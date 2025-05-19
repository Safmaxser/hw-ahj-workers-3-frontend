import Newsletter from "../components/newsletter/newsletter";

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.serviceWorker) {
    window.addEventListener("load", async () => {
      try {
        if (navigator.serviceWorker) {
          await navigator.serviceWorker.register("/service-worker.js");
          console.log("sw registered");
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
  new Newsletter(
    document.documentElement.children[1],
    "https://hw-ahj-workers-3-backend.onrender.com",
  );
});
