document.querySelector("#login-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector("#login-message");
  message.hidden = false;
  const username = form.elements.username.value.trim();
  const password = form.elements.password.value;
  try {
    const response = await fetch("http://127.0.0.1:8080/api/auth/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || "로그인에 실패했습니다.");
    if (!result.data.accessToken) throw new Error("로그인 토큰이 없습니다.");
    localStorage.setItem("boardAccessToken", result.data.accessToken);
    location.href = "index.html";
  } catch (error) { message.textContent = error.message; }
});
