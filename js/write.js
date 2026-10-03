const form = document.querySelector("#post-form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (!requireLogin()) return;
  const title = form.elements.title.value.trim();
  const content = form.elements.content.value.trim();
  const message = document.querySelector("#form-message");
  if (title.length < 10 || title.length > 50 || content.length < 10) {
    message.textContent = "제목은 10~50자, 본문은 10자 이상 입력하세요.";
    return;
  }
  try {
    const response = await fetch("http://127.0.0.1:8080/api/board", {
      method: "POST", headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(response.status === 401 ? "로그인이 필요합니다." : result.message || "등록 실패");
    location.href = "index.html";
  } catch (error) { message.textContent = error.message; }
});
requireLogin();
