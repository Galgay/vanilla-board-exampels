function isLoggedIn() { return Boolean(localStorage.getItem("boardAccessToken")); }
function requireLogin() {
  if (isLoggedIn()) return true;
  location.replace("login.html");
  return false;
}
function authHeaders() { return { Authorization: `Bearer ${localStorage.getItem("boardAccessToken")}` }; }
function setupNavigation() {
  document.querySelector(".login-link").hidden = isLoggedIn();
  document.querySelector(".logout-button").hidden = !isLoggedIn();
  document.querySelector(".write-link").addEventListener("click", function (event) {
    if (!requireLogin()) event.preventDefault();
  });
}
setupNavigation();
