export type ChatbotType =
  | 'study'
  | 'career'
  | 'coding'
  | 'subject'
  | 'knowledge'
  | 'cooking'
  | 'travel'
  | 'finance'
  | 'custom';

export type DesignStyle = 'minimal' | 'modern' | 'professional' | 'student' | 'dark' | 'clean';

export type AvatarChoice = 'robot' | 'brain' | 'student' | 'sparkle' | 'custom';

export interface ChatbotConfig {
  type: ChatbotType;
  customTypeDescription: string;
  name: string;
  purpose: string;
  targetUsers: string[];
  personalities: string[];
  customPersonality: string;
  knowledge: string;
  responseStyles: string[];
  safetyRules: {
    noHallucination: boolean; // Don't make things up
    askClarification: boolean; // Ask when information is missing
    stayInScope: boolean; // Stay within its purpose
    explainStepByStep: boolean; // Explain instead of blindly answering
  };
  features: {
    // Basic
    chatInterface: boolean;
    conversationHistory: boolean;
    clearChat: boolean;
    suggestedQuestions: boolean;
    loadingIndicator: boolean;
    typingAnimation: boolean;
    markdownResponses: boolean;
    mobileResponsive: boolean;
    // Advanced
    voiceInput: boolean;
    textToSpeech: boolean;
    fileUpload: boolean;
    imageUnderstanding: boolean;
    documentAnalysis: boolean;
    authentication: boolean;
    database: boolean;
    ragKnowledgeBase: boolean;
    apiIntegration: boolean;
  };
  design: {
    style: DesignStyle;
    avatar: AvatarChoice;
    customAvatarEmoji?: string;
    accentColor: string; // e.g. #FF6B00
  };
  advancedSettings?: {
    recommendedModel: string; // e.g. Gemini 2.5 Flash
    systemInstructionCustom: string;
    temperature: number; // 0.2 to 1.0
    storageType: 'localStorage' | 'firestore' | 'sql' | 'none';
  };
}

export interface ExampleTemplate {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  description: string;
  config: Partial<ChatbotConfig>;
}

export interface WorkshopChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}
