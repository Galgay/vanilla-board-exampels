// JS 02의 샘플 배열은 여기부터 로컬 스토리지 데이터로 교체한다.
function readLocal(key) {
  const stored = localStorage.getItem(key);
  if (stored === null) return [];
  try {
    const value = JSON.parse(stored);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
posts = readLocal("practice.posts");
comments = readLocal("practice.comments");
function saveLocal() {
  localStorage.setItem("practice.posts", JSON.stringify(posts));
  localStorage.setItem("practice.comments", JSON.stringify(comments));
}
function nextId(items) { return items.reduce((max, item) => Math.max(max, item.id), 0) + 1; }
