/*
  이력서 정보. 원본은 저장소 밖의 `박현민_이력서.hwp` 이다.

  IMPORTANT — 여기에 개인정보를 넣지 않는다.
  원본의 신분증 번호, 연락처 번호, 자택 주소, 한자 이름은 의도적으로 전부 제외했다.
  연락 수단은 이메일만 노출한다 (CLAUDE.md 규칙).
*/

export type Row = {
  period: string;
  title: string;
  detail?: string;
  note?: string;
};

export const education: Row[] = [
  {
    period: '2021.03 ~ 2024.02',
    title: '대림대학교',
    detail: '영상디자인전공',
    note: '졸업 · 학점 3.56',
  },
  {
    period: '2018.03 ~ 2021.02',
    title: '관양고등학교',
    note: '졸업',
  },
];

export const credentials: Row[] = [
  {
    period: '2026.07.27',
    title: 'ICT AWARD KOREA 2026 장려상',
    detail: '한국정보과학진흥협회',
  },
  {
    period: '2021.04.05',
    title: '자동차운전면허 2종 보통',
    detail: '경기도남부경찰청',
  },
];

/** 원본의 '컴퓨터 활용 능력' 표. 등급 표기(상/중)를 그대로 옮겼다. */
export const tools: { level: string; items: string[] }[] = [
  { level: '상', items: ['Illustrator', 'After Effects', 'Premiere Pro', 'Maya'] },
  { level: '중', items: ['Photoshop', 'Cinema 4D', 'Word · Excel · PowerPoint'] },
];

export const training: Row[] = [
  { period: '2022.10.19', title: '취업경쟁력강화 (취업특강)', detail: '대림대학교 취업팀' },
  { period: '2022.05.09', title: '학습검사', detail: '대림대학교 교수학습센터' },
  { period: '2021.10.14', title: '인성체험프로그램', detail: '대림대학교 교수학습센터' },
  { period: '2021.09.01', title: '자기개발컨텐츠', detail: '대림대학교 교수학습센터' },
];

export const work: Row[] = [
  { period: '2026.03 ~', title: '프랭크버거 범계역점', detail: '주방보조, 포장, 마감 및 청소' },
  {
    period: '2024.09 ~ 2025.08',
    title: '롯데백화점 평촌점 에비뉴엘 라운지',
    detail: '음료제조, 서빙, 고객응대',
  },
  { period: '2024.06 ~ 2024.12', title: '이마트24 안양원평점', detail: '매장관리, 캐셔, 물류' },
  { period: '2023.08 ~ 2024.05', title: '죠이당구장', detail: '고객응대, 청소' },
  { period: '2021.08 ~ 2022.07', title: '미니스톱', detail: '카운터, 검수, 매장관리, 물류정리' },
  { period: '2021.05 ~ 2021.12', title: '대훈양꼬치', detail: '홀서빙' },
];

export const email = 'parkhm1477@gmail.com';
