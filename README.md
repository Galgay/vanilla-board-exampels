# 게시판 실습

HTML, CSS, JavaScript를 단계별로 적용해 만든 게시판 실습 프로젝트입니다. 화면 구조와 스타일을 작성한 뒤, 사용자 입력과 서버 연동을 통해 게시판 기능을 구현합니다.

## 주요 기능

- 로그인·로그아웃
- 게시글 목록·상세 조회와 작성
- 게시글 페이지 이동
- 댓글 조회와 작성

## 실행

Spring API 서버를 `http://127.0.0.1:8080`에서 실행합니다. 다른 주소를 사용한다면 `js/api.js`의 `API_BASE_URL`을 변경합니다.

이 프로젝트는 Node.js와 npm 없이 실행할 수 있습니다. 프로젝트 폴더에서 다음 명령으로 정적 파일 서버를 실행한 뒤 `http://127.0.0.1:8000`을 엽니다.

```sh
python3 -m http.server --bind 127.0.0.1
```

Python의 기본 포트인 8000을 사용해야 CORS 허용 주소와 일치합니다. 브라우저에서 HTML 파일을 `file://`로 직접 열면 API 요청과 로컬 저장소 동작이 브라우저에 따라 달라질 수 있으므로 로컬 HTTP 서버에서 엽니다.

## Spring API의 CORS 설정

브라우저에서 게시판과 Spring API의 주소가 다르므로 Spring Security에서 CORS를 허용해야 합니다.

`SecurityConfig` 또는 Spring Security 설정 파일에 다음 CORS 설정을 추가합니다.
```arduino
@Bean
public UrlBasedCorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of("http://127.0.0.1:8000"));
    config.setAllowedMethods(List.of("GET", "POST", "OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/api/**", config);
    return source;
}
```

기존 `SecurityFilterChain` 설정에서는 CORS를 활성화합니다.
```less
http
    .cors(Customizer.withDefaults())
    .csrf(AbstractHttpConfigurer::disable);
```

바닐라 게시판은 기본 포트인 8000에서 실행해야 이 CORS 주소와 일치합니다.
