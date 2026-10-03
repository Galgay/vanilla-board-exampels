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
    await apiRequest("/board", "POST", { title, content });
    location.href = "index.html";
  } catch (error) { message.textContent = error.message; }
});
requireLogin();
