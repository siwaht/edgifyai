import './Marquee.css';

const INTEGRATIONS = [
  'HubSpot',
  'Salesforce',
  'Zendesk',
  'Intercom',
  'Shopify',
  'Slack',
  'WhatsApp',
  'Microsoft Teams',
  'Google Workspace',
  'Twilio',
  'Stripe',
  'Notion',
  'Calendly',
  'PostgreSQL',
];

const Row = ({ hidden = false }) => (
  <ul className="marquee__row" aria-hidden={hidden || undefined}>
    {INTEGRATIONS.map((name) => (
      <li key={name} className="marquee__item font-display">{name}</li>
    ))}
  </ul>
);

const Marquee = () => (
  <section className="marquee" aria-labelledby="integrations-label">
    <p id="integrations-label" className="marquee__label">
      Plugs into the tools your team already uses
    </p>
    <div className="marquee__viewport">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </div>
  </section>
);

export default Marquee;
