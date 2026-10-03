// 기존 Spring ApiResponse 규격: { success, message, data }
async function apiRequest(path, method = "GET", body = null) {
  const headers = {};
  if (isLoggedIn() && path !== "/auth/login") Object.assign(headers, authHeaders());
  if (body !== null) headers["Content-Type"] = "application/json";
  let response;
  try {
    response = await fetch(`http://127.0.0.1:8080/api${path}`, {
      method, headers, body: body === null ? undefined : JSON.stringify(body)
    });
  } catch { throw new Error("서버에 연결할 수 없습니다. 연결 후 다시 시도하세요."); }
  if (response.status === 204) return null;
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    if (response.status === 401 && path !== "/auth/login") {
      localStorage.removeItem("boardAccessToken");
      document.querySelector(".login-link").hidden = false;
      document.querySelector(".logout-button").hidden = true;
      throw new Error("로그인이 필요합니다. 로그인 메뉴에서 다시 로그인하세요.");
    }
    throw new Error(result?.message || `요청 실패 (${response.status})`);
  }
  return result.data;
}
