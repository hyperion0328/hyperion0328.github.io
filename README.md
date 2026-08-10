# hyperion0328.github.io

박현민의 개인 포트폴리오 사이트. Astro로 만들고 GitHub Pages로 배포한다.

- 배포 주소: https://hyperion0328.github.io
- 사용자 페이지(`<username>.github.io`)이므로 `astro.config.mjs` 에 `base` 설정이 **필요 없다.**
  프로젝트 페이지로 옮기면 `base: '/저장소이름'` 을 반드시 추가해야 CSS·이미지 경로가 살아난다.

## 현재 상태 — 아직 배포되지 않는다

저장소가 private 이라 GitHub Pages 자동 배포를 꺼 둔 상태다.
Pages 는 private 저장소에서 유료 플랜을 요구하므로, 켜 두면 push 마다 배포가 실패한다.

공개할 때 할 일:

1. 저장소를 public 으로 전환
2. Settings → Pages → Source 를 **GitHub Actions** 로 설정
3. `.github/workflows/deploy.yml` 의 `push:` 트리거 주석 3줄을 해제

그 전에도 `workflow_dispatch` 로 워크플로를 수동 실행해 빌드만 확인할 수 있다.

## 명령어

```bash
pnpm install       # 의존성 설치
pnpm dev           # 로컬 개발 서버 (localhost:4321)
pnpm build         # 프로덕션 빌드 -> dist/
pnpm preview       # 빌드 결과 로컬 확인
pnpm check         # 타입 · 콘텐츠 스키마 검사
```

## 구조

```
src/
  components/      # 재사용 UI
  layouts/         # 페이지 레이아웃
  pages/           # 라우트 (파일명 = URL)
  content/
    projects/      # 프로젝트별 Markdown — 콘텐츠의 단일 소스
  styles/          # 전역 스타일, 디자인 토큰
public/            # 그대로 서빙되는 정적 파일
```

## 콘텐츠 규칙

프로젝트 페이지는 **문제 정의 → 접근 방법 → 결과(수치) → 배운 점 → 링크** 순서로 렌더링된다.
이 순서는 `src/pages/projects/[...id].astro` 템플릿이 강제하므로 Markdown 작성 순서와 무관하다.

| frontmatter   | 역할                                           |
| ------------- | ---------------------------------------------- |
| `problem`     | 문제 정의                                      |
| 본문 마크다운 | 접근 방법                                      |
| `results[]`   | 결과. `label` / `value` / **`condition` 필수** |
| `learned[]`   | 배운 점                                        |
| `links`       | GitHub · 데모 · 문서 중 최소 하나              |

**성능 수치는 측정 조건 없이 쓸 수 없다.** `results[].condition` 이 비어 있으면
스키마 검증에서 빌드가 실패한다.

- `mAP 0.87` — 안 됨
- `mAP@0.5 0.87 / 검증셋 1,200장, YOLOv8n 파인튜닝` — 됨

## 하지 말 것

- 전화번호·집 주소 등 개인정보를 넣지 않는다. 연락은 이메일과 링크드인만.
- 색상·폰트 크기를 컴포넌트에 하드코딩하지 않는다. `src/styles/global.css` 의 토큰만 쓴다.
- 외부 이미지·폰트를 CDN에서 핫링크하지 않는다. `public/` 에 넣고 셀프 호스팅한다.
- `dist/` 를 직접 수정하지 않는다.
