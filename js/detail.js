const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));
let postReady = false;
async function loadPost() {
  document.querySelector("#post-message").textContent = "게시글을 불러오는 중…";
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
    document.querySelector("#retry-post").hidden = false;
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
  document.querySelector("#comment-message").textContent = "댓글을 불러오는 중…";
  document.querySelector("#retry-comments").hidden = true;
  try {
    const comments = await apiRequest(`/board/${postId}/comments`);
    renderComments(comments);
    document.querySelector("#comment-message").textContent = "";
  } catch (error) { document.querySelector("#comment-message").textContent = error.message; document.querySelector("#retry-comments").hidden = false; }
}

document.querySelector("#comment-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  if (!postReady || !requireLogin()) return;
  const input = document.querySelector("#comment-content");
  const content = input.value.trim();
  const message = document.querySelector("#comment-message");
  if (!content || content.length > 255) { message.textContent = "댓글은 1~255자로 입력하세요."; return; }
  const button = event.currentTarget.querySelector('button[type="submit"]');
  if (button.disabled) return;
  button.disabled = true;
  message.textContent = "댓글 저장 중…";
  try {
    await apiRequest(`/board/${postId}/comments`, "POST", { content });
    input.value = "";
    await loadComments();
  } catch (error) { message.textContent = error.message; }
  finally { button.disabled = false; }
});

document.querySelector("#retry-comments").addEventListener("click", loadComments);
document.querySelector("#retry-post").addEventListener("click", () => location.reload());
