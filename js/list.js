let currentPage = 0;
let totalPages = 0;
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
let loading = false;
let retryPage = 0;
async function loadPosts(page = currentPage) {
  if (loading) return;
  loading = true;
  retryPage = page;
  previousButton.disabled = true;
  nextButton.disabled = true;
  document.querySelector("#retry-list").hidden = true;
  document.querySelector("#list-message").textContent = "게시글을 불러오는 중…";
  try {
    const data = await apiRequest(`/board?page=${page}&size=10`);
    renderPosts(data.content);
    currentPage = data.number;
    totalPages = data.totalPages;
    document.querySelector("#list-message").textContent = `전체 ${data.totalElements}개`;
    document.querySelector("#page-number").textContent = totalPages === 0 ? "0페이지" : `${currentPage + 1} / ${totalPages}페이지`;
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage + 1 >= totalPages;
  } catch (error) {
    document.querySelector("#list-message").textContent = error.message;
    document.querySelector("#retry-list").hidden = false;
  } finally {
    loading = false;
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage + 1 >= totalPages;
  }
}
previousButton.addEventListener("click", () => { if (currentPage > 0) loadPosts(currentPage - 1); });
nextButton.addEventListener("click", () => { if (currentPage + 1 < totalPages) loadPosts(currentPage + 1); });
if (requireLogin()) loadPosts();

document.querySelector("#retry-list").addEventListener("click", () => loadPosts(retryPage));
