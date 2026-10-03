async function loadPosts() {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/board?page=0&size=10", { headers: authHeaders() });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || "목록 조회 실패");
    renderPosts(result.data.content);
    document.querySelector("#list-message").textContent = `전체 ${result.data.totalElements}개`;
  } catch (error) { document.querySelector("#list-message").textContent = error.message; }
}
if (requireLogin()) loadPosts();
