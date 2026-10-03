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
