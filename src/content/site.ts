import {
  MessageSquare,
  PhoneCall,
  Eye,
  MonitorSmartphone,
  FileSearch,
  Workflow,
  Network,
  ShieldCheck,
  Headphones,
  Stethoscope,
  Landmark,
  ShoppingBag,
  Building,
  Truck,
  GraduationCap,
  Plane,
  Brain,
  Database,
  Plug,
  Users,
  Gauge,
  Mic,
  Languages,
  Camera,
  ScanText,
  Layers,
  Radio,
  BarChart3,
  ClipboardCheck,
  Lock,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  badge: string;
  accent: string;
}

export const SERVICES: Service[] = [
  {
    icon: PhoneCall,
    title: 'Voice Calling Agents',
    tagline: 'Talk, don\'t type',
    description:
      'Natural, sub-second voice agents that answer inbound lines and run outbound campaigns — booking appointments, qualifying leads, chasing payments and handling support without hold music.',
    points: [
      'Inbound reception and outbound campaigns',
      'Barge-in, accents and 30+ languages',
      'Live CRM and calendar actions mid-call',
      'Warm transfer to a human when it matters',
    ],
    badge: 'Fastest growing',
    accent: '#06b6d4',
  },
  {
    icon: MessageSquare,
    title: 'Chat AI Agents',
    tagline: 'Always on, everywhere',
    description:
      'Conversational agents with long-term memory and a consistent brand voice, deployed across your website, WhatsApp, Slack, Teams and in-app support widgets.',
    points: [
      'Website, WhatsApp, Slack, Teams, in-app',
      'Persistent memory across sessions',
      'Tone-of-voice and persona control',
      'Seamless handoff with full transcript',
    ],
    badge: 'Most popular',
    accent: '#3b82f6',
  },
  {
    icon: Eye,
    title: 'Vision AI Agents',
    tagline: 'Agents that can see',
    description:
      'Multimodal agents that read documents, inspect images and video, extract structured data and answer questions about what is on screen — in real time.',
    points: [
      'Document, invoice and ID extraction',
      'Visual quality and defect inspection',
      'Video and screen understanding',
      'Photo-based field and site reporting',
    ],
    badge: 'Multimodal',
    accent: '#14b8a6',
  },
  {
    icon: MonitorSmartphone,
    title: 'Computer-Use Agents',
    tagline: 'No API? No problem',
    description:
      'Agents that drive real browsers and desktops — clicking, typing and reading screens — to automate portals, legacy systems and SaaS tools that have no integration.',
    points: [
      'Browser and desktop automation',
      'Legacy portals without APIs',
      'Forms, claims and onboarding flows',
      'Self-healing when the UI changes',
    ],
    badge: 'Automation',
    accent: '#f59e0b',
  },
  {
    icon: FileSearch,
    title: 'Knowledge & RAG Agents',
    tagline: 'Grounded in your truth',
    description:
      'Agents that retrieve from your documents, tickets, contracts and databases with citations, so every answer is traceable back to a source you control.',
    points: [
      'Vector search over private knowledge',
      'Answer-level citations and permissions',
      'Hybrid keyword plus semantic retrieval',
      'Fresh sync from the systems you own',
    ],
    badge: 'Grounded',
    accent: '#0ea5e9',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation Agents',
    tagline: 'Work that finishes itself',
    description:
      'Multi-step agents that own a business process end to end — intake, decisions, approvals, updates and follow-ups — with humans in the loop where it counts.',
    points: [
      'End-to-end process ownership',
      'Approval and escalation paths',
      'ERP, CRM and ticketing actions',
      'Full audit trail per step',
    ],
    badge: 'High ROI',
    accent: '#10b981',
  },
  {
    icon: Network,
    title: 'Multi-Agent Orchestration',
    tagline: 'A team, not a tool',
    description:
      'Supervisor and specialist agent fleets that plan, delegate and review each other\'s work, built on open agent-to-agent and tool protocols.',
    points: [
      'Supervisor plus specialist patterns',
      'Shared memory and task queues',
      'Agent-to-agent delegation',
      'Deterministic guardrails around autonomy',
    ],
    badge: 'Enterprise',
    accent: '#6366f1',
  },
  {
    icon: ShieldCheck,
    title: 'Evals, Safety & Observability',
    tagline: 'Ship agents you can trust',
    description:
      'Test suites, tracing and guardrails that make agent quality measurable — so changes ship with evidence instead of hope.',
    points: [
      'Automated regression evals in CI',
      'End-to-end tracing of every step',
      'PII redaction and policy guardrails',
      'Cost, latency and quality dashboards',
    ],
    badge: 'Production ready',
    accent: '#f43f5e',
  },
];

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

