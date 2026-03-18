
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ArticleSection } from './components/ArticleSection';
import { TimelineSection } from './components/TimelineSection';
import { AiChat } from './components/AiChat';
import { Mail, Github, Bot } from 'lucide-react';

// 自定义中英翻译图标
const TranslateIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1024 1024"
    fill="currentColor"
    className={className}
  >
    <path d="M608 416h288c35.36 0 64 28.48 64 64v416c0 35.36-28.48 64-64 64H480c-35.36 0-64-28.48-64-64v-288H128c-35.36 0-64-28.48-64-64V128c0-35.36 28.48-64 64-64h416c35.36 0 64 28.48 64 64v288z m0 64v64c0 35.36-28.48 64-64 64h-64v256.032c0 17.664 14.304 31.968 31.968 31.968H864a31.968 31.968 0 0 0 31.968-31.968V512a31.968 31.968 0 0 0-31.968-31.968H608zM128 159.968V512c0 17.664 14.304 31.968 31.968 31.968H512a31.968 31.968 0 0 0 31.968-31.968V160A31.968 31.968 0 0 0 512.032 128H160A31.968 31.968 0 0 0 128 159.968z m64 244.288V243.36h112.736V176h46.752c6.4 0.928 9.632 1.824 9.632 2.752a10.56 10.56 0 0 1-1.376 4.128c-2.752 7.328-4.128 16.032-4.128 26.112v34.368h119.648v156.768h-50.88v-20.64h-68.768v118.272H306.112v-118.272H238.752v24.768H192z m46.72-122.368v60.48h67.392V281.92H238.752z m185.664 60.48V281.92h-68.768v60.48h68.768z m203.84 488H576L668.128 576h64.64l89.344 254.4h-54.976l-19.264-53.664h-100.384l-19.232 53.632z m33.024-96.256h72.864l-34.368-108.608h-1.376l-37.12 108.608zM896 320h-64a128 128 0 0 0-128-128V128a192 192 0 0 1 192 192zM128 704h64a128 128 0 0 0 128 128v64a192 192 0 0 1-192-192z" />
  </svg>
);
import { CONTACT_DATA } from './src/data/contact';
import { PROJECTS } from './constants';
import { toJsDelivr } from './src/utils/cdn';

