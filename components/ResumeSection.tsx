import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Language } from '../types';

// 自定义中英翻译图标（与 App.tsx 保持一致）
const TranslateIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024" fill="currentColor" className={className}>
    <path d="M608 416h288c35.36 0 64 28.48 64 64v416c0 35.36-28.48 64-64 64H480c-35.36 0-64-28.48-64-64v-288H128c-35.36 0-64-28.48-64-64V128c0-35.36 28.48-64 64-64h416c35.36 0 64 28.48 64 64v288z m0 64v64c0 35.36-28.48 64-64 64h-64v256.032c0 17.664 14.304 31.968 31.968 31.968H864a31.968 31.968 0 0 0 31.968-31.968V512a31.968 31.968 0 0 0-31.968-31.968H608zM128 159.968V512c0 17.664 14.304 31.968 31.968 31.968H512a31.968 31.968 0 0 0 31.968-31.968V160A31.968 31.968 0 0 0 512.032 128H160A31.968 31.968 0 0 0 128 159.968z m64 244.288V243.36h112.736V176h46.752c6.4 0.928 9.632 1.824 9.632 2.752a10.56 10.56 0 0 1-1.376 4.128c-2.752 7.328-4.128 16.032-4.128 26.112v34.368h119.648v156.768h-50.88v-20.64h-68.768v118.272H306.112v-118.272H238.752v24.768H192z m46.72-122.368v60.48h67.392V281.92H238.752z m185.664 60.48V281.92h-68.768v60.48h68.768z m203.84 488H576L668.128 576h64.64l89.344 254.4h-54.976l-19.264-53.664h-100.384l-19.232 53.632z m33.024-96.256h72.864l-34.368-108.608h-1.376l-37.12 108.608zM896 320h-64a128 128 0 0 0-128-128V128a192 192 0 0 1 192 192zM128 704h64a128 128 0 0 0 128 128v64a192 192 0 0 1-192-192z" />
  </svg>
);

interface ResumeSectionProps {
  language: Language;
  onOpenAiChat: () => void;
  onToggleLanguage: () => void;
}

// 简历 PDF 路径（放在 public/ 目录下）
const RESUME_PDF: Record<Language, string> = {
  zh: `${import.meta.env.BASE_URL}resume-zh.pdf`,
  en: `${import.meta.env.BASE_URL}resume-en.pdf`,
};

export const ResumeSection: React.FC<ResumeSectionProps> = ({ language, onOpenAiChat, onToggleLanguage }) => {
  const [pdfError, setPdfError] = useState(false);
  const pdfUrl = RESUME_PDF[language];

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
            {language === 'zh' ? '简历' : 'Resume'}
          </span>
          {/* 移动端右侧图标 */}
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
      <div className="flex-1 flex flex-col relative z-10 min-h-0">
        {/* Download Bar */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-primary/10 bg-cream/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary/30 uppercase tracking-widest">
              PDF
            </span>
            <span className="text-xs text-primary/60">
              {language === 'zh' ? '在线预览 · 点击下方按钮下载' : 'Online preview · Click button below to download'}
            </span>
          </div>
          <a
            href={pdfUrl}
            download
            className="px-4 py-1.5 text-xs font-bold border-2 border-primary text-primary hover:bg-primary hover:text-cream transition-colors uppercase tracking-wider"
          >
            {language === 'zh' ? '下载 PDF' : 'Download'}
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 min-h-0">
          {pdfError ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-4">
              <div className="text-center space-y-3">
                <div className="text-6xl font-black text-primary/10">PDF</div>
                <p className="text-sm text-primary/50">
                  {language === 'zh' 
                    ? '简历文件暂未上传，请将 PDF 文件放入 public/ 目录' 
                    : 'Resume file not yet uploaded. Place PDF in public/ directory'}
                </p>
                <p className="text-xs text-primary/30 font-mono">
                  public/resume-zh.pdf · public/resume-en.pdf
                </p>
              </div>
              <a
                href={pdfUrl}
                download
                className="px-6 py-2.5 text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-cream transition-colors"
              >
                {language === 'zh' ? '尝试下载' : 'Try Download'}
              </a>
            </div>
          ) : (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title={language === 'zh' ? '简历预览' : 'Resume Preview'}
              onError={() => setPdfError(true)}
            >
              <p>
                {language === 'zh' 
                  ? '您的浏览器不支持 PDF 预览。' 
                  : 'Your browser does not support PDF preview.'}
                <a href={pdfUrl} download className="underline text-[#E63946]">
                  {language === 'zh' ? '点击下载' : 'Click to download'}
                </a>
              </p>
            </iframe>
          )}
        </div>
      </div>
    </div>
  );
};
