import { useState } from 'react';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'roadmap', label: 'The Roadmap' },
  { id: 'guide', label: 'How to Navigate' },
];

const GUIDE_STEPS = [
  {
    title: '1. Pick a flow',
    description:
      'Use the left sidebar to choose one of the data flows, Multi-Channel Inbound, Off-Platform Lead Generation, Third-Party & Vendor Inbound, Event & Engagement Operations, or The Backend Systems Engine.',
  },
  {
    title: '2. Toggle Visitor View / Systems View',
    description:
      'At the top of each flow is a toggle. Visitor View shows what the visitor actually sees and clicks. Systems View shows what’s happening behind the scenes in Marketo, Salesforce, and the rest of the stack.',
  },
  {
    title: '3. Walk through the steps',
    description:
      'Each view is broken into numbered steps. Click "Continue" to move forward, or jump back to any earlier step using the step list at the top of the page.',
  },
  {
    title: '4. Click on technical terms',
    description:
      'In Systems View, any bold, monospace word is clickable, things like webhook or MQL. Click one and a definition pops open in a panel on the right, in plain English.',
  },
  {
    title: '5. Browse the Glossary',
    description:
      'Want the full list all at once? Head to Glossary in the sidebar to search or browse every term by category.',
  },
];

const ROADMAP = [
  {
    title: '1. Multi-Channel Inbound Web Traffic',
    definition:
      'When a visitor leaves a digital footprint somewhere else (Google, LinkedIn, an email), clicks a link, and lands directly on your website to fill out a form.',
    why: 'This is the digital storefront, so it matters that every visitor is tracked back to exactly where they came from.',
  },
  {
    title: '2. Off-Platform Lead Generation',
    definition:
      'When a visitor fills out a native form completely inside a social app (like LinkedIn Lead Gen Forms) without ever visiting your website.',
    why: 'It’s incredibly fast for the visitor, but invisible to standard website tracking tools, so it needs an API bridge instead.',
  },
  {
    title: '3. Third-Party & Vendor Inbound',
    definition:
      'When an outside partner (like a content syndication vendor) captures leads on your behalf and sends them over via files or automated streams.',
    why: 'This data is notoriously messy, so it needs a “quarantine and cleaning” station before it ever touches the database.',
  },
  {
    title: '4. Event & Engagement Operations',
    definition:
      'Tracking when people register for, attend, or miss a live webinar or virtual event on platforms like Zoom.',
    why: 'It lets marketing instantly split the audience and send tailored follow-up emails based on whether people actually showed up.',
  },
  {
    title: '5. The Backend Systems Engine',
    definition:
      'The automated “brain” that scores leads, syncs them to the CRM, and routes them to the correct salesperson the moment a visitor enters through any of the flows above.',
    why: 'This is the grand finale, the step that turns raw marketing data into a real, live sales opportunity.',
  },
];

export default function AboutSection() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="walkthrough about-section">
      <div className="view-toggle about-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'is-active' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="walkthrough-stage about-stage">
        {tab === 'overview' && (
          <>
            <h2 className="walkthrough-title">About This Project</h2>
            <p className="about-copy">
              This site is an interactive walkthrough of how leads and prospect data enter systems across
              different channels, and how that data moves through the MarTech stack from first touch to lifecycle
              assignment and routing.
            </p>
            <p className="about-copy">
              Each flow in the sidebar covers one way a visitor can enter the pipeline, from clicking a paid ad to
              registering for a webinar, and lets you flip between two perspectives: what the visitor actually sees
              and clicks (<strong>Visitor View</strong>), and what’s happening under the hood across Marketo,
              Salesforce, and the rest of the MarTech stack (<strong>Systems View</strong>).
            </p>
            <p className="about-copy">
              While the data flow principles apply across any enterprise MOPs architecture, this project uses
              Marketo Engage and Salesforce CRM as its primary core stack, alongside tools like Google Tag Manager,
              LeanData, and custom webhooks.
            </p>

            <div className="about-why-box">
              <p className="about-why-title">
                <span className="about-why-emoji">💬</span> Why I Built This
              </p>
              <p>
                In Marketing Operations, one of the biggest challenges isn’t just configuring the automation, it’s
                helping cross-functional stakeholders visualize how data actually moves, not just from a user point
                of view, but also under the hood.
              </p>
              <p>
                My goal was to turn complex, multi-hop data pipelines into a clean, visual format that both
                technical and non-technical teams can explore and easily digest.
              </p>
              <p>Plus, it was just a really fun project to build!</p>
            </div>

            <p className="about-stack">Built with: React • Vite • Claude Code</p>

            <div className="about-author">
              <p className="about-author-name">Maricarl Koehler</p>
              <p className="about-author-title">Marketing Operations &amp; MarTech Systems Specialist</p>
              <p className="about-author-links">
                <a href="https://www.linkedin.com/in/marikoehler/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <span aria-hidden="true"> • </span>
                <a href="https://github.com/dennismaricarl" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <span aria-hidden="true"> • </span>
                <a href="mailto:maricarlkoehler@gmail.com">Email Me</a>
              </p>
            </div>
          </>
        )}

        {tab === 'roadmap' && (
          <>
            <h2 className="walkthrough-title">The Roadmap</h2>
            <p className="about-copy">What each pipeline in this project actually means.</p>
            <div className="about-roadmap-list">
              {ROADMAP.map((item) => (
                <div key={item.title} className="channel-card about-roadmap-item">
                  <span className="channel-card-label">{item.title}</span>
                  <p className="channel-card-description">
                    <strong>Definition:</strong> {item.definition}
                  </p>
                  <p className="channel-card-description">
                    <strong>Why it matters:</strong> {item.why}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'guide' && (
          <>
            <h2 className="walkthrough-title">How to Navigate</h2>
            <p className="about-copy">A quick rundown of how to get around this site.</p>
            <div className="about-roadmap-list">
              {GUIDE_STEPS.map((step) => (
                <div key={step.title} className="channel-card about-roadmap-item">
                  <span className="channel-card-label">{step.title}</span>
                  <p className="channel-card-description">{step.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
