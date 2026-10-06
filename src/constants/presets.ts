import { ChatbotConfig, ExampleTemplate, WorkshopChecklistItem } from '../types';

export const INITIAL_CHATBOT_CONFIG: ChatbotConfig = {
  type: 'study',
  customTypeDescription: '',
  name: 'StudyBuddy',
  purpose: 'Help first-year students understand programming concepts and study topics in simple language with interactive examples.',
  targetUsers: ['Students', 'Me'],
  personalities: ['Beginner-friendly', 'Teacher-like', 'Friendly'],
  customPersonality: '',
  knowledge: 'Python & JavaScript basics, core computer science concepts, exam preparation techniques, and freshman university coursework.',
  responseStyles: ['Step-by-step', 'Real-world examples', 'Analogies', 'Give hints instead of direct answers'],
  safetyRules: {
    noHallucination: true,
    askClarification: true,
    stayInScope: true,
    explainStepByStep: true,
  },
  features: {
    // Basic (all true by default)
    chatInterface: true,
    conversationHistory: true,
    clearChat: true,
    suggestedQuestions: true,
    loadingIndicator: true,
    typingAnimation: true,
    markdownResponses: true,
    mobileResponsive: true,
    // Advanced (disabled by default for beginners)
    voiceInput: false,
    textToSpeech: false,
    fileUpload: false,
    imageUnderstanding: false,
    documentAnalysis: false,
    authentication: false,
    database: false,
    ragKnowledgeBase: false,
    apiIntegration: false,
  },
  design: {
    style: 'modern',
    avatar: 'robot',
    customAvatarEmoji: '🤖',
    accentColor: '#FF6B00',
  },
  advancedSettings: {
    recommendedModel: 'gemini-2.5-flash',
    systemInstructionCustom: '',
    temperature: 0.7,
    storageType: 'localStorage',
  },
};

export const CHATBOT_TYPES: {
  id: ChatbotConfig['type'];
  emoji: string;
  title: string;
  description: string;
  defaultName: string;
  defaultPurpose: string;
  defaultKnowledge: string;
}[] = [
  {
    id: 'study',
    emoji: '🎓',
    title: 'Study Assistant',
    description: 'Helps students understand concepts and study.',
    defaultName: 'StudyBuddy',
    defaultPurpose: 'Help students grasp challenging course material, study for exams, and break down complex concepts into simple steps.',
    defaultKnowledge: 'Undergraduate fundamentals, flashcard creation, active recall techniques, and exam review notes.',
  },
  {
    id: 'career',
    emoji: '💼',
    title: 'Career Assistant',
    description: 'Helps with careers, resumes, interviews, and skills.',
    defaultName: 'CareerCoach',
    defaultPurpose: 'Help students polish resumes, practice mock interview questions, identify career paths, and develop workplace skills.',
    defaultKnowledge: 'Resume formatting, behavioral interview STAR method, LinkedIn profile tips, tech internship requirements, and career guidance.',
  },
  {
    id: 'coding',
    emoji: '💻',
    title: 'Coding Assistant',
    description: 'Helps users learn programming and solve coding problems.',
    defaultName: 'CodeMentor',
    defaultPurpose: 'Help beginner programmers debug errors, understand code syntax, and learn data structures without writing code for them blindly.',
    defaultKnowledge: 'Python, JavaScript, TypeScript, HTML/CSS, Git version control, debugging best practices, and beginner algorithms.',
  },
  {
    id: 'subject',
    emoji: '📚',
    title: 'Subject Tutor',
    description: 'Acts as a personal tutor for a specific subject.',
    defaultName: 'SubjectTutor',
    defaultPurpose: 'Provide targeted one-on-one tutoring for a specific subject like Calculus, Physics, History, or Biology.',
    defaultKnowledge: 'Core curriculum definitions, formulas, historical timelines, practice problem solving, and intuitive explanations.',
  },
  {
    id: 'knowledge',
    emoji: '🧠',
    title: 'Personal Knowledge Assistant',
    description: 'Answers questions based on personal information.',
    defaultName: 'MindVault',
    defaultPurpose: 'Serve as a personal assistant that organizes personal study notes, lecture summaries, and project deadlines.',
    defaultKnowledge: 'User-provided lecture notes, course syllabus, project guidelines, personal bookmarks, and productivity habits.',
  },
  {
    id: 'cooking',
    emoji: '🍳',
    title: 'Cooking Assistant',
    description: 'Helps users with recipes and cooking instructions.',
    defaultName: 'ChefBuddy',
    defaultPurpose: 'Help college students cook quick, healthy, budget-friendly meals with whatever ingredients they currently have.',
    defaultKnowledge: 'Easy dorm recipes, pantry substitutes, kitchen safety, knife skills, quick 15-minute meal plans, and nutritional basics.',
  },
  {
    id: 'travel',
    emoji: '✈️',
    title: 'Travel Assistant',
    description: 'Creates personalized travel plans.',
    defaultName: 'WanderGuide',
    defaultPurpose: 'Help travelers design budget-friendly itineraries, find packing essentials, and discover hidden local gems.',
    defaultKnowledge: 'Travel budgeting, public transit navigation, weekend getaway itineraries, packing checklists, and local etiquette.',
  },
  {
    id: 'finance',
    emoji: '💰',
    title: 'Finance Learning Assistant',
    description: 'Explains financial concepts in beginner-friendly language.',
    defaultName: 'FinLiterate',
    defaultPurpose: 'Demystify money management, budgeting apps, credit scores, student loans, and investing basics for beginners.',
    defaultKnowledge: 'College student budgeting (50/30/20 rule), emergency funds, compound interest, credit score basics, and saving strategies.',
  },
  {
    id: 'custom',
    emoji: '🤖',
    title: 'Custom Chatbot',
    description: 'Build something completely different.',
    defaultName: 'MyAIChatbot',
    defaultPurpose: 'Describe your own unique chatbot concept tailored to your specific community or problem.',
    defaultKnowledge: 'Custom specialized domain knowledge based on your unique vision and use case.',
  },
];

