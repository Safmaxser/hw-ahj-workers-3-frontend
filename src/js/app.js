import Newsletter from "../components/newsletter/newsletter";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js", { scope: "./" })
      .then((reg) => {
        console.log("Registration succeeded. Scope is " + reg.scope);
      })
      .catch((error) => {
        console.log("Registration failed with " + error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  new Newsletter(
    document.documentElement.children[1],
    "https://hw-ahj-workers-3-backend.onrender.com",
  );
});
