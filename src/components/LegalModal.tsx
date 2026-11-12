import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/theme';

type ModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: ModalType;
  onClose: () => void;
}

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Information We Collect', body: 'We collect information you provide directly to us, such as when you contact us, fill out a form, or communicate with us. This includes name, email address, company name, and project details.' },
      { heading: 'How We Use Your Information', body: 'We use the information we collect to respond to your inquiries, provide our services, send communications you have requested, and improve our services.' },
      { heading: 'Information Sharing', body: 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share aggregate non-personally identifiable information with partners for analysis purposes.' },
      { heading: 'Data Security', body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
      { heading: 'Contact Us', body: 'If you have questions about this Privacy Policy, please contact us at privacy@edgifyai.com.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Acceptance of Terms', body: 'By accessing and using EdgifyAI services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' },
      { heading: 'Services', body: 'EdgifyAI provides AI agent design, development, and deployment services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.' },
      { heading: 'Intellectual Property', body: 'Unless otherwise agreed, custom AI agents and systems developed for clients become the intellectual property of the client upon full payment. EdgifyAI retains the right to use anonymized learnings to improve its services.' },
      { heading: 'Limitation of Liability', body: 'EdgifyAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services, even if we have been advised of the possibility of such damages.' },
      { heading: 'Governing Law', body: 'These terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved through binding arbitration.' },
    ],
  },
};

export const LegalModal = ({ type, onClose }: LegalModalProps) => {
  const { colors } = useTheme();
  const content = type ? CONTENT[type] : null;

  return (
    <AnimatePresence>
      {type && content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: colors.bgCardSolid,
              border: `1px solid ${colors.border}`,
              borderRadius: '20px',
              width: '100%',
              maxWidth: 580,
              maxHeight: '80vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px 28px',
              borderBottom: `1px solid ${colors.border}`,
            }}>
              <h2 style={{ color: colors.text, fontWeight: 700, fontSize: '1.2rem' }}>{content.title}</h2>
              <button
                onClick={onClose}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: colors.textSecondary,
                  display: 'flex', alignItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div style={{ overflow: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h3 style={{ color: colors.text, fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px' }}>{section.heading}</h3>
                  <p style={{ color: colors.textSecondary, fontSize: '0.875rem', lineHeight: 1.7 }}>{section.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export type { ModalType };