export const TARGET_USER_OPTIONS = [
  'Me',
  'Students',
  'Teachers',
  'Friends',
  'Customers',
  'General Public',
];

export const PERSONALITY_OPTIONS = [
  { id: 'Friendly', label: 'Friendly', emoji: '😊', desc: 'Warm, approachable, and encouraging' },
  { id: 'Professional', label: 'Professional', emoji: '👔', desc: 'Crisp, structured, and polished' },
  { id: 'Funny', label: 'Funny', emoji: '😄', desc: 'Witty, upbeat with appropriate humor' },
  { id: 'Motivational', label: 'Motivational', emoji: '🔥', desc: 'High energy, inspiring confidence' },
  { id: 'Teacher-like', label: 'Teacher-like', emoji: '🧑‍🏫', desc: 'Patient, explanatory, and structured' },
  { id: 'Beginner-friendly', label: 'Beginner-friendly', emoji: '🌱', desc: 'Zero jargon, gentle learning curve' },
  { id: 'Concise', label: 'Concise', emoji: '⚡', desc: 'Direct, to the point, no fluff' },
  { id: 'Detailed', label: 'Detailed', emoji: '📖', desc: 'Thorough, in-depth breakdowns' },
];

export const RESPONSE_STYLES = [
  { id: 'Short answers', label: 'Short answers', desc: 'Quick bulleted or one-sentence summaries' },
  { id: 'Detailed explanations', label: 'Detailed explanations', desc: 'Comprehensive conceptual walkthroughs' },
  { id: 'Step-by-step', label: 'Step-by-step', desc: 'Numbered progressive instructions' },
  { id: 'Bullet points', label: 'Bullet points', desc: 'Organized scannable bulleted lists' },
  { id: 'Real-world examples', label: 'Real-world examples', desc: 'Practical scenarios people relate to' },
  { id: 'Analogies', label: 'Analogies', desc: 'Metaphors comparing concepts to everyday items' },
  { id: 'Code examples', label: 'Code examples', desc: 'Clean, syntax-highlighted code snippets' },
  { id: 'Ask questions before answering', label: 'Ask questions before answering', desc: 'Clarify intent to give accurate responses' },
  { id: 'Give hints instead of direct answers', label: 'Give hints instead of direct answers', desc: 'Socratic method to stimulate critical thinking' },
];

export const BASIC_FEATURES = [
  { id: 'chatInterface', label: 'Chat interface', desc: 'Clean messaging window with user and AI bubbles' },
  { id: 'conversationHistory', label: 'Conversation history', desc: 'Maintains multi-turn context throughout the session' },
  { id: 'clearChat', label: 'Clear chat', desc: 'Reset conversation anytime with a single click' },
  { id: 'suggestedQuestions', label: 'Suggested questions', desc: 'Interactive chips to get started with 1 click' },
  { id: 'loadingIndicator', label: 'Loading indicator', desc: 'Visual indicator while the model is thinking' },
  { id: 'typingAnimation', label: 'Typing animation', desc: 'Smooth streaming text appearance effect' },
  { id: 'markdownResponses', label: 'Markdown responses', desc: 'Rich formatting for bold text, lists, and code blocks' },
  { id: 'mobileResponsive', label: 'Mobile responsive interface', desc: 'Optimized touch layout specifically for smartphones' },
];

