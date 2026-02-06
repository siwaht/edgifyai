import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PRIVACY_CONTENT = {
  title: 'Privacy Policy',
  lastUpdated: 'February 2026',
  sections: [
    {
      heading: '1. Information We Collect',
      body: `We collect information you provide directly when using our AI agent services, including:
• Contact details (name, email, company) submitted through our forms
• Project requirements and technical specifications shared during consultations
• Usage data and interaction logs from deployed AI agents (anonymized)
• Technical metadata such as browser type, IP address, and device information

We do not collect, store, or process the content of conversations handled by your deployed agents unless explicitly configured by you.`,
    },
    {
      heading: '2. How We Use Your Information',
      body: `Your information is used to:
• Deliver, maintain, and improve our AI agent services
• Respond to inquiries and provide technical support
• Train and fine-tune agent models only with your explicit consent
• Send service updates and relevant communications
• Ensure security, detect fraud, and comply with legal obligations

We never sell your personal data to third parties.`,
    },
    {
      heading: '3. AI-Specific Data Practices',
      body: `• Agent Memory: Short-term and long-term agent memory data is scoped to your environment and encrypted at rest
• RAG Data: Documents ingested for retrieval-augmented generation remain within your designated storage and are not shared across clients
• Model Inputs/Outputs: We do not use your agent interactions to train foundation models unless you opt in
• MCP Tool Logs: Tool execution logs via Model Context Protocol are retained for 30 days for debugging, then purged`,
    },
    {
      heading: '4. Data Security',
      body: `We implement industry-standard security measures including:
• AES-256 encryption at rest and TLS 1.3 in transit
• Role-based access controls and audit logging
• Regular penetration testing and vulnerability assessments
• SOC 2 Type II compliance (in progress)
• Data residency options for enterprise clients`,
    },
    {
      heading: '5. Data Retention & Deletion',
      body: `• Contact form submissions are retained for 24 months
• Agent deployment data is retained for the duration of your service agreement
• You may request deletion of your data at any time by contacting privacy@edgeifyai.com
• Upon account termination, all associated data is purged within 30 days`,
    },
    {
      heading: '6. Third-Party Services',
      body: `We may use third-party services for hosting, analytics, and payment processing. These providers are contractually bound to protect your data and only process it as instructed by us. Current providers include cloud infrastructure, payment processors, and analytics platforms.`,
    },
    {
      heading: '7. Your Rights',
      body: `Depending on your jurisdiction, you may have the right to:
• Access, correct, or delete your personal data
• Object to or restrict processing
• Data portability
• Withdraw consent at any time

Contact privacy@edgeifyai.com to exercise these rights.`,
    },
  ],
};

const TERMS_CONTENT = {
  title: 'Terms of Service',
  lastUpdated: 'February 2026',
  sections: [
    {
      heading: '1. Services',
      body: `EdgeifyAI provides AI agent design, development, deployment, and management services. This includes but is not limited to voice agents, chat agents, ambient agents, deep agents, RAG pipelines, MCP integrations, and multi-agent orchestration systems.

By engaging our services, you agree to these terms in full.`,
    },
    {
      heading: '2. Client Responsibilities',
      body: `You agree to:
• Provide accurate information and requirements for agent development
• Ensure your use of deployed agents complies with applicable laws and regulations
• Not use our agents for illegal, harmful, deceptive, or discriminatory purposes
• Maintain appropriate human oversight for safety-critical agent deployments
• Promptly report any agent behavior that appears unsafe or unintended`,
    },
    {
      heading: '3. Intellectual Property',
      body: `• Custom agents built for you: You own the configuration, prompts, and custom logic we develop for your specific use case
• Our platform and tools: EdgeifyAI retains ownership of proprietary frameworks, libraries, orchestration systems, and base agent architectures
• Training data: You retain ownership of all data you provide. We do not claim rights to your data
• Open-source components: Some components may use open-source licenses, which will be disclosed`,
    },
    {
      heading: '4. AI Agent Limitations & Disclaimers',
      body: `• AI agents may produce inaccurate, incomplete, or unexpected outputs. You are responsible for validating agent outputs in production
• We do not guarantee that agents will be error-free or uninterrupted
• Agents operating autonomously should have appropriate guardrails and human-in-the-loop mechanisms as recommended
• EdgeifyAI is not liable for decisions made by deployed agents without adequate human oversight`,
    },
    {
      heading: '5. Service Level Agreement',
      body: `• We target 99.9% uptime for managed agent deployments
• Scheduled maintenance windows will be communicated 48 hours in advance
• Support response times: Critical issues within 4 hours, standard issues within 24 hours
• Custom SLAs are available for enterprise clients`,
    },
    {
      heading: '6. Payment & Billing',
      body: `• Fees are based on the scope of services agreed upon in your service agreement
• Invoices are due within 30 days of issuance
• We reserve the right to suspend services for accounts overdue by more than 60 days
• Pricing changes will be communicated 30 days in advance`,
    },
    {
      heading: '7. Limitation of Liability',
      body: `To the maximum extent permitted by law, EdgeifyAI's total liability for any claim arising from these terms or our services shall not exceed the fees paid by you in the 12 months preceding the claim. We are not liable for indirect, incidental, consequential, or punitive damages.`,
    },
    {
      heading: '8. Termination',
      body: `• Either party may terminate with 30 days written notice
• Upon termination, we will provide a data export within 14 days upon request
• All deployed agents will be decommissioned within 30 days of termination
• Sections on IP, liability, and data practices survive termination`,
    },
    {
      heading: '9. Governing Law',
      body: `These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved through binding arbitration in San Francisco, CA.`,
    },
  ],
};

const CONTENT_MAP = {
  privacy: PRIVACY_CONTENT,
  terms: TERMS_CONTENT,
};

const LegalModal = ({ type, onClose }) => {
  const { isDark, colors } = useTheme();
  const content = CONTENT_MAP[type];
  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 680, maxHeight: '85vh',
            borderRadius: 20, overflow: 'hidden',
            background: isDark ? '#141418' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            boxShadow: isDark
              ? '0 30px 80px rgba(0,0,0,0.5)'
              : '0 30px 80px rgba(0,0,0,0.15)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 28px',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            flexShrink: 0,
          }}>
            <div>
              <h2 style={{
                fontSize: 20, fontWeight: 700, color: colors.text, margin: 0,
              }}>{content.title}</h2>
              <p style={{
                fontSize: 12, color: colors.textMuted, margin: '4px 0 0',
              }}>Last updated: {content.lastUpdated}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                padding: 8, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                color: colors.textSecondary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{
            padding: '24px 28px', overflowY: 'auto', flex: 1,
          }}>
            {content.sections.map((section) => (
              <div key={section.heading} style={{ marginBottom: 28 }}>
                <h3 style={{
                  fontSize: 15, fontWeight: 600, color: colors.text,
                  marginBottom: 10,
                }}>{section.heading}</h3>
                <p style={{
                  fontSize: 14, lineHeight: 1.8, color: colors.textSecondary,
                  whiteSpace: 'pre-line', margin: 0,
                }}>{section.body}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: '16px 28px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            flexShrink: 0,
            textAlign: 'right',
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 24px', fontSize: 14, fontWeight: 600,
                borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                color: colors.text,
                transition: 'background 0.2s',
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LegalModal;
