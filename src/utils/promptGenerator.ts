import { ChatbotConfig } from '../types';

export function generateApdovaPrompt(config: ChatbotConfig, isBeginnerMode = true): string {
  const chatbotName = config.name.trim() || 'MyAIChatbot';
  const chatbotPurpose = config.purpose.trim() || 'Provide helpful and responsive assistance.';
  const targetUsersList = config.targetUsers.length > 0 ? config.targetUsers.join(', ') : 'Students, General Users';
  
  // Personality details
  const personalityTraits = [...config.personalities];
  if (config.customPersonality.trim()) {
    personalityTraits.push(config.customPersonality.trim());
  }
  const personalityStr = personalityTraits.length > 0 
    ? personalityTraits.join(', ')
    : 'Friendly, Beginner-friendly, Patient';

  // Knowledge details
  const coreKnowledge = config.knowledge.trim() || 'General domain fundamentals, beginner-friendly explanations, and practical guidelines.';

  // Response behaviors
  const responseStylesList = config.responseStyles.length > 0
    ? config.responseStyles.map(s => `- ${s}`).join('\n')
    : `- Step-by-step breakdowns\n- Real-world practical examples\n- Clear and concise explanations`;

  // Safety & hallucination rules dynamically built
  const safetyRulesItems: string[] = [];
  if (config.safetyRules.noHallucination) {
    safetyRulesItems.push('- Avoid inventing facts or hallucinating information. If unsure or if information is not available, state: "I do not have enough verified information to answer this reliably."');
  }
  if (config.safetyRules.askClarification) {
    safetyRulesItems.push('- Ask clarifying questions when user queries are ambiguous or missing vital context, rather than making unwarranted assumptions.');
  }
  if (config.safetyRules.stayInScope) {
    safetyRulesItems.push(`- Stay strictly within the core domain (${chatbotName}'s intended scope: ${chatbotPurpose}). Politely decline off-topic requests and refocus the conversation.`);
  }
  if (config.safetyRules.explainStepByStep) {
    safetyRulesItems.push('- Prioritize pedagogical explanations and conceptual clarity over dumping raw answers without context.');
  }
  safetyRulesItems.push('- Clearly distinguish verified facts from working hypotheses or approximations.');

  // UI Requirements based on selected features
  const uiFeatures: string[] = [];
  if (config.features.chatInterface) {
    uiFeatures.push('- High-contrast chat conversation view with distinct, scannable user and AI message bubbles.');
  }
  if (config.features.conversationHistory) {
    uiFeatures.push('- Persistent conversation history stored in session/local state so context is preserved across conversational turns.');
  }
  if (config.features.clearChat) {
    uiFeatures.push('- "Clear Chat" button with a confirmation safeguard to reset the session cleanly.');
  }
  if (config.features.suggestedQuestions) {
    uiFeatures.push('- Interactive "Suggested Questions" chips on empty state so users can click to start an instant inquiry.');
  }
  if (config.features.loadingIndicator) {
    uiFeatures.push('- Subtle, animated loading indicator to show the assistant is actively thinking.');
  }
  if (config.features.typingAnimation) {
    uiFeatures.push('- Smooth streaming or typing effect simulation for incoming assistant responses.');
  }
  if (config.features.markdownResponses) {
    uiFeatures.push('- Full Markdown rendering support: bold headers, formatted bullet lists, inline code chips, and syntax-highlighted code blocks.');
  }
  if (config.features.voiceInput) {
    uiFeatures.push('- [ADVANCED] Voice input (Web Speech Recognition API) with audio pulse animation and microphone toggle button.');
  }
  if (config.features.textToSpeech) {
    uiFeatures.push('- [ADVANCED] Text-to-speech speaker button on each bot reply using the browser SpeechSynthesis API with playback controls.');
  }
  if (config.features.fileUpload) {
    uiFeatures.push('- [ADVANCED] File drag-and-drop / upload button with preview badges, file size limits, and instant document ingestion into the chat context.');
  }
  if (config.features.imageUnderstanding) {
    uiFeatures.push('- [ADVANCED] Multimodal image upload and preview supporting JPEG/PNG, passing base64 inline data to Gemini for visual analysis.');
  }
  if (config.features.documentAnalysis) {
    uiFeatures.push('- [ADVANCED] Document analysis panel to upload PDFs or text files and ask targeted questions against the document text.');
  }
  if (config.features.authentication) {
    uiFeatures.push('- [ADVANCED] User authentication (sign-up, login, profile indicator, and session logout).');
  }
  if (config.features.database) {
    uiFeatures.push('- [ADVANCED] Database persistence layer to save multiple named chat sessions and retrieve past logs.');
  }
  if (config.features.ragKnowledgeBase) {
    uiFeatures.push('- [ADVANCED] RAG / Knowledge retrieval module allowing semantic search against indexed reference articles.');
  }
  if (config.features.apiIntegration) {
    uiFeatures.push('- [ADVANCED] External API integration layer with error-resilient client fetchers and fallback states.');
  }

  // Visual Design
  const avatarEmoji = config.design.avatar === 'custom' 
    ? (config.design.customAvatarEmoji || '🤖')
    : config.design.avatar === 'brain' ? '🧠'
    : config.design.avatar === 'student' ? '🎓'
    : config.design.avatar === 'sparkle' ? '⭐'
    : '🤖';

  const styleDescriptions: Record<string, string> = {
    minimal: 'Minimalist monochrome structure, sharp borders, generous white space, zero visual clutter.',
    modern: 'Modern AI high-contrast dark aesthetic, deep blacks, subtle glowing borders, Apdova Orange accents.',
    professional: 'Crisp corporate layout, structured cards, clean dividers, high legibility typography.',
    student: 'Warm, approachable educational design, rounded cards, friendly icons, accessible contrast.',
    dark: 'Pure pitch black background (#000000), charcoal surfaces (#171717), and crisp borders (#262626).',
    clean: 'Lightweight layout, balanced whitespace, frictionless navigation, intuitive hierarchy.',
  };

  const visualStyleNote = styleDescriptions[config.design.style] || styleDescriptions.modern;
  const accentHex = config.design.accentColor || '#FF6B00';

  // Technical stack requirements
  const techRequirements: string[] = [
    '- Modern Frontend: Single Page Application with React and Tailwind CSS.',
    `- AI Engine: Integrate modern Google Gemini models (recommended: @google/genai SDK with model 'gemini-2.5-flash').`,
    '- Responsive Viewport: Fluid responsive layout with mobile-first viewport meta tags.',
    '- State Management: Clean React state hooks, preserving chat history and input states.',
  ];

  if (config.features.database || config.features.authentication) {
    techRequirements.push('- Persistence: Structured storage (LocalStorage for client-first or Firebase/REST API for backend storage).');
  } else {
    techRequirements.push('- Persistence: Browser LocalStorage for conversation memory and user preferences (no unnecessary backend required).');
  }

  if (config.features.imageUnderstanding || config.features.fileUpload) {
    techRequirements.push('- Media Handling: Client-side file reader (FileReader API) converting uploaded media into base64 data for Gemini multimodal requests.');
  }

  if (!isBeginnerMode && config.advancedSettings) {
    techRequirements.push(`- Model Choice: Explicitly target "${config.advancedSettings.recommendedModel}" with temperature parameter set to ${config.advancedSettings.temperature}.`);
    if (config.advancedSettings.systemInstructionCustom) {
      techRequirements.push(`- Custom System Instructions: "${config.advancedSettings.systemInstructionCustom}"`);
    }
  }

  return `# ROLE
You are an expert AI application developer and UX engineer specializing in high-performance, mobile-first web applications.

# PROJECT
Build a complete, fully functional AI chatbot called:
"${chatbotName}"

# PURPOSE
${chatbotPurpose}

# TARGET USERS
${targetUsersList}

# CHATBOT PERSONALITY
The chatbot must consistently exhibit the following personality traits:
${personalityStr}
Tone guidelines:
- Always be encouraging, respectful, and appropriate for ${targetUsersList}.
- Maintain consistency from the first prompt to long multi-turn sessions.
- Balance authority and domain knowledge with approachable simplicity.

# CORE KNOWLEDGE
The chatbot must specialize in and anchor its reasoning around:
${coreKnowledge}

# RESPONSE BEHAVIOUR
Structure all assistant answers to adhere strictly to these principles:
${responseStylesList}
- Format responses cleanly with readable typography and appropriate line breaks.
- Always include helpful summaries for lengthy conceptual breakdowns.

# CONVERSATION RULES
1. Greet the user warmly on the initial visit and suggest 3 high-impact starting prompts related to ${chatbotName}'s purpose.
2. In multi-turn conversations, reference prior context without repeating earlier explanations verbatim.
3. Keep user engagement high by ending explanations with a natural follow-up check (e.g. "Does this make sense, or would you like an example?").
4. If a user provides partial code or incomplete input, provide constructive suggestions rather than just noting errors.

# KNOWLEDGE & HALLUCINATION RULES
The chatbot must follow these non-negotiable safety guardrails:
${safetyRulesItems.join('\n')}

# USER EXPERIENCE
The user experience must be frictionless, intuitive, and welcoming—even for someone who has never interacted with an AI assistant before:
1. First load: An inviting empty-state hero displaying ${chatbotName} ${avatarEmoji}, a one-sentence value proposition, and interactive starter question chips.
2. Active chat: Fast responses, clear distinction between user queries and AI replies, smooth auto-scroll to the latest message.
3. Input area: Ergonomic bottom input bar with an auto-expanding textarea, action buttons, character counter, and instant keyboard send (Enter to send, Shift+Enter for new line).

# UI REQUIREMENTS
Implement the following selected features with production-grade attention to detail:
${uiFeatures.join('\n')}

# MOBILE-FIRST DESIGN
This application must be engineered mobile-first because the primary users will access it on smartphones:
- Responsive layout: Adapts smoothly from 320px narrow mobile screens up to 4K desktops.
- Touch-friendly controls: Minimum 44x44px interactive tap targets for all buttons and chips.
- Mobile-friendly chat input: Fixed bottom input bar with proper viewport spacing avoiding iOS/Android virtual keyboard overlap (visualViewport safe-area-inset-bottom).
- No horizontal scrolling: Strict overflow-x-hidden enforcement, auto-wrapping long words and code lines.
- Responsive message bubbles: Max-width 85% on mobile screens with comfortable padding and legible font size (minimum 15px for body text).
- Responsive header: Compact top navigation with brand title and quick-action buttons (Clear Chat, Info).

# VISUAL DESIGN
Strict adherence to the Apdova brand identity and user design preference:
- Aesthetic Style: ${visualStyleNote}
- Avatar: ${avatarEmoji} (${config.design.avatar.toUpperCase()})
- Color Palette:
  * Primary Accent: Apdova Orange (${accentHex})
  * Deep Background: Deep Black (#0A0A0A) and Pure Black (#000000)
  * Elevated Card Surface: Dark Charcoal (#171717)
  * Borders & Dividers: Muted Border Gray (#262626)
  * Primary Text: Pure White (#FFFFFF)
  * Secondary Text: Medium Gray (#737373) / Light Gray (#E5E5E5)
- Typography: Modern geometric sans-serif for UI, clean monospace for code snippets.
- Micro-interactions: Smooth hover, tap states, and subtle transitions on interactive elements.

# TECHNICAL REQUIREMENTS
Create a complete, working web application with no missing pieces:
${techRequirements.join('\n')}

# SECURITY
- Strictly protect credentials: Use environment variables (e.g., process.env.GEMINI_API_KEY) and proxy routes or client runtime secrets provided by Google AI Studio. Never hardcode private keys in client code.
- Input validation: Sanitize and trim all text inputs before dispatching API requests.
- Safe rendering: Prevent XSS when rendering Markdown responses.

# ERROR HANDLING
Provide elegant, human-readable recovery for all failure states:
- Empty messages: Disable send button when input is empty or whitespace-only.
- Network / API timeouts: Display an inline retry card with: "Connection interrupted. Tap retry to re-send."
- Rate limits or quota: Explain the issue politely without exposing raw stack traces.
- File upload errors: Validate file type and size (max 10MB) before ingestion.

# LOADING STATES
- Provide an animated indicator (e.g., subtle pulsing dots in Apdova Orange) while waiting for the AI response.
- Keep the send button disabled during generation to prevent duplicate requests.
- Provide a "Stop generating" option if the response is taking unusually long.

# ACCESSIBILITY
- Full keyboard navigation: Tab order through chips, input, and buttons.
- Proper ARIA attributes: aria-label on icon-only buttons, aria-live on the message stream container.
- High contrast: Text colors pass WCAG AA standards against their respective background surfaces.

# TESTING
Ensure the application is tested against these key scenarios:
1. First message flow with recommended starter prompt.
2. Long multi-turn conversation (testing scroll-to-bottom and memory retention).
3. Mobile viewport emulation (iPhone 13/14/15, Samsung Galaxy, iPad).
4. Edge cases: Empty message submission, extremely long text inputs, rapid double-clicks.
5. Error simulation: Graceful failure when network is disconnected.

# OUTPUT REQUIREMENTS
CRITICAL INSTRUCTION FOR GOOGLE AI STUDIO:
Do not merely explain how to build the application or write conceptual outlines. Actually create the complete, production-ready, working application right now.

Specifically:
1. Create all necessary source files and folders.
2. Write the complete, production-grade implementation code (no "TODO", no placeholder comments, no stubbed functions).
3. Connect the live Gemini AI SDK or API handler with appropriate prompts and error boundaries.
4. Implement the fully styled UI according to the Apdova design requirements.
5. Ensure zero compilation errors and test all features for mobile responsiveness.
6. Provide concise instructions on how to run or deploy the application.`;
}