export const ADVANCED_FEATURES = [
  { id: 'voiceInput', label: 'Voice input', desc: 'Speech-to-text allowing users to talk directly to the bot' },
  { id: 'textToSpeech', label: 'Text-to-speech', desc: 'Voice readout of AI responses for hands-free listening' },
  { id: 'fileUpload', label: 'File upload', desc: 'Upload documents or text files for context analysis' },
  { id: 'imageUnderstanding', label: 'Image understanding', desc: 'Multimodal vision to inspect and explain uploaded photos' },
  { id: 'documentAnalysis', label: 'Document analysis', desc: 'Parse PDFs, lecture notes, or syllabi directly' },
  { id: 'authentication', label: 'Authentication', desc: 'User accounts and sign-in to protect personal sessions' },
  { id: 'database', label: 'Database', desc: 'Persist chat sessions across different browser visits' },
  { id: 'ragKnowledgeBase', label: 'RAG / Knowledge Base', desc: 'Vector search across custom lecture notes or textbooks' },
  { id: 'apiIntegration', label: 'API integration', desc: 'Connect to external live APIs (weather, stocks, search)' },
];

export const DESIGN_STYLES: { id: ChatbotConfig['design']['style']; label: string; desc: string }[] = [
  { id: 'minimal', label: 'Minimal', desc: 'Ultra-clean, high-contrast, zero distractions' },
  { id: 'modern', label: 'Modern AI', desc: 'Sleek dark interface with Apdova orange accents' },
  { id: 'professional', label: 'Professional', desc: 'Corporate, structured, and formal feel' },
  { id: 'student', label: 'Student', desc: 'Friendly, accessible, high readability layout' },
  { id: 'dark', label: 'Dark', desc: 'Deep black background with sharp contrast' },
  { id: 'clean', label: 'Clean', desc: 'Well-spaced, light-touch, balanced borders' },
];

export const AVATAR_OPTIONS: { id: ChatbotConfig['design']['avatar']; label: string; emoji: string }[] = [
  { id: 'robot', label: 'Robot', emoji: '🤖' },
  { id: 'brain', label: 'Brain', emoji: '🧠' },
  { id: 'student', label: 'Student', emoji: '🎓' },
  { id: 'sparkle', label: 'Sparkle', emoji: '⭐' },
  { id: 'custom', label: 'Custom', emoji: '✨' },
];

