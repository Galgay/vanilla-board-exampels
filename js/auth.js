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
  try {
    const accessToken = localStorage.getItem("boardAccessToken");
    const response = await fetch("http://127.0.0.1:8080/api/auth/logout", {
      method: "POST", headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken })
    });
    if (!response.ok) throw new Error("로그아웃에 실패했습니다.");
    localStorage.removeItem("boardAccessToken");
    location.href = "login.html";
  } catch (error) { document.querySelector("#nav-message").textContent = error.message; }
});