export const CAPABILITIES: Capability[] = [
  {
    icon: Mic,
    title: 'Realtime Voice Pipeline',
    description: 'Streaming speech-to-text, turn detection and expressive text-to-speech tuned for natural, interruptible conversation.',
    accent: '#06b6d4',
  },
  {
    icon: Brain,
    title: 'Memory & Personalisation',
    description: 'Short-term context plus long-term memory so agents remember preferences, history and unresolved issues across sessions.',
    accent: '#3b82f6',
  },
  {
    icon: Database,
    title: 'Retrieval & Grounding',
    description: 'Hybrid vector and keyword retrieval over your private corpus, with citations and permission-aware filtering.',
    accent: '#0ea5e9',
  },
  {
    icon: Plug,
    title: 'Tool & API Access',
    description: 'Agents that read and write to your CRM, ERP, helpdesk, calendar and internal APIs through typed, auditable tools.',
    accent: '#14b8a6',
  },
  {
    icon: MonitorSmartphone,
    title: 'Browser & Desktop Control',
    description: 'Computer-use agents that operate real interfaces when no API exists, with human confirmation on risky actions.',
    accent: '#f59e0b',
  },
  {
    icon: Network,
    title: 'Multi-Agent Orchestration',
    description: 'Planner, worker and reviewer agents coordinated with shared state, retries and clear ownership of each task.',
    accent: '#6366f1',
  },
  {
    icon: Languages,
    title: 'Multilingual by Default',
    description: 'Voice and chat agents that detect and switch language mid-conversation across 30+ locales.',
    accent: '#10b981',
  },
  {
    icon: ClipboardCheck,
    title: 'Evaluation Harness',
    description: 'Golden datasets, LLM-as-judge scoring and human review loops that gate every release.',
    accent: '#f43f5e',
  },
  {
    icon: Gauge,
    title: 'Observability & Traces',
    description: 'Every prompt, tool call and token cost traced end to end so you can debug and optimise in production.',
    accent: '#8b5cf6',
  },
  {
    icon: Users,
    title: 'Human in the Loop',
    description: 'Configurable approvals, escalation rules and reviewer queues for the decisions that carry real risk.',
    accent: '#ec4899',
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    description: 'Data residency, retention controls, PII handling and SSO-ready access for regulated environments.',
    accent: '#64748b',
  },
  {
    icon: Layers,
    title: 'Model Agnostic',
    description: 'Frontier or open-weight models, routed per task — you are never locked to a single vendor.',
    accent: '#0d9488',
  },
];

export interface Industry {
  icon: LucideIcon;
  title: string;
  useCase: string;
  accent: string;
}

export const INDUSTRIES: Industry[] = [
  {
    icon: Headphones,
    title: 'Customer Support',
    useCase: 'Voice and chat agents that resolve tier-one tickets, triage calls and hand off with full context.',
    accent: '#06b6d4',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    useCase: 'Patient intake, appointment reminders and insurance questions handled with strict privacy controls.',
    accent: '#14b8a6',
  },
  {
    icon: Landmark,
    title: 'Financial Services',
    useCase: 'Account servicing, collections outreach and document review with a complete audit trail.',
    accent: '#3b82f6',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce & Retail',
    useCase: 'Order tracking, returns, product guidance and win-back campaigns across voice and messaging.',
    accent: '#f59e0b',
  },
  {
    icon: Building,
    title: 'Real Estate',
    useCase: 'Instant lead response, qualification, viewing bookings and follow-up that never sleeps.',
    accent: '#0ea5e9',
  },
  {
    icon: Truck,
    title: 'Logistics',
    useCase: 'Delivery exceptions, driver check-ins and customs paperwork processed from calls and scans.',
    accent: '#10b981',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    useCase: 'Enrolment advisors, multilingual student support and always-available tutoring assistants.',
    accent: '#f43f5e',
  },
  {
    icon: Plane,
    title: 'Travel & Hospitality',
    useCase: 'Bookings, itinerary changes and disruption management across phone, chat and email.',
    accent: '#6366f1',
  },
];

