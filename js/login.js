document.querySelector("#login-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector("#login-message");
  message.hidden = false;
  const username = form.elements.username.value.trim();
  const password = form.elements.password.value;
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled) return;
  button.disabled = true;
  message.textContent = "로그인 중…";
  try {
    const tokens = await apiRequest("/auth/login", "POST", { username, password });
    if (!tokens?.accessToken) throw new Error("로그인 토큰이 없습니다.");
    localStorage.setItem("boardAccessToken", tokens.accessToken);
    location.href = "index.html";
  } catch (error) { message.textContent = error.message; }
  finally { button.disabled = false; }
});
