import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV_ITEMS, SERVICE_NAMES } from '../data/site';
import LegalModal from './LegalModal';
import Logo from './Logo';
import './Footer.css';

const LEGAL_LINKS = [
  { label: 'Privacy Policy', type: 'privacy' },
  { label: 'Terms of Service', type: 'terms' },
];

const Footer = () => {
  const [legalModal, setLegalModal] = useState(null);
  const closeLegal = useCallback(() => setLegalModal(null), []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" onClick={scrollToTop} className="footer__logo" aria-label="Back to top">
              <Logo size={34} />
            </a>
            <p className="footer__tagline">{BRAND.tagline}</p>
            <div className="footer__social">
              <a href={BRAND.linkedin} aria-label="EdgeifyAI on LinkedIn" target="_blank" rel="noopener noreferrer" className="icon-btn">
                <Linkedin size={16} />
              </a>
              <a href={`mailto:${BRAND.email}`} aria-label={`Email ${BRAND.email}`} className="icon-btn">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Services">
            <h2 className="footer__heading">Services</h2>
            {SERVICE_NAMES.map((name) => (
              <a key={name} href="#services" className="footer__link">{name}</a>
            ))}
          </nav>

          <nav className="footer__col" aria-label="Company">
            <h2 className="footer__heading">Company</h2>
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={item.href} className="footer__link">{item.label}</a>
            ))}
          </nav>

          <div className="footer__col">
            <h2 className="footer__heading">Start a project</h2>
            <p className="footer__text">Tell us about the workflow you want to automate. We reply within one business day.</p>
            <a href={`mailto:${BRAND.email}`} className="footer__email">
              {BRAND.email}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} {BRAND.legalName} All rights reserved.</p>
          <div className="footer__legal">
            {LEGAL_LINKS.map((item) => (
              <button key={item.type} type="button" onClick={() => setLegalModal(item.type)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {legalModal && (
          <LegalModal key={legalModal} type={legalModal} onClose={closeLegal} />
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