export const EXAMPLE_TEMPLATES: ExampleTemplate[] = [
  {
    id: 'study-buddy',
    title: 'StudyBuddy',
    tagline: 'Personal AI tutor for students',
    emoji: '🎓',
    description: 'Breaks down tough university subjects, gives practice problems, and uses flashcard analogies to boost exam confidence.',
    config: {
      type: 'study',
      name: 'StudyBuddy',
      purpose: 'Help first-year students study effectively by breaking down complex concepts, creating practice quiz questions, and giving gentle hints.',
      targetUsers: ['Students', 'Me'],
      personalities: ['Teacher-like', 'Beginner-friendly', 'Motivational'],
      knowledge: 'General biology, introductory physics, calculus fundamentals, study strategies, and active recall practice.',
      responseStyles: ['Step-by-step', 'Analogies', 'Give hints instead of direct answers', 'Real-world examples'],
      design: {
        style: 'modern',
        avatar: 'student',
        customAvatarEmoji: '🎓',
        accentColor: '#FF6B00',
      },
    },
  },
  {
    id: 'code-mate',
    title: 'CodeMate',
    tagline: 'Beginner-friendly programming assistant',
    emoji: '💻',
    description: 'Helps students understand terminal errors, explains loop logic, and teaches debugging habits without simply dumping code.',
    config: {
      type: 'coding',
      name: 'CodeMate',
      purpose: 'Guide novice programmers through debugging syntax errors, explaining programming concepts with line-by-line comments, and building confidence.',
      targetUsers: ['Students', 'Friends'],
      personalities: ['Beginner-friendly', 'Friendly', 'Concise'],
      knowledge: 'Python fundamentals, variables, loops, functions, lists, dictionaries, debugging terminal errors, and clean coding habits.',
      responseStyles: ['Code examples', 'Step-by-step', 'Bullet points', 'Analogies'],
      design: {
        style: 'dark',
        avatar: 'robot',
        customAvatarEmoji: '💻',
        accentColor: '#FF6B00',
      },
    },
  },
  {
    id: 'career-bot',
    title: 'CareerBot',
    tagline: 'Resume and interview assistant',
    emoji: '💼',
    description: 'Polishes student resumes, conducts interactive behavioral mock interviews, and suggests relevant internship skills.',
    config: {
      type: 'career',
      name: 'CareerBot',
      purpose: 'Review student resume bullet points with action verbs, provide realistic mock interview feedback using the STAR method, and advise on first internships.',
      targetUsers: ['Students', 'General Public'],
      personalities: ['Professional', 'Motivational', 'Detailed'],
      knowledge: 'Resume action verbs, STAR interview framework, entry-level internship requirements, cover letter etiquette, and LinkedIn networking.',
      responseStyles: ['Detailed explanations', 'Real-world examples', 'Bullet points', 'Step-by-step'],
      design: {
        style: 'professional',
        avatar: 'sparkle',
        customAvatarEmoji: '💼',
        accentColor: '#FF6B00',
      },
    },
  },
  {
    id: 'travel-mate',
    title: 'TravelMate',
    tagline: 'Personal travel planning assistant',
    emoji: '✈️',
    description: 'Generates day-by-day budget itineraries, transit guides, and packing lists for student road trips and study abroad.',
    config: {
      type: 'travel',
      name: 'TravelMate',
      purpose: 'Create customized, budget-conscious travel itineraries with local food recommendations, daily logistics, and must-see cultural spots.',
      targetUsers: ['Friends', 'Me', 'General Public'],
      personalities: ['Friendly', 'Detailed', 'Motivational'],
      knowledge: 'Budget travel tips, public transportation passes, currency exchange, packing checklists, and local cultural norms.',
      responseStyles: ['Bullet points', 'Step-by-step', 'Real-world examples', 'Short answers'],
      design: {
        style: 'modern',
        avatar: 'robot',
        customAvatarEmoji: '✈️',
        accentColor: '#FF6B00',
      },
    },
  },
  {
    id: 'recipe-bot',
    title: 'RecipeBot',
    tagline: 'AI cooking assistant',
    emoji: '🍳',
    description: 'Suggests delicious recipes based only on the ingredients currently in your dorm fridge, with zero food waste.',
    config: {
      type: 'cooking',
      name: 'RecipeBot',
      purpose: 'Turn whatever leftover groceries or dorm pantry items a student has into quick, nutritious, delicious 20-minute meals.',
      targetUsers: ['Students', 'Me', 'Friends'],
      personalities: ['Friendly', 'Beginner-friendly', 'Funny'],
      knowledge: 'Budget dorm cooking, ingredient substitutions, microwave/air fryer techniques, food safety, and meal prepping.',
      responseStyles: ['Step-by-step', 'Bullet points', 'Real-world examples', 'Short answers'],
      design: {
        style: 'clean',
        avatar: 'sparkle',
        customAvatarEmoji: '🍳',
        accentColor: '#FF6B00',
      },
    },
  },
  {
    id: 'quiz-master',
    title: 'QuizMaster',
    tagline: 'AI quiz and learning assistant',
    emoji: '🧠',
    description: 'Tests your understanding by generating multiple-choice and short-answer questions, keeping score, and explaining mistakes.',
    config: {
      type: 'knowledge',
      name: 'QuizMaster',
      purpose: 'Conduct dynamic quizzes on any topic, track user score, provide immediate helpful feedback on wrong answers, and reinforce key memory hooks.',
      targetUsers: ['Students', 'Teachers', 'Friends'],
      personalities: ['Teacher-like', 'Motivational', 'Friendly'],
      knowledge: 'Trivia generation, active recall drills, spaced repetition algorithms, multiple choice test design, and concept quizzes.',
      responseStyles: ['Ask questions before answering', 'Give hints instead of direct answers', 'Step-by-step'],
      design: {
        style: 'minimal',
        avatar: 'brain',
        customAvatarEmoji: '🧠',
        accentColor: '#FF6B00',
      },
    },
  },
];

export const WORKSHOP_CHECKLIST_DEFAULT: WorkshopChecklistItem[] = [
  { id: '1', label: 'Choose an idea', completed: false },
  { id: '2', label: 'Name your chatbot', completed: false },
  { id: '3', label: 'Define what it does', completed: false },
  { id: '4', label: 'Choose its personality', completed: false },
  { id: '5', label: 'Select features', completed: false },
  { id: '6', label: 'Generate your prompt', completed: false },
  { id: '7', label: 'Copy the prompt', completed: false },
  { id: '8', label: 'Open Google AI Studio', completed: false },
  { id: '9', label: 'Build your chatbot', completed: false },
  { id: '10', label: 'Test it', completed: false },
  { id: '11', label: 'Show it to your friends', completed: false },
];
