const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));
let postReady = false;
async function loadPost() {
  try {
    const post = await apiRequest(`/board/${postId}`);
    renderPost(post);
    postReady = true;
    document.querySelector("#post-message").textContent = "";
    return true;
  } catch (error) {
    document.querySelector("#post-title").textContent = "게시글을 불러올 수 없습니다.";
    document.querySelector("#post-content").textContent = "";
    document.querySelector("#post-message").textContent = error.message;
    return false;
  }
}
document.querySelector("#comments-section").hidden = true;
if (requireLogin()) {
  if (Number.isSafeInteger(postId) && postId > 0) {
    loadPost().then(function (success) {
      if (success) {
        document.querySelector("#comments-section").hidden = false;
        document.querySelector("#comment-form").hidden = false;
        loadComments();
      }
    });
  }
  else {
    document.querySelector("#post-title").textContent = "잘못된 게시글 번호입니다.";
    document.querySelector("#post-content").textContent = "";
  }
}

async function loadComments() {
  try {
    const comments = await apiRequest(`/board/${postId}/comments`);
    renderComments(comments);
    document.querySelector("#comment-message").textContent = "";
  } catch (error) { document.querySelector("#comment-message").textContent = error.message; }
}

document.querySelector("#comment-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  if (!postReady || !requireLogin()) return;
  const input = document.querySelector("#comment-content");
  const content = input.value.trim();
  const message = document.querySelector("#comment-message");
  if (!content || content.length > 255) { message.textContent = "댓글은 1~255자로 입력하세요."; return; }
  try {
    await apiRequest(`/board/${postId}/comments`, "POST", { content });
    input.value = "";
    await loadComments();
  } catch (error) { message.textContent = error.message; }
});
