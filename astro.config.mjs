// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// 사용자 페이지(hyperion0328.github.io)로 배포한다.
// 저장소 이름이 `<username>.github.io` 인 경우에만 `base` 가 필요 없다.
// 프로젝트 페이지(`/repo-name`)로 옮기게 되면 base 를 반드시 추가해야
// CSS·이미지 경로가 깨지지 않는다.
export default defineConfig({
  site: 'https://hyperion0328.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
