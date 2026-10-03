let currentPage = 0;
let totalPages = 0;
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
async function loadPosts(page = currentPage) {
  try {
    const data = await apiRequest(`/board?page=${page}&size=10`);
    renderPosts(data.content);
    currentPage = data.number;
    totalPages = data.totalPages;
    document.querySelector("#list-message").textContent = `전체 ${data.totalElements}개`;
    document.querySelector("#page-number").textContent = totalPages === 0 ? "0페이지" : `${currentPage + 1} / ${totalPages}페이지`;
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage + 1 >= totalPages;
  } catch (error) { document.querySelector("#list-message").textContent = error.message; }
}
previousButton.addEventListener("click", () => { if (currentPage > 0) loadPosts(currentPage - 1); });
nextButton.addEventListener("click", () => { if (currentPage + 1 < totalPages) loadPosts(currentPage + 1); });
if (requireLogin()) loadPosts();
