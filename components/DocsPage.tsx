import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BookOpen, Command, Sparkles, Shield, Rocket, HelpCircle } from 'lucide-react';

export const DocsPage: React.FC = () => {
  const sections = [
    { id: 'projects', title: 'Workspaces & Projects', icon: <Rocket size={18} /> },
    { id: 'tasks', title: 'Task Management', icon: <BookOpen size={18} /> },
    { id: 'customization', title: 'Customization', icon: <Sparkles size={18} /> },
    { id: 'privacy', title: 'Privacy & Security', icon: <Shield size={18} /> },
    { id: 'faq', title: 'FAQ', icon: <HelpCircle size={18} /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 transition-colors duration-300 bg-gray-50 dark:bg-black overflow-y-auto">
      <div 
        className="w-full max-w-[1600px] bg-white dark:bg-gray-900 rounded-[2rem] shadow-soft overflow-hidden relative transition-colors duration-300 flex flex-col"
        style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}
      >
        <div className="relative w-full h-auto min-h-[300px] rounded-[1.8rem] m-0 sm:m-2 bg-hero-gradient dark:bg-hero-gradient-dark flex flex-col items-center overflow-hidden transition-all duration-500">
          <div className="absolute inset-0 pointer-events-none bg-pattern-dots bg-repeat opacity-100 mix-blend-multiply dark:mix-blend-soft-light"></div>
          <Navbar />
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 relative z-10 w-full max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                Documentation
             </h1>
             <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl px-4">
                Master your workflow with the TABA guide. Everything from basic task setup to advanced AI prioritization.
             </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-grow px-6 py-12 gap-8 max-w-7xl mx-auto w-full">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-1">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">On This Page</p>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white group"
                        >
                            <span className="text-gray-400 group-hover:text-accent-yellow transition-colors">
                                {section.icon}
                            </span>
                            {section.title}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Content */}
            <main className="flex-grow min-w-0 bg-white dark:bg-gray-900">
                <div className="prose dark:prose-invert max-w-none">
                    <section id="projects" className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Workspaces & Projects</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            TABA organizes your work into Projects. Each project can have its own set of tasks, themes, and settings.
                        </p>
                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <h4 className="font-bold flex items-center gap-2 mb-2">Creating Projects</h4>
                                <p className="m-0 text-gray-600 dark:text-gray-400">Click the <strong>+</strong> icon in the sidebar "Projects" section to create a new workspace with a custom name and badge color.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <h4 className="font-bold flex items-center gap-2 mb-2">Quick Management</h4>
                                <p className="m-0 text-gray-600 dark:text-gray-400">Right-click any project in the sidebar to <strong>Rename</strong>, <strong>Change Color</strong>, or <strong>Delete</strong> the project.</p>
                            </div>
                        </div>
                    </section>

                    <section id="tasks" className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-left">Task Management</h2>
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <h4 className="font-bold mb-2">Adding Tasks</h4>
                                <p className="m-0 text-gray-600 dark:text-gray-400">Use the "New Task" button in the board header to create tasks with titles, descriptions, due dates, and priority levels.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <h4 className="font-bold mb-2">Kanban Workflow</h4>
                                <p className="m-0 text-gray-600 dark:text-gray-400">Drag and drop tasks between <strong>Todo</strong>, <strong>Doing</strong>, and <strong>Done</strong> columns to track your progress visually.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <h4 className="font-bold mb-2">Advanced Sorting</h4>
                                <p className="m-0 text-gray-600 dark:text-gray-400">Click the <strong>List icon</strong> in the header to sort your board by <em>Due Date</em> or <em>Priority</em>. Use the filter bar to quickly isolate High vs Low priority items.</p>
                            </div>
                        </div>
                    </section>

                    <section id="customization" className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-left">Customization</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <h4 className="font-bold mb-2">Board Themes</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Right-click the board background to change the appearance (Slate, Blue, Amber) of your current workspace.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <h4 className="font-bold mb-2">Appearance</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between Dark and Light mode globally to suit your environment and reduce eye strain.</p>
                            </div>
                        </div>
                    </section>

                    <section id="privacy" className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-left">Privacy & Security</h2>
                        <p className="text-gray-600 dark:text-gray-400 px-2 leading-relaxed">
                            Your data stays local and secure. TABA is designed for speed and privacy, with session management that keeps your workspaces isolated from other users.
                        </p>
                    </section>

                    <section id="faq" className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-left">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "Where is my data stored?",
                                    a: "TABA stores all your task and project data locally in your browser's persistent storage. This ensures maximum privacy and offline accessibility."
                                },
                                {
                                    q: "Can I sync my data across devices?",
                                    a: "Currently, TABA is local-first for privacy. Cross-device synchronization is a planned feature for future release."
                                },
                                {
                                    q: "Is there a limit to the number of projects?",
                                    a: "No! You can create as many workspaces and projects as you need. There are no artificial limits on your productivity."
                                },
                                {
                                    q: "How do I change the board theme?",
                                    a: "Go to your project board and right-click anywhere on the background. You'll see options to change the background to Slate, Blue, or Amber."
                                },
                                {
                                    q: "Does TABA support dark mode?",
                                    a: "Yes, TABA fully supports system-wide dark and light modes. Use the toggle button at the bottom right of the screen to switch themes."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 transition-all hover:border-accent-yellow/30">
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.q}</h4>
                                    <p className="m-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};
