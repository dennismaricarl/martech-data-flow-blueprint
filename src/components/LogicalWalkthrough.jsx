import { useState } from 'react';

const DEFAULT_FORM_DATA = {
  name: 'Mari Koehler',
  email: 'mari@maricompany.com',
  company: 'Mari Company',
};

function buildUrl(channel) {
  if (!channel.hasUtm) return 'yoursite.com/demo';
  const { source, medium, campaign } = channel.utm;
  const gclidPart = channel.gclid ? `&gclid=${channel.gclid}` : '';
  return `yoursite.com/demo?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}${gclidPart}`;
}

function landingNote(channel) {
  if (channel.hasUtm) return 'Captured automatically';
  if (channel.referrer) return 'Referrer noted automatically';
  return null;
}

function landingDescription(channel) {
  if (channel.hasUtm) {
    return 'The tracking codes are quietly picked up in the background the instant the page loads, before the visitor does anything.';
  }
  if (channel.referrer) {
    return 'There’s no tracking code to grab, but the browser quietly tells the site it arrived from Google’s search results.';
  }
  return 'There’s no link, no tracking code, and no referrer at all, the site has no idea where this visitor came from.';
}

function AdMockup({ channel, onAdvance }) {
  return (
    <div className="mock-ad-card" onClick={onAdvance} role="button" tabIndex={0}>
      <div className="mock-ad-header">
        <span className="mock-avatar" />
        <div>
          <div className="mock-ad-name">Acme Co.</div>
          <div className="mock-ad-promoted">Promoted</div>
        </div>
      </div>
      <p className="mock-ad-copy">
        Your lead routing rules are held together by duct tape and a Zapier zap named “DO NOT TOUCH.” We can help.
      </p>
      <div className="mock-ad-image" />
      <div className="mock-ad-cta">Request a Demo →</div>
      <div className="mock-ad-url">{buildUrl(channel)}</div>
    </div>
  );
}

function SearchResultMockup({ onAdvance }) {
  return (
    <div className="mock-search" onClick={onAdvance} role="button" tabIndex={0}>
      <div className="mock-search-bar">🔍 fix my broken lead routing</div>
      <div className="mock-search-result">
        <div className="mock-search-breadcrumb">yoursite.com › demo</div>
        <div className="mock-search-title">Acme Co. – Lead Routing That Doesn’t Require a Séance</div>
        <p className="mock-search-desc">
          Stop guessing which rep gets which lead. Route, score, and sync without summoning IT.
        </p>
      </div>
    </div>
  );
}

function EmailMockup({ onAdvance }) {
  return (
    <div className="mock-email">
      <div className="mock-email-header">
        <div><span className="mock-email-label">From</span> Acme Co. &lt;hello@acmeco.com&gt;</div>
        <div><span className="mock-email-label">Subject</span> Your leads called. They want better routing.</div>
      </div>
      <p className="mock-email-body">
        Hi there, still routing leads via vibes and a spreadsheet called FINAL_v3? There’s a better way, promise.
      </p>
      <div className="mock-email-link" onClick={onAdvance} role="button" tabIndex={0}>
        Read the Guide →
      </div>
    </div>
  );
}

function DirectMockup({ onAdvance }) {
  return (
    <div className="mock-direct" onClick={onAdvance} role="button" tabIndex={0}>
      <span className="mock-browser-dot" />
      <span className="mock-browser-dot" />
      <span className="mock-browser-dot" />
      <span className="tech-url-text">yoursite.com/demo</span>
      <span className="mock-direct-cursor">▍</span>
    </div>
  );
}

function EntryVisual({ channel, onAdvance }) {
  if (channel.visualType === 'ad') return <AdMockup channel={channel} onAdvance={onAdvance} />;
  if (channel.visualType === 'search') return <SearchResultMockup onAdvance={onAdvance} />;
  if (channel.visualType === 'email') return <EmailMockup onAdvance={onAdvance} />;
  return <DirectMockup onAdvance={onAdvance} />;
}

function WebsiteMockup({ onAdvance, channel }) {
  const note = landingNote(channel);
  return (
    <div className="mock-browser">
      <div className="mock-browser-bar">
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-url">{buildUrl(channel)}</span>
      </div>
      {note && (
        <div className="mock-callout">
          <span className="mock-callout-note">{note}</span>
        </div>
      )}
      <div className="mock-site">
        <div className="mock-site-nav">
          <span className="mock-site-logo">acme</span>
          <span className="mock-site-link" />
          <span className="mock-site-link" />
          <span className="mock-site-link" />
        </div>
        <div className="mock-site-hero">
          <h3>See the Platform in Action</h3>
          <p>A live look at how top revenue teams run their pipeline.</p>
          <button className="mock-site-button" onClick={onAdvance}>
            Request a Demo
          </button>
        </div>
      </div>
    </div>
  );
}