export interface Step {
  number: string;
  title: string;
  description: string;
  color: string;
}

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Discover & Scope',
    description:
      'We map the workflow, the systems involved and the success metrics, then pick the smallest agent that creates real value.',
    color: '#06b6d4',
  },
  {
    number: '02',
    title: 'Design & Ground',
    description:
      'Persona, tone and guardrails are defined, and your knowledge, tools and APIs are wired in so the agent answers from facts, not guesses.',
    color: '#3b82f6',
  },
  {
    number: '03',
    title: 'Build & Evaluate',
    description:
      'The agent is built on the right models and voice stack, then tested against golden datasets and human review before it ever faces a customer.',
    color: '#14b8a6',
  },
  {
    number: '04',
    title: 'Launch & Improve',
    description:
      'We deploy to your channels, monitor every conversation, and keep tuning quality, cost and containment week over week.',
    color: '#10b981',
  },
];

export const TECH_ITEMS = [
  'OpenAI GPT-5 class models',
  'Anthropic Claude',
  'Google Gemini',
  'ElevenLabs Voice',
  'Deepgram STT',
  'Twilio Telephony',
  'Model Context Protocol',
  'Agent-to-Agent (A2A)',
  'LangGraph',
  'CrewAI',
  'Vector Search',
  'PostgreSQL',
  'Supabase',
  'Python',
  'TypeScript',
  'Docker',
  'Kubernetes',
  'OpenTelemetry',
];

export interface Stat {
  value: string;
  label: string;
}

export const HERO_STATS: Stat[] = [
  { value: '4', label: 'Agent modalities' },
  { value: '30+', label: 'Languages supported' },
  { value: '<700ms', label: 'Voice response time' },
  { value: '24/7', label: 'Coverage' },
];

export interface Channel {
  icon: LucideIcon;
  label: string;
}

export const CHANNELS: Channel[] = [
  { icon: PhoneCall, label: 'Phone' },
  { icon: MessageSquare, label: 'Web chat' },
  { icon: Radio, label: 'WhatsApp' },
  { icon: Camera, label: 'Image & video' },
  { icon: ScanText, label: 'Documents' },
  { icon: MonitorSmartphone, label: 'Browser & desktop' },
  { icon: BarChart3, label: 'Your internal tools' },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'How long does it take to get a first agent live?',
    answer:
      'Most single-channel agents — a support chat agent or an inbound voice agent — are in production in a few weeks. Broader programmes that touch several systems and teams roll out in phases, starting with the highest-value workflow.',
  },
  {
    question: 'Will a voice agent sound robotic?',
    answer:
      'Modern speech models produce natural, expressive voices with realistic turn-taking and interruption handling. We tune pacing, pronunciation and personality against your brand, and you approve the voice before launch.',
  },
  {
    question: 'What happens when the agent does not know the answer?',
    answer:
      'It says so, then escalates. Every agent has defined fallback behaviour: hand off to a human, raise a ticket, or collect the details needed for a follow-up — never invent an answer.',
  },
  {
    question: 'Can the agents use our existing systems?',
    answer:
      'Yes. Where APIs exist we integrate directly. Where they do not, computer-use agents operate the interface the same way a person would, so even legacy portals can be automated.',
  },
  {
    question: 'How do you keep quality from drifting?',
    answer:
      'Every deployment ships with an evaluation suite and full tracing. We score responses against golden datasets on every change and monitor live conversations, so regressions are caught before customers see them.',
  },
  {
    question: 'Where does our data go?',
    answer:
      'Your data stays in the systems you control. We configure retention, redaction and access rules to match your policy, and we can deploy in your own cloud environment when required.',
  },
];

export const AGENT_TYPE_OPTIONS = [
  'Voice Calling Agent',
  'Chat AI Agent',
  'Vision AI Agent',
  'Computer-Use Agent',
  'Knowledge / RAG Agent',
  'Workflow Automation',
  'Multi-Agent System',
  'Evals & Observability',
  'Not sure yet',
];
