import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CircleCheck, Clock, Mail, CalendarCheck, CircleAlert, Check } from 'lucide-react';
import { BRAND, SERVICE_NAMES } from '../data/site';
import './Contact.css';

const SERVICE_OPTIONS = [...SERVICE_NAMES, 'Not sure yet'];

// Production is deployed as a static site, so the Make.com webhook is the delivery path that always works.
// The /api/contact route is used when the Express server is running (local dev / full-stack deploys).
const WEBHOOK_URL = 'https://hook.eu2.make.com/mcgnqhptgj77mjg42kx5lbuj8w52zhov';
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const REQUEST_TIMEOUT_MS = 15000;

const post = (url, body) => {
  const signal = typeof AbortSignal !== 'undefined' && AbortSignal.timeout
    ? AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    : undefined;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });
};

// A static host can answer POST /api/contact with index.html and a 200, so only a JSON success counts.
const sendToApi = (payload) =>
  post('/api/contact', payload)
    .then(async (res) => {
      if (!res.ok) return false;
      const data = await res.json().catch(() => null);
      return data?.success === true;
    })
    .catch(() => false);

const sendToWebhook = (payload) =>
  post(WEBHOOK_URL, { ...payload, submitted_at: new Date().toISOString() })
    .then((res) => res.ok)
    .catch(() => false);

const INITIAL_FORM = { name: '', email: '', types: [], message: '', website: '' };

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    lines: [
      <a key="hello" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>,
      <a key="support" href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>,
    ],
  },
  { icon: Clock, title: 'Response time', lines: ['Within one business day', 'Mon–Fri, 9am–6pm PT'] },
  { icon: CalendarCheck, title: 'What happens next', lines: ['We reply with times for a 30-minute call', 'and a few questions about your workflow'] },
];

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const updateField = useCallback((field) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleType = useCallback((type) => {
    setForm((prev) => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type],
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      project_type: form.types.join(', ') || 'General Inquiry',
      message: form.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError('Please fill in your name, email, and a short message.');
      return;
    }
    if (!EMAIL_PATTERN.test(payload.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Honeypot: real visitors never see or fill this field.
    if (form.website) {
      setIsSuccess(true);
      setForm(INITIAL_FORM);
      return;
    }

    setIsSubmitting(true);
    const results = await Promise.all([sendToApi(payload), sendToWebhook(payload)]);
    setIsSubmitting(false);

    if (results.some(Boolean)) {
      setIsSuccess(true);
      setForm(INITIAL_FORM);
    } else {
      setError(`We could not send your message. Please try again or email us at ${BRAND.email}.`);
    }
  }, [form, isSubmitting]);

  return (
    <section id="contact" className="section section--alt">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact">
        <motion.div
          className="contact__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">
            Tell us what you want to <span className="grad-text">automate</span>
          </h2>
          <p className="section-lead">
            Book a free strategy call with our agent team. We will look at your workflows, recommend
            the right voice, chat, or vision setup, and outline a pilot you can launch in weeks.
          </p>

          <ul className="contact__info">
            {CONTACT_INFO.map(({ icon: Icon, title, lines }) => (
              <li key={title}>
                <span className="icon-tile"><Icon size={19} strokeWidth={1.8} /></span>
                <div>
                  <h3 className="contact__info-title">{title}</h3>
                  {lines.map((line, i) => (
                    <p key={i} className="contact__info-line">{line}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact__card card">
            <AnimatePresence mode="wait" initial={false}>
              {isSuccess ? (
                <motion.div
                  key="success"
                  className="contact__success"
                  role="status"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    className="contact__success-icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
                  >
                    <CircleCheck size={34} />
                  </motion.span>
                  <h3 className="contact__success-title font-display">Thanks, your message is in</h3>
                  <p className="contact__success-text">
                    We will reply within one business day with a few times for a strategy call.
                  </p>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsSuccess(false)}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="contact__row">
                    <div className="field">
                      <label htmlFor="contact-name" className="field__label">Your name</label>
                      <input
                        id="contact-name"
                        className="field__input"
                        type="text"
                        required
                        value={form.name}
                        onChange={updateField('name')}
                        placeholder="Jane Smith"
                        autoComplete="name"
                        maxLength={200}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="contact-email" className="field__label">Work email</label>
                      <input
                        id="contact-email"
                        className="field__input"
                        type="email"
                        required
                        value={form.email}
                        onChange={updateField('email')}
                        placeholder="jane@company.com"
                        autoComplete="email"
                        maxLength={320}
                      />
                    </div>
                  </div>

                  <fieldset className="field">
                    <legend className="field__label">
                      What are you interested in? <span className="field__hint">Select all that apply</span>
                    </legend>
                    <div className="chips">
                      {SERVICE_OPTIONS.map((type) => {
                        const isActive = form.types.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            className={`chip ${isActive ? 'is-active' : ''}`}
                            onClick={() => toggleType(type)}
                            aria-pressed={isActive}
                          >
                            {isActive && <Check size={13} strokeWidth={2.75} />}
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="field">
                    <label htmlFor="contact-message" className="field__label">What would you like to automate?</label>
                    <textarea
                      id="contact-message"
                      className="field__input field__textarea"
                      rows={5}
                      required
                      value={form.message}
                      onChange={updateField('message')}
                      placeholder="For example: we miss a lot of calls after 5pm and want an agent that answers, qualifies, and books appointments."
                      maxLength={5000}
                    />
                  </div>

                  {/* Honeypot field for bots */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={updateField('website')}
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        key="error"
                        role="alert"
                        className="contact__error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <CircleAlert size={16} />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit" className="btn btn-primary btn-block contact__submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={16} className="btn-arrow" />
                      </>
                    )}
                  </button>
                  <p className="contact__note">We reply within one business day. No spam, ever.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
