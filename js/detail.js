const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));
const post = Number.isSafeInteger(postId) && postId > 0
  ? posts.find(item => item.id === postId)
  : undefined;
if (post) {
  renderPost(post);
  renderComments(comments.filter(comment => comment.boardId === postId));
} else {
  document.querySelector("#post-title").textContent = "게시글을 찾을 수 없습니다.";
  document.querySelector("#post-content").textContent = "";
  document.querySelector("#comments-section").hidden = true;
}

document.querySelector("#comment-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.querySelector("#comment-content");
  const content = input.value.trim();
  if (!post || !content || content.length > 255) {
    document.querySelector("#comment-message").textContent = "댓글은 1~255자로 입력하세요.";
    return;
  }
  comments.push({ id: nextId(comments), boardId: postId, content, author: "실습 사용자" });
  saveLocal();
  input.value = "";
  renderComments(comments.filter(comment => comment.boardId === postId));
});
