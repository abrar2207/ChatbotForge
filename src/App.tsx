import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ExamplesSection } from './components/ExamplesSection';
import { WorkshopMode } from './components/WorkshopMode';
import { ChatbotBuilder } from './components/builder/ChatbotBuilder';
import { Footer } from './components/Footer';
import { ToastNotification, ToastProps } from './components/ToastNotification';
import { ConfirmModal } from './components/ConfirmModal';
import {
  INITIAL_CHATBOT_CONFIG,
  WORKSHOP_CHECKLIST_DEFAULT,
} from './constants/presets';
import { ChatbotConfig, ExampleTemplate, WorkshopChecklistItem } from './types';

export default function App() {
  // 1. Persistent State
  const [config, setConfig] = useState<ChatbotConfig>(() => {
    try {
      const saved = localStorage.getItem('apdova_chatbotforge_config');
      return saved ? JSON.parse(saved) : INITIAL_CHATBOT_CONFIG;
    } catch {
      return INITIAL_CHATBOT_CONFIG;
    }
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('apdova_chatbotforge_step');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [isBeginnerMode, setIsBeginnerMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('apdova_chatbotforge_beginner_mode');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isWorkshopActive, setIsWorkshopActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('apdova_chatbotforge_workshop_active');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [workshopChecklist, setWorkshopChecklist] = useState<WorkshopChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('apdova_chatbotforge_checklist');
      return saved ? JSON.parse(saved) : WORKSHOP_CHECKLIST_DEFAULT;
    } catch {
      return WORKSHOP_CHECKLIST_DEFAULT;
    }
  });

  // UI state
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'home' | 'builder' | 'workshop'>('home');

  const builderRef = useRef<HTMLDivElement>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('apdova_chatbotforge_config', JSON.stringify(config));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('apdova_chatbotforge_step', currentStep.toString());
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [currentStep]);

  useEffect(() => {
    try {
      localStorage.setItem('apdova_chatbotforge_beginner_mode', JSON.stringify(isBeginnerMode));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [isBeginnerMode]);

  useEffect(() => {
    try {
      localStorage.setItem('apdova_chatbotforge_workshop_active', JSON.stringify(isWorkshopActive));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [isWorkshopActive]);

  useEffect(() => {
    try {
      localStorage.setItem('apdova_chatbotforge_checklist', JSON.stringify(workshopChecklist));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [workshopChecklist]);

  // Toast Helper
  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers
  const handleConfigChange = (updated: Partial<ChatbotConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleStartBuilding = () => {
    setActiveView('builder');
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSelectExample = (template: ExampleTemplate) => {
    setConfig((prev) => ({
      ...prev,
      ...template.config,
    }));
    setCurrentStep(2);
    setActiveView('builder');
    addToast(
      'info',
      `Loaded "${template.title}" Template`,
      'Customized presets loaded into builder. Continue adjusting or generate your prompt!'
    );
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleToggleChecklistItem = (id: string) => {
    setWorkshopChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleResetWorkshopChecklist = () => {
    setWorkshopChecklist(WORKSHOP_CHECKLIST_DEFAULT);
    addToast('info', 'Workshop Checklist Reset');
  };

  const handleConfirmResetProject = () => {
    setConfig(INITIAL_CHATBOT_CONFIG);
    setCurrentStep(1);
    setWorkshopChecklist(WORKSHOP_CHECKLIST_DEFAULT);
    setIsResetModalOpen(false);
    addToast('info', 'Project Reset', 'Your chatbot configuration has been restored to default.');
  };

  const handleNavigate = (section: 'home' | 'how-it-works' | 'examples' | 'workshop' | 'builder') => {
    if (section === 'builder') {
      setActiveView('builder');
      setTimeout(() => {
        builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (section === 'workshop') {
      setIsWorkshopActive(true);
      setActiveView('workshop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'how-it-works') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (section === 'examples') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('examples');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      setActiveView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col selection:bg-[#FF6B00] selection:text-white">
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastNotification {...toast} onClose={removeToast} />
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Clear My Project?"
        description="Are you sure you want to reset your chatbot project? All customized inputs, personality settings, and generated text will be restored to defaults."
        confirmLabel="Yes, Clear Project"
        cancelLabel="Keep Project"
        onConfirm={handleConfirmResetProject}
        onCancel={() => setIsResetModalOpen(false)}
      />

      {/* Main Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        isWorkshopActive={isWorkshopActive}
        onToggleWorkshop={() => setIsWorkshopActive(!isWorkshopActive)}
        isBeginnerMode={isBeginnerMode}
        onToggleBeginnerMode={() => {
          const next = !isBeginnerMode;
          setIsBeginnerMode(next);
          addToast(
            'info',
            next ? 'Beginner Mode Enabled' : 'Advanced Mode Enabled',
            next
              ? 'Streamlined interface with beginner-friendly defaults.'
              : 'Technical configurations (model parameters, architectures) unlocked.'
          );
        }}
        onOpenResetConfirm={() => setIsResetModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Workshop Mode Banner if active */}
        {isWorkshopActive && (
          <WorkshopMode
            checklist={workshopChecklist}
            onToggleItem={handleToggleChecklistItem}
            onResetChecklist={handleResetWorkshopChecklist}
            onJumpToBuilder={handleStartBuilding}
          />
        )}

        {/* Hero Section */}
        <Hero
          onStartBuilding={handleStartBuilding}
          onSeeHowItWorks={() => {
            const el = document.getElementById('how-it-works');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* The Core Multi-Step Chatbot Builder */}
        <div ref={builderRef}>
          <ChatbotBuilder
            currentStep={currentStep}
            onSetStep={(step) => {
              setCurrentStep(step);
              builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            config={config}
            onChangeConfig={handleConfigChange}
            isBeginnerMode={isBeginnerMode}
            onResetProject={() => setIsResetModalOpen(true)}
            onNotify={addToast}
          />
        </div>

        {/* How It Works Section */}
        <HowItWorks onStartBuilding={handleStartBuilding} />

        {/* Examples Section */}
        <ExamplesSection onSelectExample={handleSelectExample} />
      </main>

      {/* Apdova Branded Footer */}
      <Footer />
    </div>
  );
}
