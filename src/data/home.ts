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
      { text: "AIGC产品研发", annotation: "（创意工具开发）", category: Category.DEV },
      { text: "创意视频制作", annotation: "（二创/特效）", category: Category.VIDEO },
      { text: "开源项目", annotation: "（Flovart）", category: Category.DEV }
    ],
    intro: "AIGC创意工程师，用代码和视频讲故事。|华南师范大学·软件工程 | 央企AIGC产研",
    selectedWorks: "精选作品",
    years: "[ 2025 — NOW ]"
  },
  en: {
    heroItems: [
      { text: "AIGC R&D", annotation: "(Creative Tools)", category: Category.DEV },
      { text: "Video Creation", annotation: "(Fan-made/VFX)", category: Category.VIDEO },
      { text: "Open Source", annotation: "(Flovart)", category: Category.DEV }
    ],
    intro: "AIGC Creative Engineer. Code & video storyteller. | SCNU Software Engineering | State-owned Enterprise AIGC R&D",
    selectedWorks: "Selected Works",
    years: "[ 2025 — NOW ]"
  }
};
