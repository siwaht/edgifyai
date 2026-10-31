import { motion } from 'framer-motion';
import { Brain, Plug, Network, Gauge, Activity, Users, ShieldCheck, TrendingUp } from 'lucide-react';
import './Features.css';

const FEATURES = [
  { icon: Brain, title: 'Memory that carries over', description: 'Agents remember customers, preferences, and past conversations across calls, chats, and channels.' },
  { icon: Plug, title: 'Connected to your stack', description: 'Secure access to your CRM, calendar, helpdesk, and databases through APIs and the Model Context Protocol (MCP).' },
  { icon: Network, title: 'Multi-agent teams', description: 'Specialist agents pass work to each other, so complex requests are planned, split up, and double-checked.' },
  { icon: Gauge, title: 'Natural, low-latency voice', description: 'Streaming speech recognition and synthesis tuned so conversations feel human, not robotic.' },
  { icon: Activity, title: 'Evals and monitoring', description: 'Every call and chat is logged, scored, and replayable. You can see what the agent did and why.' },
  { icon: Users, title: 'Human in the loop', description: 'Approval steps, live takeover, and smart escalation keep your team in control of high-stakes actions.' },
  { icon: ShieldCheck, title: 'Security and compliance', description: 'PII redaction, prompt-injection defenses, and audit trails, designed around SOC 2, HIPAA, and GDPR requirements.' },
  { icon: TrendingUp, title: 'Managed and improved monthly', description: 'We review transcripts, fix edge cases, and report results every month, so your agent keeps getting better.' },
];

const Features = () => (
  <section id="capabilities" className="section">
    <div className="features__glow" aria-hidden="true" />
    <div className="container" style={{ position: 'relative' }}>
      <motion.header
        className="section-head section-head--split"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <span className="eyebrow">Why EdgeifyAI</span>
          <h2 className="section-title">
            Production-grade <span className="grad-text">from day one</span>
          </h2>
        </div>
        <p className="section-lead">
          A demo takes a weekend. An agent your customers can rely on takes real engineering.
          These are the building blocks inside every agent we ship, and we stay on to run and
          improve it after launch.
        </p>
      </motion.header>

      <div className="features-grid">
        {FEATURES.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            className="feature"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="feature__icon"><Icon size={20} strokeWidth={1.7} /></span>
            <h3 className="feature__title font-display">{title}</h3>
            <p className="feature__desc">{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
