// Shared site content so the navbar, footer, services grid and contact form stay in sync.

export const BRAND = {
  name: 'EdgeifyAI',
  legalName: 'EdgeifyAI Inc.',
  email: 'hello@edgeifyai.com',
  supportEmail: 'support@edgeifyai.com',
  privacyEmail: 'privacy@edgeifyai.com',
  linkedin: 'https://www.linkedin.com/company/edgeifyai',
  tagline: 'An AI agent agency. We design, build, and run voice, chat, and vision agents that answer customers and handle real work around the clock.',
};

export const NAV_ITEMS = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Why Us', href: '#capabilities', id: 'capabilities' },
  { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

// Short names used in the footer and as contact-form options.
export const SERVICE_NAMES = [
  'Voice Calling Agents',
  'Voice Assistants',
  'Chat & Support Agents',
  'Vision & Document Agents',
  'Knowledge Agents (RAG)',
  'Workflow Automation',
];
