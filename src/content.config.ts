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
      links: z
        .object({
          github: z.url().optional(),
          demo: z.url().optional(),
          docs: z.url().optional(),
        })
        .refine((l) => l.github || l.demo || l.docs, {
          message: '링크가 최소 하나는 있어야 한다',
        }),

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

export const collections = { projects };
