import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
  성능 수치는 측정 조건 없이 쓸 수 없다.
  "mAP 0.87" (X) -> "mAP@0.5 0.87 / 검증셋 1,200장, YOLOv8n 파인튜닝" (O)
  condition 을 필수(min 1)로 둬서 조건 없는 수치는 빌드가 실패하도록 강제한다.
*/
const metric = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  condition: z.string().min(1, '성능 수치에는 측정 조건이 반드시 있어야 한다'),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  /*
    image() 를 쓰려면 schema 를 함수 형태로 받아야 한다.
    src/assets 의 이미지를 참조하면 Astro 가 크기·포맷을 최적화하고
    width/height 를 넣어줘서 로딩 중 레이아웃이 밀리지 않는다.
  */
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      period: z.string(),
      role: z.string(),
      stack: z.array(z.string()).nonempty(),

      // 프로젝트 페이지 고정 순서: 문제 정의 -> 접근 방법 -> 결과(수치) -> 배운 점 -> 링크
      // 1) 문제 정의
      problem: z.string().min(1),
      // 2) 접근 방법 = 본문 마크다운
      // 3) 결과
      results: z.array(metric).nonempty('결과 수치가 최소 하나는 있어야 한다'),
      resultsNote: z.string().optional(),
      // 4) 배운 점
      learned: z.array(z.string()).nonempty(),
      // 5) 링크
      /*
        링크가 하나도 없는 프로젝트(저장소 비공개 등)는 linksNote 로 이유를 밝혀야 한다.
        열리지 않는 링크를 거는 것보다 없는 이유를 적는 편이 낫다.
      */
      links: z
        .object({
          github: z.url().optional(),
          demo: z.url().optional(),
          docs: z.url().optional(),
        })
        .default({}),
      linksNote: z.string().optional(),

      // 결과 아래에 붙는 이미지. alt 는 접근성상 필수라 optional 로 두지 않는다.
      figures: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(1, '모든 이미지에는 alt 가 있어야 한다'),
            caption: z.string().optional(),
          }),
        )
        .optional(),

      order: z.number().default(99),
      draft: z.boolean().default(false),
    }),
});

/*
  영상 작업은 mAP 같은 측정 수치가 없다. projects 스키마에 억지로 넣으면
  results 필수 규칙을 풀어야 하고 그러면 위의 수치 검증 장치가 무력해진다.
  그래서 컬렉션을 분리하고, 여기서는 대신 제작 조건(툴·길이·기여도)을 필수로 둔다.
*/
const motion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/motion' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // 브랜드를 소재로 한 전공 과제다. 실제 발주 작업으로 읽히면 안 되므로 필수로 둔다.
      context: z.string().min(1, '과제/발주 등 작업 성격을 반드시 밝혀야 한다'),
      kind: z.enum(['2D 모션', '3D 모델링 & 모션']),
      // summary·concept 는 포트폴리오 PDF 의 문장을 그대로 옮긴다. 임의로 다시 쓰지 않는다.
      summary: z.string().min(1),
      concept: z.string().min(1),
      tools: z.array(z.string()).nonempty(),
      year: z.string(),
      duration: z.string(),
      contribution: z.string(),
      still: image(),
      stillAlt: z.string().min(1, '모든 이미지에는 alt 가 있어야 한다'),
      order: z.number().default(99),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, motion };
