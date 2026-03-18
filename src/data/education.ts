import { Language, Experience, HonorsData } from '../../types';

export interface EducationPageContent {
  title: string;
  about: string;
  openToWork: string;
  viewHonorsLabel: string;
  honorsTitle: string;
  competitionsTitle: string;
  scholarshipsLabel: string;
  titlesLabel: string;
  experiences: Experience[];
  honors: HonorsData;
}

export const EDUCATION_DATA: Record<Language, EducationPageContent> = {
  zh: {
    title: "我的简历",
    about: "AI AVG制作探索中",
    openToWork: "在职中",
    viewHonorsLabel: "查看在校荣誉",
    honorsTitle: "在校荣誉",
    competitionsTitle: "竞赛奖项",
    scholarshipsLabel: "奖学金",
    titlesLabel: "荣誉称号",
    experiences: [
      {
        id: 'edu1',
        year: '2021 - 2025',
        title: '软件工程',
        institution: '华南师范大学',
        description: '软件工程专业本科',
        type: 'education'
      },
      {
        id: 'work1',
        year: '2025 - 至今',
        title: 'AIGC产研工程师',
        institution: '央企',
        description: 'AIGC相关产品研发工程师',
        type: 'work'
      }
    ],
    honors: { scholarships: [], titles: [], competitions: [] }
  },
  en: {
    title: "My Resume",
    about: "Exploring AI AVG production",
    openToWork: "Employed",
    viewHonorsLabel: "View Honors & Awards",
    honorsTitle: "Honors & Awards",
    competitionsTitle: "Competition Awards",
    scholarshipsLabel: "Scholarships",
    titlesLabel: "Honorary Titles",
    experiences: [
      {
        id: 'edu1',
        year: '2021 - 2025',
        title: 'Software Engineering',
        institution: 'South China Normal University',
        description: 'Bachelor of Software Engineering',
        type: 'education'
      },
      {
        id: 'work1',
        year: '2025 - Present',
        title: 'AIGC R&D Engineer',
        institution: 'State-owned Enterprise',
        description: 'AIGC product research and development engineer',
        type: 'work'
      }
    ],
    honors: { scholarships: [], titles: [], competitions: [] }
  }
};
