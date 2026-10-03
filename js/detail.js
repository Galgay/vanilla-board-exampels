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
  if (Number.isSafeInteger(postId) && postId > 0) loadPost();
  else {
    document.querySelector("#post-title").textContent = "잘못된 게시글 번호입니다.";
    document.querySelector("#post-content").textContent = "";
  }
}
