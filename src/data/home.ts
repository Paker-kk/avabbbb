import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation: string;
  category: Category | null;
}

export interface HomeContent {
  heroItems: HeroItem[];
  intro: string;
  selectedWorks: string;
  years: string;
}

export const HOME_DATA: Record<Language, HomeContent> = {
  zh: {
    heroItems: [
      { text: "AIGC开发", annotation: "（创意工具）", category: Category.DEV },
      { text: "视频创作", annotation: "（二创/特效）", category: Category.VIDEO },
      { text: "软件工程", annotation: "（本职工作）", category: Category.DEV },
      { text: "AI短剧", annotation: "（AVG探索中）", category: null },
      { text: "社交媒体", annotation: "（小红书/B站）", category: null }
    ],
    intro: "AI AVG制作探索中。|华南师范大学软件工程毕业，央企AIGC产研工程师，业余创作者。",
    selectedWorks: "精选作品",
    years: "[ 2025 — NOW ]"
  },
  en: {
    heroItems: [
      { text: "AIGC Dev", annotation: "(Creative Tools)", category: Category.DEV },
      { text: "Video Creation", annotation: "(Fan-made/VFX)", category: Category.VIDEO },
      { text: "Software Eng", annotation: "(Day Job)", category: Category.DEV },
      { text: "AI AVG", annotation: "(Exploring)", category: null },
      { text: "Social Media", annotation: "(XHS/Bilibili)", category: null }
    ],
    intro: "Exploring AI AVG production. | SCNU Software Engineering graduate, AIGC R&D engineer at a state-owned enterprise, indie creator.",
    selectedWorks: "Selected Works",
    years: "[ 2025 — NOW ]"
  }
};