function FormMockup({ formData, onChange, onAdvance }) {
  return (
    <div className="mock-form-card">
      <div className="mock-form-title">Request a Demo</div>
      <label className="mock-form-field">
        <span>Name</span>
        <input
          className="mock-form-input"
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
        />
      </label>
      <label className="mock-form-field">
        <span>Work Email</span>
        <input
          className="mock-form-input"
          value={formData.email}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
        />
      </label>
      <label className="mock-form-field">
        <span>Company</span>
        <input
          className="mock-form-input"
          value={formData.company}
          onChange={(e) => onChange({ ...formData, company: e.target.value })}
        />
      </label>
      <button className="mock-form-submit" onClick={onAdvance}>
        Submit
      </button>
    </div>
  );
}

function ThankYouMockup() {
  return (
    <div className="mock-browser">
      <div className="mock-browser-bar">
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-url">yoursite.com/demo/thank-you</span>
      </div>
      <div className="mock-site">
        <div className="mock-site-nav">
          <span className="mock-site-logo">acme</span>
          <span className="mock-site-link" />
          <span className="mock-site-link" />
          <span className="mock-site-link" />
        </div>
        <div className="mock-site-hero">
          <h3>Thanks! We’ll Be in Touch.</h3>
          <p>A member of our team will reach out shortly to schedule your demo.</p>
        </div>
      </div>
    </div>
  );
}

export default function LogicalWalkthrough({ channel, formStep, onChangeChannel }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const totalSteps = 3;
  const isOutcome = stepIndex === totalSteps;

  function advance() {
    setStepIndex((i) => Math.min(i + 1, totalSteps));
  }

  function restart() {
    setStepIndex(0);
    setFormData(DEFAULT_FORM_DATA);
  }

  function goTo(i) {
    if (i <= stepIndex) setStepIndex(i);
  }

  const crumbLabels = [
    channel.entryTitle,
    'Visitor Lands on the Website',
    formStep.title,
    'Visitor Sees a Confirmation Message',
  ];

  return (
    <div className="walkthrough">
      <div className="walkthrough-channel-bar">
        <span>Channel: <strong>{channel.label}</strong></span>
        <button className="walkthrough-change-channel" onClick={onChangeChannel}>
          ← Try a different channel
        </button>
      </div>

      <ol className="walkthrough-progress">
        {crumbLabels.map((label, i) => (
          <li
            key={label}
            className={`${i === stepIndex ? 'is-current' : ''} ${i < stepIndex ? 'is-done' : ''}`.trim()}
            onClick={() => goTo(i)}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="walkthrough-stage">
        {stepIndex === 0 && (
          <>
            <p className="walkthrough-kicker">Step 1 of 4</p>
            <h2 className="walkthrough-title">{channel.entryTitle}</h2>
            <div className="walkthrough-visual">
              <EntryVisual channel={channel} onAdvance={advance} />
            </div>
            <p className="walkthrough-caption">{channel.entryDescription}</p>
            <p className="walkthrough-hint">{channel.entryCta}</p>
          </>
        )}
        {stepIndex === 1 && (
          <>
            <p className="walkthrough-kicker">Step 2 of 4</p>
            <h2 className="walkthrough-title">Visitor Lands on the Website</h2>
            <div className="walkthrough-visual">
              <WebsiteMockup onAdvance={advance} channel={channel} />
            </div>
            <p className="walkthrough-caption">{landingDescription(channel)}</p>
            <p className="walkthrough-hint">Click to open the demo request form</p>
          </>
        )}
        {stepIndex === 2 && (
          <>
            <p className="walkthrough-kicker">{formStep.kicker}</p>
            <h2 className="walkthrough-title">{formStep.title}</h2>
            <div className="walkthrough-visual">
              <FormMockup formData={formData} onChange={setFormData} onAdvance={advance} />
            </div>
            <p className="walkthrough-caption">{formStep.description}</p>
            <p className="walkthrough-hint">{formStep.cta}</p>
          </>
        )}
        {isOutcome && (
          <>
            <p className="walkthrough-kicker">Step 4 of 4</p>
            <h2 className="walkthrough-title">Visitor Sees a Confirmation Message</h2>
            <div className="walkthrough-visual">
              <ThankYouMockup />
            </div>
            <button className="walkthrough-restart" onClick={restart}>
              ↺ Replay from the start
            </button>
          </>
        )}
      </div>
    </div>
  );
}
