import React from 'react';
import { Bot, Mail } from 'lucide-react';
import { Language } from '../types';
import { TranslateIcon } from './TranslateIcon';

interface ResumeSectionProps {
  language: Language;
  onOpenAiChat: () => void;
  onToggleLanguage: () => void;
}

const RESUME_TEXT = {
  zh: {
    title: '简历',
    heading: '获取我的简历',
    desc: '为保护个人隐私，简历不在线公开展示。',
    action: '如需我的完整简历，请通过以下方式联系：',
    emailLabel: '发送邮件获取',
    skills: ['AIGC 产品研发', '创意视频制作', '全栈开发', '开源项目维护'],
    highlights: [
      { label: '教育', value: '华南师范大学 · 软件工程' },
      { label: '方向', value: 'AIGC 创意技术产研' },
      { label: '开源', value: 'Flovart — AI 绘画协作白板' },
    ],
  },
  en: {
    title: 'Resume',
    heading: 'Get My Resume',
    desc: 'Resume is not publicly displayed to protect personal privacy.',
    action: 'For my full resume, please reach out via:',
    emailLabel: 'Email to request',
    skills: ['AIGC R&D', 'Creative Video', 'Full-Stack Dev', 'Open Source'],
    highlights: [
      { label: 'Education', value: 'SCNU · Software Engineering' },
      { label: 'Focus', value: 'AIGC Creative Tech R&D' },
      { label: 'Open Source', value: 'Flovart — AI Drawing Whiteboard' },
    ],
  },
};

export const ResumeSection: React.FC<ResumeSectionProps> = ({ language, onOpenAiChat, onToggleLanguage }) => {
  const t = RESUME_TEXT[language];

  return (
    <div className="min-h-[100dvh] md:h-[100dvh] w-full bg-cream flex flex-col overflow-hidden relative">
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[50%] w-px h-full bg-primary/5" />
        <div className="absolute top-0 left-[25%] w-px h-full bg-primary/5 hidden lg:block" />
        <div className="absolute top-0 left-[75%] w-px h-full bg-primary/5 hidden lg:block" />
      </div>

      {/* Top Bar */}
      <div className="flex border-b-2 border-primary relative z-10 flex-shrink-0">
        <div className="flex-1 pt-4 pb-3 md:pt-6 md:pb-4 px-4 md:px-6 flex items-center justify-between">
          <span className="text-sm font-black text-primary tracking-tight uppercase">
            {t.title}
          </span>
          <div className="md:hidden flex items-center gap-1 -mr-2">
            <button
              onClick={onOpenAiChat}
              className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-primary transition-colors relative"
            >
              <Bot size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#07C160] rounded-full" />
            </button>
            <button
              onClick={onToggleLanguage}
              className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
            >
              <TranslateIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 min-h-0">
        {/* Left: Info */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-8 md:py-0">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-[#E63946]" />
              <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">
                CV / Resume
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-primary leading-tight tracking-tight mb-4">
              {t.heading}
            </h1>

            <p className="text-sm text-primary/60 mb-2">{t.desc}</p>
            <p className="text-sm text-primary/60 mb-8">{t.action}</p>

            <a
              href="mailto:921693422@qq.com?subject=Request%20Resume"
              className="inline-flex items-center gap-3 px-5 py-3 bg-primary text-cream font-bold text-sm hover:bg-[#E63946] transition-colors"
            >
              <Mail size={16} />
              {t.emailLabel}
              <span className="ml-4 font-mono text-[10px] text-cream/50">921693422@qq.com</span>
            </a>
          </div>
        </div>

        {/* Right: Highlights */}
        <div className="md:w-2/5 lg:w-1/3 flex-shrink-0 border-t-2 md:border-t-0 md:border-l-2 border-primary flex flex-col">
          <div className="p-6 border-b border-primary/10">
            <div className="text-[10px] font-mono text-primary/40 uppercase tracking-widest mb-3">
              {language === 'zh' ? '核心技能' : 'Core Skills'}
            </div>
            <div className="flex flex-wrap gap-2">
              {t.skills.map((skill, i) => (
                <span key={i} className="text-[10px] font-bold text-primary px-2 py-1 border border-primary/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {t.highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-primary/10 last:border-b-0">
                <span className="font-mono text-[10px] text-primary/30 w-4 pt-0.5">0{i + 1}</span>
                <div>
                  <p className="text-[10px] font-mono text-primary/40 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-primary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-primary/10">
            <div className="text-[10px] font-mono text-primary/20 uppercase tracking-widest">
              {language === 'zh' ? '隐私优先 · 按需提供' : 'Privacy First · Available on Request'}
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 md:hidden bg-cream" />
    </div>
  );
};
