const form = document.querySelector("#post-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = form.elements.title.value.trim();
  const content = form.elements.content.value.trim();
  if (title.length < 10 || title.length > 50 || content.length < 10) {
    document.querySelector("#form-message").textContent = "제목은 10~50자, 본문은 10자 이상 입력하세요.";
    return;
  }
  posts.unshift({ id: nextId(posts), title, content, author: "실습 사용자", createdDatetime: new Date().toISOString().slice(0, 10) });
  saveLocal();
  location.href = "index.html";
});

requireLogin();
