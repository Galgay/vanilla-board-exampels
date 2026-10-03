function renderPosts(posts) {
  const list = document.querySelector("#post-list");
  list.replaceChildren();
  if (posts.length === 0) list.textContent = "아직 게시글이 없습니다.";
  for (const post of posts) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `detail.html?id=${post.id}`;
    link.textContent = post.title;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${post.author} · ${post.createdDatetime || ""}`;
    item.append(link, meta);
    list.append(item);
  }
}
function renderPost(post) {
  document.querySelector("#post-title").textContent = post.title;
  document.querySelector("#post-meta").textContent = `${post.author} · ${post.createdDatetime || ""}`;
  document.querySelector("#post-content").textContent = post.content;
}
function renderComments(comments) {
  const list = document.querySelector("#comment-list");
  list.replaceChildren();
  if (comments.length === 0) list.textContent = "등록된 댓글이 없습니다.";
  for (const comment of comments) {
    const item = document.createElement("li");
    const author = document.createElement("strong");
    const content = document.createElement("p");
    author.textContent = comment.author;
    content.textContent = comment.content;
    item.append(author, content);
    list.append(item);
  }
}
