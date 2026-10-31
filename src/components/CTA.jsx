import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import './CTA.css';

const BENEFITS = [
  'Free 30-minute strategy call',
  'Fixed-scope pilot proposal',
  'You own your data and prompts',
  'Monthly tuning and support',
];

const CTA = () => (
  <section className="section section--alt cta-section">
    <div className="container">
      <motion.div
        className="cta"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cta__bg" aria-hidden="true" />
        <div className="cta__content">
          <span className="eyebrow">Get started</span>
          <h2 className="section-title cta__title">
            Start with one agent.
            <br />
            <span className="grad-text">Scale when it pays off.</span>
          </h2>
          <p className="section-lead cta__lead">
            Pick the workflow that costs you the most time today, whether that is missed calls, slow
            support replies, or manual data entry. We will have a working pilot live in 2–4 weeks.
          </p>

          <div className="cta__actions">
            <a href="#contact" className="btn btn-primary">
              Book a Free Strategy Call
              <ArrowRight size={17} className="btn-arrow" />
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              See How It Works
            </a>
          </div>

          <ul className="cta__benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <span className="check-dot"><Check size={11} strokeWidth={3} /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