import { Language, Category } from './types';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 根据路由路径获取当前 tab
  const getTabFromPath = (pathname: string) => {
    if (pathname === '/home' || pathname === '/') return 'dashboard';
    if (pathname.startsWith('/portfolio')) return 'portfolio';
    if (pathname.startsWith('/articles')) return 'articles';
    if (pathname === '/about') return 'about';
    if (pathname === '/contact') return 'contact';
    return 'dashboard';
  };
  
  const activeTab = getTabFromPath(location.pathname);
  
  const setActiveTab = (tab: string) => {
    const pathMap: Record<string, string> = {
      'dashboard': '/home',
      'portfolio': '/portfolio',
      'articles': '/articles',
      'about': '/about',
      'contact': '/contact'
    };
    navigate(pathMap[tab] || '/home');
  };
  
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // 编辑模式：连续点击4次 logo 激活
  const [editorMode, setEditorMode] = useState(false);
  const logoClickCountRef = useRef(0);
  const logoClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleLogoClick = () => {
    logoClickCountRef.current += 1;
    
    // 清除之前的计时器
    if (logoClickTimerRef.current) {
      clearTimeout(logoClickTimerRef.current);
    }
    
    // 如果达到4次点击，切换编辑模式
    if (logoClickCountRef.current >= 4) {
      setEditorMode(prev => !prev);
      logoClickCountRef.current = 0;
      return;
    }
    
    // 1.5秒内没有继续点击则重置计数
    logoClickTimerRef.current = setTimeout(() => {
      logoClickCountRef.current = 0;
    }, 1500);
  };
  
  const [portfolioCategory, setPortfolioCategory] = useState<string>('All');
  const [triggerNewProject, setTriggerNewProject] = useState(false);
  const [initialProjectId, setInitialProjectId] = useState<string | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  
  // 首次访问引导提示
  const [showGuide, setShowGuide] = useState(true);
  
  const dismissGuide = () => {
    setShowGuide(false);
  };

  // 处理新建作品
  const handleNewProject = () => {
    setActiveTab('portfolio');
    setTriggerNewProject(true);
    // 重置触发器
    setTimeout(() => setTriggerNewProject(false), 100);
  };
  
  const [copySuccess, setCopySuccess] = useState(false);

  // 复制邮箱并显示反馈
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('921693422@qq.com');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // 降级方案：使用传统方式复制
      const textArea = document.createElement('textarea');
      textArea.value = '921693422@qq.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const startViewTransition = (update: () => void) => {
    // 直接执行更新，避免View Transitions API导致的闪烁
    update();
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } 
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // 预加载作品封面图
  useEffect(() => {
    const preloadImages = () => {
      const allProjects = PROJECTS['zh'];
      allProjects.forEach(project => {
        if (project.image) {
          const img = new Image();
          img.src = toJsDelivr(project.image);
        }
      });
    };
    // 延迟执行，不阻塞首屏渲染
    const timer = setTimeout(preloadImages, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const handleHeroNavigation = (category: Category) => {
    startViewTransition(() => {
      setPortfolioCategory(category);
      setActiveTab('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleNavigateToPortfolio = () => {
    startViewTransition(() => {
      setPortfolioCategory('All');
      setActiveTab('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const content = CONTACT_DATA[language];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <HeroSection 
            onNavigate={handleNavigateToPortfolio} 
            onCategorySelect={handleHeroNavigation}
            onProjectSelect={(projectId) => {
              setInitialProjectId(projectId);
              setActiveTab('portfolio');
            }}
            language={language}
            onOpenAiChat={() => setIsAiChatOpen(true)}
            onToggleLanguage={toggleLanguage}
          />
        );
      case 'portfolio':
        return (
          <PortfolioSection 
            language={language} 
            externalFilter={portfolioCategory} 
            triggerNewProject={triggerNewProject}
            initialProjectId={initialProjectId}
            onProjectOpened={() => setInitialProjectId(null)}
            editorMode={editorMode}
            onOpenAiChat={() => setIsAiChatOpen(true)}
            onToggleLanguage={toggleLanguage}
          />
        );
      case 'articles':
        return (
          <ArticleSection 
            language={language} 
            editorMode={editorMode}
            onOpenAiChat={() => setIsAiChatOpen(true)}
            onToggleLanguage={toggleLanguage}
          />
        );
      case 'about':
        return (
          <TimelineSection 
            language={language}
            onOpenAiChat={() => setIsAiChatOpen(true)}
            onToggleLanguage={toggleLanguage}
          />
        );
      case 'contact':
        return (
          <div className="min-h-[100dvh] md:h-[100dvh] w-full bg-cream flex flex-col overflow-hidden relative">
            {/* Grid Overlay - 国际主义网格背景 */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-[50%] w-px h-full bg-primary/5" />
              <div className="absolute top-0 left-[25%] w-px h-full bg-primary/5 hidden lg:block" />
              <div className="absolute top-0 left-[75%] w-px h-full bg-primary/5 hidden lg:block" />
            </div>

            {/* Top Bar */}
            <div className="flex border-b-2 border-primary relative z-10 flex-shrink-0">
              <div className="flex-1 pt-4 pb-3 md:pt-6 md:pb-4 px-4 md:px-6 flex items-center justify-between">
                <span className="text-sm font-black text-primary tracking-tight uppercase">
                  {language === 'zh' ? '联系' : 'Contact'}
                </span>
                {/* 移动端右侧图标 */}
                <div className="md:hidden flex items-center gap-1 -mr-2">
                  <button
                    onClick={() => setIsAiChatOpen(true)}
                    className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-primary transition-colors relative"
                  >
                    <Bot size={16} />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#07C160] rounded-full" />
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
                  >
                    <TranslateIcon size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row relative z-10 min-h-0">
              {/* Left Column - Main Title */}
              <div className="flex-1 flex flex-col justify-between px-4 md:px-6 py-4 md:py-8 min-h-0">
                
                {/* 移动端联系信息列表 - 国际主义风格名片 */}
                <div className="md:hidden space-y-0 border-2 border-primary bg-cream">
                  {/* Email */}
                  <div 
                    className={`flex items-center justify-between px-4 py-3 border-b border-primary/20 cursor-pointer transition-colors ${copySuccess ? 'bg-[#07C160]/10' : 'active:bg-primary/5'}`}
                    onClick={handleCopyEmail}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-primary/30 w-4">01</span>
                      <Mail size={16} className={copySuccess ? 'text-[#07C160]' : 'text-primary/50'} />
                      <div>
                        <p className={`text-xs font-bold ${copySuccess ? 'text-[#07C160]' : 'text-primary'}`}>{language === 'zh' ? '邮箱' : 'Email'}</p>
                        <p className="font-mono text-[10px] text-primary/40">921693422@qq.com</p>
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] ${copySuccess ? 'text-[#07C160]' : 'text-primary/30'}`}>
                      {copySuccess ? '✓' : '→'}
                    </span>
                  </div>
                  
                  {/* GitHub */}
                  <div 
                    className="flex items-center justify-between px-4 py-3 border-b border-primary/20 cursor-pointer active:bg-primary/5 transition-colors"
                    onClick={() => window.open('https://github.com/Paker-kk', '_blank')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-primary/30 w-4">02</span>
                      <Github size={16} className="text-primary/50" />
                      <div>
                        <p className="text-xs font-bold text-primary">GitHub</p>
                        <p className="font-mono text-[10px] text-primary/40">@Paker-kk</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-primary/30">↗</span>
                  </div>
                  
                  {/* 小红书 */}
                  <div 
                    className="flex items-center justify-between px-4 py-3 border-b border-primary/20 cursor-pointer active:bg-primary/5 transition-colors"
                    onClick={() => window.open('https://www.xiaohongshu.com/user/profile/5ef7232b00000000010069bf', '_blank')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-primary/30 w-4">03</span>
                      <svg className="w-4 h-4 text-primary/50" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                      </svg>
                      <div>
                        <p className="text-xs font-bold text-primary">{language === 'zh' ? '小红书' : 'RedNote'}</p>
                        <p className="font-mono text-[10px] text-primary/40">@avabbbb</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-primary/30">↗</span>
                  </div>
                  
                  {/* B站 */}
                  <div 
                    className="flex items-center justify-between px-4 py-3 cursor-pointer active:bg-primary/5 transition-colors"
                    onClick={() => window.open('https://space.bilibili.com/', '_blank')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-primary/30 w-4">04</span>
                      <svg className="w-4 h-4 text-primary/50" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
                      </svg>
                      <div>
                        <p className="text-xs font-bold text-primary">{language === 'zh' ? 'B站' : 'Bilibili'}</p>
                        <p className="font-mono text-[10px] text-primary/40">@avabbbb</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-primary/30">↗</span>
                  </div>
                </div>
                
                {/* 中间装饰区域 - 交互式蒙德里安网格（移动端） */}
                {(() => {
                  // 随机生成初始网格布局和颜色
                  const colors = ['#E63946', '#1E40AF', '#FFD700', '#FAF7F2'];
                  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
                  const randomize = (base: number) => base * (0.7 + Math.random() * 0.6);
                  
                  const initialCols = [1, 0.8, 1.5, 1].map(randomize);
                  const initialRows = [1.2, 1.8, 0.6, 1].map(randomize);
                  const initialColors = Array(10).fill(0).map(() => getRandomColor());
                  
                  return (
                    <div className="md:hidden flex-1 flex flex-col justify-center py-2 min-h-0">
                      <div 
                        className="mondrian-canvas border-2 border-primary bg-primary flex-1"
                        style={{
                          display: 'grid',
                          gap: '2px',
                          gridTemplateColumns: initialCols.map(n => n + 'fr').join(' '),
                          gridTemplateRows: initialRows.map(n => n + 'fr').join(' '),
                          transition: 'grid-template-columns 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), grid-template-rows 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        }}
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (!target.classList.contains('mondrian-block')) return;
                          
                          // 颜色变化
                          const currentBg = target.style.backgroundColor;
                          let newColor = colors[Math.floor(Math.random() * colors.length)];
                          while (newColor === currentBg) {
                            newColor = colors[Math.floor(Math.random() * colors.length)];
                          }
                          target.style.backgroundColor = newColor;
                          
                          // Grid 布局变化
                          const canvas = target.parentElement;
                          if (!canvas) return;
                          const baseColFr = [1, 0.8, 1.5, 1];
                          const baseRowFr = [1.2, 1.8, 0.6, 1];
                          const isExpand = Math.random() > 0.3;
                          const scaleFactor = isExpand ? (1.3 + Math.random() * 0.5) : (0.5 + Math.random() * 0.3);
                          
                          const newCols = baseColFr.map(fr => {
                            let newFr = fr * (0.9 + Math.random() * 0.2);
                            if (Math.random() > 0.5) newFr *= scaleFactor;
                            return Math.max(0.3, newFr);
                          });
                          const newRows = baseRowFr.map(fr => {
                            let newFr = fr * (0.9 + Math.random() * 0.2);
                            if (Math.random() > 0.5) newFr *= scaleFactor;
                            return Math.max(0.3, newFr);
                          });
                          
                          canvas.style.gridTemplateColumns = newCols.map(n => n + 'fr').join(' ');
                          canvas.style.gridTemplateRows = newRows.map(n => n + 'fr').join(' ');
                        }}
                      >
                        <div className="mondrian-block" style={{ gridColumn: '1/2', gridRow: '1/2', backgroundColor: initialColors[0], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '2/4', gridRow: '1/2', backgroundColor: initialColors[1], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '4/5', gridRow: '1/3', backgroundColor: initialColors[2], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '1/2', gridRow: '2/4', backgroundColor: initialColors[3], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '2/3', gridRow: '2/3', backgroundColor: initialColors[4], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '3/4', gridRow: '2/3', backgroundColor: initialColors[5], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '2/4', gridRow: '3/4', backgroundColor: initialColors[6], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '4/5', gridRow: '3/5', backgroundColor: initialColors[7], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '1/3', gridRow: '4/5', backgroundColor: initialColors[8], cursor: 'pointer' }} />
                        <div className="mondrian-block" style={{ gridColumn: '3/4', gridRow: '4/5', backgroundColor: initialColors[9], cursor: 'pointer' }} />
                      </div>
                    </div>
                  );
                })()}
                
                {/* Bottom - Main Title */}
                <div className="mt-auto">
                  <div className="flex items-end gap-4 mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#E63946]" />
                    <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">Get In Touch</span>
                  </div>
                  <h1 className="text-[18vw] md:text-[12vw] lg:text-[9vw] font-black text-primary leading-[0.85] tracking-tighter animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    {language === 'zh' ? '联系' : 'CONTACT'}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 md:mt-3">
                    <div className="flex-1 h-px bg-primary/20" />
                    <span className="text-[10px] font-mono text-primary/40">©2025</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact List */}
              <div className="hidden md:flex flex-col w-1/2 lg:w-2/5 border-l-2 border-primary">
                {/* Contact Items */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* 01 - Email */}
                  <div 
                    className={`group border-b border-primary/10 py-5 px-8 flex items-center justify-between cursor-pointer transition-all duration-300 animate-fade-in ${copySuccess ? 'bg-[#07C160]/10' : 'hover:bg-[#E63946]/5'}`}
                    style={{ animationDelay: '0.2s' }}
                    onClick={handleCopyEmail}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-primary/30">01</span>
                      <Mail size={18} className={`transition-colors ${copySuccess ? 'text-[#07C160]' : 'text-primary/40 group-hover:text-[#E63946]'}`} />
                      <div>
                        <h3 className={`font-bold transition-colors ${copySuccess ? 'text-[#07C160]' : 'text-primary group-hover:text-[#E63946]'}`}>{language === 'zh' ? '邮箱' : 'Email'}</h3>
                        <p className="font-mono text-xs text-primary/40">921693422@qq.com</p>
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] transition-colors ${copySuccess ? 'text-[#07C160]' : 'text-primary/30 group-hover:text-[#E63946]'}`}>
                      {copySuccess ? '✓' : (language === 'zh' ? '复制' : 'COPY')}
                    </span>
                  </div>

                  {/* 02 - 小红书 */}
                  <div 
                    className="group border-b border-primary/10 py-5 px-8 flex items-center justify-between cursor-pointer hover:bg-[#EC4048]/5 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: '0.3s' }}
                    onClick={() => window.open('https://www.xiaohongshu.com/user/profile/5ef7232b00000000010069bf', '_blank')}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-primary/30">02</span>
                      <svg className="w-[18px] h-[18px] text-primary/40 group-hover:text-[#EC4048] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                      </svg>
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-[#EC4048] transition-colors">{language === 'zh' ? '小红书' : 'RedNote'}</h3>
                        <p className="font-mono text-xs text-primary/40">@avabbbb</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-primary/30 group-hover:text-[#EC4048] transition-colors">→</span>
                  </div>

                  {/* 03 - GitHub */}
                  <div 
                    className="group border-b border-primary/10 py-5 px-8 flex items-center justify-between cursor-pointer hover:bg-[#E63946]/5 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: '0.4s' }}
                    onClick={() => window.open('https://github.com/Paker-kk', '_blank')}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-primary/30">03</span>
                      <Github size={18} className="text-primary/40 group-hover:text-[#E63946] transition-colors" />
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-[#E63946] transition-colors">GitHub</h3>
                        <p className="font-mono text-xs text-primary/40">@Paker-kk</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-primary/30 group-hover:text-[#E63946] transition-colors">→</span>
                  </div>

                  {/* 04 - B站 */}
                  <div 
                    className="group border-b border-primary/10 py-5 px-8 flex items-center justify-between cursor-pointer hover:bg-[#00A1D6]/5 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: '0.5s' }}
                    onClick={() => window.open('https://space.bilibili.com/', '_blank')}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-primary/30">04</span>
                      <svg className="w-[18px] h-[18px] text-primary/40 group-hover:text-[#00A1D6] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386z"/>
                      </svg>
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-[#00A1D6] transition-colors">{language === 'zh' ? 'B站' : 'Bilibili'}</h3>
                        <p className="font-mono text-xs text-primary/40">@avabbbb</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-primary/30 group-hover:text-[#00A1D6] transition-colors">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="relative z-10 border-t-2 border-primary flex-shrink-0">
              {/* Info Row - 移动端隐藏 */}
              <div className="hidden md:flex justify-between items-center text-[10px] tracking-widest uppercase text-primary/40 px-6 py-2 md:py-3 border-b border-primary/10">
                <span className="font-mono">AVABBBB—CONTACT</span>
                <span className="hidden md:block">{language === 'zh' ? '邮箱 / 社交 / 视频' : 'EMAIL / SOCIAL / VIDEO'}</span>
                <span className="font-mono">©2026</span>
              </div>

              {/* Black CTA Bar */}
              <div 
                onClick={handleCopyEmail}
                className={`${copySuccess ? 'bg-[#07C160]' : 'bg-primary active:bg-[#07C160] md:hover:bg-[#E63946]'} text-cream px-6 pt-5 pb-9 md:py-6 flex justify-between items-center cursor-pointer transition-colors duration-300 group animate-fade-in`}
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-cream/40 group-hover:text-cream/60">{copySuccess ? '✓' : '→'}</span>
                  <span className="text-base md:text-xl font-black uppercase tracking-wide">
                    {copySuccess 
                      ? (language === 'zh' ? '已复制到剪贴板' : 'Copied to Clipboard')
                      : (language === 'zh' ? '复制邮箱地址' : 'Copy Email Address')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-cream/40 hidden md:block">921693422@qq.com</span>
                  <Mail size={20} className="group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              {/* 移动端底部导航栏占位 */}
              <div className="h-12 md:hidden bg-cream" />
            </div>
          </div>
        )
      default:
        return (
          <>
            <HeroSection 
              onNavigate={handleNavigateToPortfolio} 
              onCategorySelect={handleHeroNavigation}
              language={language}
              onOpenAiChat={() => setIsAiChatOpen(true)}
              onToggleLanguage={toggleLanguage}
            />
            <PortfolioSection 
              language={language} 
              externalFilter={portfolioCategory}
              onOpenAiChat={() => setIsAiChatOpen(true)}
              onToggleLanguage={toggleLanguage}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-full bg-cream text-primary font-sans selection:bg-primary selection:text-cream transition-colors duration-300">
      
      {/* Dynamic Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => startViewTransition(() => setActiveTab(tab))} 
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        onNewProject={handleNewProject}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        editorMode={editorMode}
        onLogoClick={handleLogoClick}
      />

      {/* AI Chat Modal */}
      <AiChat 
        isOpen={isAiChatOpen} 
        onClose={() => setIsAiChatOpen(false)} 
        language={language}
        onNavigateToPortfolio={() => {
          setPortfolioCategory('All');
          setActiveTab('portfolio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToProject={(projectId) => {
          setInitialProjectId(projectId);
          setPortfolioCategory('All');
          setActiveTab('portfolio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 固定背景层 - 防止Portal渲染时闪烁 */}
      {(activeTab === 'portfolio' || activeTab === 'articles') && (
        <>
          {/* 侧边栏背景 */}
          <div 
            className="hidden md:block fixed bg-cream border-r border-primary/10"
            style={{ top: 0, bottom: 0, left: 56, width: 176, zIndex: 30 }}
          />
          {/* 面包屑背景 */}
          <div 
            className="hidden md:block fixed top-0 right-0 bg-cream border-b border-primary/10"
            style={{ left: 232, height: 57, zIndex: 15 }}
          />
        </>
      )}

      {/* Main Content Area - Offset for narrow left sidebar on desktop */}
      <main className="w-full md:pl-14 vt-page relative">
         
         <div key={activeTab}>
           {renderContent()}
         </div>
      </main>

      {/* 首次访问引导气泡 */}
      {showGuide && (
        <div 
          className="hidden md:block fixed z-[60] animate-fade-in cursor-pointer group"
          style={{ left: 62, bottom: 33 }}
          onClick={dismissGuide}
        >
          <div className="bg-[#E63946] text-cream px-5 py-4 w-[180px] border-2 border-primary">
            <div className="text-sm font-bold tracking-wide mb-1">
              <span className="group-hover:hidden">AI / 中英</span>
              <span className="hidden group-hover:inline">GOT IT</span>
            </div>
            <div className="text-xs text-cream/70">
              <span className="group-hover:hidden">{language === 'zh' ? '左下角可切换' : 'Bottom left to switch'}</span>
              <span className="hidden group-hover:inline">{language === 'zh' ? '点击关闭' : 'Click to close'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </HashRouter>
  );
}
