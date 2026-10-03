const samplePost = { id: 1, title: "첫 번째 게시글", content: "게시판 실습 내용입니다.", author: "학생", createdDatetime: "2026-10-03" };
let posts = [samplePost, { ...samplePost, id: 2, title: "HTML 문서 구조" }, { ...samplePost, id: 3, title: "학습 내용" }];
let comments = [{ id: 1, boardId: 1, content: "첫 댓글입니다.", author: "학생" }];
