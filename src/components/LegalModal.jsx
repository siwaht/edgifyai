import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BRAND } from '../data/site';
import './LegalModal.css';

const LAST_UPDATED = 'October 2026';

const PRIVACY_CONTENT = {
  title: 'Privacy Policy',
  sections: [
    {
      heading: '1. Who we are',
      body: `${BRAND.legalName} ("EdgeifyAI", "we", "us") is an AI agent agency. We design, build, and operate voice, chat, vision, knowledge, and workflow agents for businesses. This policy explains how we handle personal data collected through this website and through the agents we build for clients.`,
    },
    {
      heading: '2. Information we collect',
      body: `• Contact details you submit through our forms, such as your name, email address, and message
• Project details you share with us during calls and consultations
• Basic technical data such as browser type, device information, and IP address
• For client deployments: conversation logs, call recordings, and transcripts, only as configured and agreed with the client`,
    },
    {
      heading: '3. How we use your information',
      body: `• To reply to inquiries and schedule strategy calls
• To scope, deliver, monitor, and improve the agents we build for you
• To send service updates related to an active engagement
• To keep our services secure and meet legal obligations

We never sell personal data. We do not use client conversations to train third-party foundation models unless the client explicitly opts in.`,
    },
    {
      heading: '4. AI-specific data practices',
      body: `• Agent memory: customer memory is scoped to each client environment and encrypted at rest
• Knowledge (RAG) data: documents ingested for retrieval stay in the client's designated storage and are never shared across clients
• Model providers: agent requests are processed by vetted AI model providers under agreements that prohibit training on client data
• Tool and audit logs: execution logs are kept for debugging and quality review, then deleted according to the client's retention settings`,
    },
    {
      heading: '5. Service providers',
      body: `We use trusted providers for hosting, databases, workflow automation, telephony, and AI model inference. For example, contact form submissions are stored in our database and forwarded to our workflow automation provider so our team is notified. These providers may only process data on our instructions.`,
    },
    {
      heading: '6. Security',
      body: `• Encryption in transit (TLS) and at rest
• Role-based access controls and audit logging
• PII redaction options for transcripts and logs
• Regular security reviews of our infrastructure and agent deployments`,
    },
    {
      heading: '7. Retention and deletion',
      body: `• Contact form submissions are kept for up to 24 months
• Client deployment data is kept for the duration of the service agreement
• When an engagement ends, client data is deleted within 30 days unless the law requires otherwise`,
    },
    {
      heading: '8. Your rights',
      body: `Depending on where you live, you may have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing. To exercise these rights, email ${BRAND.privacyEmail}.`,
    },
  ],
};

const TERMS_CONTENT = {
  title: 'Terms of Service',
  sections: [
    {
      heading: '1. Services',
      body: `EdgeifyAI provides AI agent strategy, design, development, deployment, and ongoing management. This includes voice calling agents, voice assistants, chat and support agents, vision and document agents, knowledge (RAG) agents, workflow and computer-use agents, and the integrations and multi-agent systems that connect them. The scope of each engagement is set out in a written proposal or service agreement.`,
    },
    {
      heading: '2. Client responsibilities',
      body: `You agree to:
• Provide accurate requirements, access, and content needed to build your agents
• Use deployed agents in line with applicable laws, including call-recording, consent, and AI disclosure rules
• Not use agents for illegal, harmful, deceptive, or discriminatory purposes
• Keep appropriate human oversight for high-stakes or safety-critical decisions
• Tell us promptly about any agent behaviour that seems unsafe or unintended`,
    },
    {
      heading: '3. Ownership',
      body: `• Your data: you keep full ownership of all data you provide and that your agents collect
• Your agent: you own the prompts, conversation designs, configurations, and custom logic we build for you, once paid for
• Our tooling: EdgeifyAI keeps ownership of its internal frameworks, libraries, and reusable components
• Open-source components are used under their own licenses, which we disclose on request`,
    },
    {
      heading: '4. AI limitations',
      body: `• AI agents can produce inaccurate or unexpected outputs. We test thoroughly, but no agent is error-free
• We recommend guardrails, approval steps, and human escalation for consequential actions, and we build them in by default
• EdgeifyAI is not liable for decisions made by agents operating outside the oversight measures we recommend`,
    },
    {
      heading: '5. Support and availability',
      body: `• Managed deployments target 99.9% monthly uptime
• Planned maintenance is announced at least 48 hours in advance
• Support response targets: critical issues within 4 hours, standard issues within one business day
• Custom service levels are available in enterprise agreements`,
    },
    {
      heading: '6. Fees and billing',
      body: `• Fees follow the proposal or service agreement for your engagement
• Invoices are due within 30 days of issue
• We may pause services for accounts more than 60 days overdue
• We give at least 30 days' notice of any pricing changes for ongoing services`,
    },
    {
      heading: '7. Limitation of liability',
      body: `To the maximum extent permitted by law, EdgeifyAI's total liability for any claim relating to these terms or our services is limited to the fees you paid in the 12 months before the claim. We are not liable for indirect, incidental, consequential, or punitive damages.`,
    },
    {
      heading: '8. Termination',
      body: `• Either party may end an ongoing engagement with 30 days' written notice
• On request, we provide an export of your data and agent configuration within 14 days
• Deployed agents are decommissioned within 30 days of termination
• The sections on ownership, liability, and data survive termination`,
    },
    {
      heading: '9. Governing law',
      body: `These terms are governed by the laws of the State of California, United States. Disputes will be resolved through binding arbitration in San Francisco, California.`,
    },
  ],
};

const CONTENT_MAP = {
  privacy: PRIVACY_CONTENT,
  terms: TERMS_CONTENT,
};

const LegalModal = ({ type, onClose }) => {
  const content = CONTENT_MAP[type];
  const closeRef = useRef(null);
  const titleId = `legal-title-${type}`;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('scroll-locked');

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('scroll-locked');
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  if (!content) return null;

  return createPortal(
    <motion.div
      className="legal__overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="legal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="legal__header">
          <div>
            <h2 id={titleId} className="legal__title font-display">{content.title}</h2>
            <p className="legal__meta">Last updated: {LAST_UPDATED}</p>
          </div>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <div className="legal__body">
          {content.sections.map((section) => (
            <section key={section.heading} className="legal__section">
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </section>
          ))}
          <p className="legal__contact">
            Questions? Email <a href={`mailto:${BRAND.privacyEmail}`}>{BRAND.privacyEmail}</a>.
          </p>
        </div>

        <footer className="legal__footer">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
        </footer>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

export default LegalModal;
