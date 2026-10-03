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

document.querySelector(".logout-button").addEventListener("click", async function () {
  if (this.disabled) return;
  this.disabled = true;
  document.querySelector("#nav-message").textContent = "로그아웃 중…";
  try {
    const accessToken = localStorage.getItem("boardAccessToken");
    await apiRequest("/auth/logout", "POST", { accessToken });
    localStorage.removeItem("boardAccessToken");
    location.href = "login.html";
  } catch (error) { document.querySelector("#nav-message").textContent = error.message; }
  finally { this.disabled = false; }
});
