import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, AudioLines, MessageSquare, ScanText, BookOpenText, Workflow, Check } from 'lucide-react';
import './ServiceMatrix.css';

const SERVICES = [
  {
    icon: PhoneCall,
    title: 'Voice Calling Agents',
    tag: 'Phone',
    color: '#22d3ee',
    description: 'An AI receptionist and sales rep on your phone line. It answers every call, books appointments, qualifies leads, and transfers to your team with a summary when a person is needed.',
    points: ['Inbound and outbound calls on your numbers', 'Books into your calendar and CRM', 'Warm transfer with a full call summary'],
    idealFor: 'Clinics, home services, real estate, sales teams',
  },
  {
    icon: AudioLines,
    title: 'Voice Assistants',
    tag: 'Web & App',
    color: '#2dd4bf',
    description: 'A "talk to us" button that actually talks back. Real-time voice assistants on your website or app guide visitors, answer questions, and take orders in natural conversation.',
    points: ['Natural turn-taking and interruptions', 'Over 30 languages and accents', 'Your brand voice and personality'],
    idealFor: 'E-commerce, SaaS onboarding, hospitality',
  },
  {
    icon: MessageSquare,
    title: 'Chat & Support Agents',
    tag: 'Omnichannel',
    color: '#38bdf8',
    description: 'Support agents for web chat, WhatsApp, Slack, and email that resolve requests end to end, including refunds, order status, bookings, and account changes.',
    points: ['One agent across web, WhatsApp, and Teams', 'Takes real actions in your helpdesk', 'Hands off to humans with context'],
    idealFor: 'Support teams, D2C brands, marketplaces',
  },
  {
    icon: ScanText,
    title: 'Vision & Document Agents',
    tag: 'Multimodal',
    color: '#fbbf24',
    description: 'Agents that read invoices, forms, contracts, and photos, extract the data, check it against your rules, and push it into your systems. Manual data entry stops here.',
    points: ['Invoice, receipt, and form processing', 'Photo and video inspection', 'Validation against your business rules'],
    idealFor: 'Finance, logistics, insurance, field services',
  },
  {
    icon: BookOpenText,
    title: 'Knowledge Agents (RAG)',
    tag: 'Grounded',
    color: '#34d399',
    description: 'An assistant that knows your business. It answers from your docs, wikis, and databases and cites its sources, so staff and customers get accurate answers quickly.',
    points: ['Every answer links to its source', 'Respects existing user permissions', 'Syncs with Drive, Notion, and Confluence'],
    idealFor: 'Internal help desks, HR, legal, onboarding',
  },
  {
    icon: Workflow,
    title: 'Workflow & Computer-Use Agents',
    tag: 'Automation',
    color: '#fb7185',
    description: 'Agents that work your back office. They fill in portals, update spreadsheets, and move data between apps, including legacy systems that have no API.',
    points: ['Browser and desktop automation', 'Works with legacy tools, no API needed', 'Approval steps before key actions'],
    idealFor: 'Operations, finance ops, admin teams',
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;

  const handleMouseMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  // The entrance animation lives on a wrapper: framer-motion writes an inline transform,
  // which would otherwise override the CSS hover lift on the card itself.
  return (
    <motion.div
      style={{ height: '100%' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <article className="service card" style={{ '--c': service.color }} onMouseMove={handleMouseMove}>
        <div className="service__spotlight" aria-hidden="true" />

        <div className="service__top">
          <span className="icon-tile" style={{ '--c': service.color }}>
            <Icon size={21} strokeWidth={1.8} />
          </span>
          <span className="service__tag">{service.tag}</span>
        </div>

        <h3 className="service__title font-display">{service.title}</h3>
        <p className="service__desc">{service.description}</p>

        <ul className="service__points">
          {service.points.map((point) => (
            <li key={point}>
              <span className="service__check"><Check size={11} strokeWidth={3} /></span>
              {point}
            </li>
          ))}
        </ul>

        <p className="service__ideal">
          <span>Ideal for</span>
          {service.idealFor}
        </p>
      </article>
    </motion.div>
  );
};

const ServiceMatrix = () => (
  <section id="services" className="section section--alt">
    <div className="container">
      <motion.header
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">Services</span>
        <h2 className="section-title">
          Every kind of AI agent, <span className="grad-text">built for your business</span>
        </h2>
        <p className="section-lead">
          Start with one high-value workflow or roll out a full team of agents. Each one ships with
          monitoring, guardrails, and integrations into the systems you already run.
        </p>
      </motion.header>

      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>

      <p className="services-foot">
        Need something different? <a href="#contact">Tell us about your workflow</a> and we will
        recommend the right agent setup.
      </p>
    </div>
  </section>
);

export default ServiceMatrix;
