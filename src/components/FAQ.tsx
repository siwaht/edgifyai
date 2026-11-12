import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTheme } from '../context/theme';
import { FAQS } from '../content/site';

const FaqItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { colors } = useTheme();

  return (
    <div style={{
      background: colors.bgCard,
      border: `1px solid ${isOpen ? colors.borderHover : colors.border}`,
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      overflow: 'hidden',
      transition: 'border-color 0.2s ease',
    }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '20px 22px',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ color: colors.text, fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 }}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', flexShrink: 0, color: colors.accent }}
        >
          <Plus size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              color: colors.textSecondary,
              fontSize: '0.875rem',
              lineHeight: 1.7,
              padding: '0 22px 22px',
              margin: 0,
            }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { colors } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: colors.bg, padding: '96px 24px' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span style={{
            display: 'inline-block',
            color: colors.accent,
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Questions
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}
          >
            The Things Buyers Ask First
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
