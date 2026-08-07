import { useState } from 'react';

const DEFAULT_FORM_DATA = {
  name: 'Mari Koehler',
  email: 'mari@maricompany.com',
  company: 'Mari Company',
};

function InviteMockup({ onAdvance, eventName }) {
  return (
    <div className="mock-email">
      <div className="mock-email-header">
        <div><span className="mock-email-label">From</span> Acme Co. &lt;events@acmeco.com&gt;</div>
        <div><span className="mock-email-label">Subject</span> You’re invited: {eventName}</div>
      </div>
      <p className="mock-email-body">
        Join us live for a session on scaling revenue operations, seats are limited.
      </p>
      <div className="mock-email-link" onClick={onAdvance} role="button" tabIndex={0}>
        Register Now →
      </div>
    </div>
  );
}

function RegistrationMockup({ onAdvance, eventName, formData, onChange }) {
  return (
    <div className="mock-browser">
      <div className="mock-browser-bar">
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-url">info.acmeco.com/webinar-register</span>
      </div>
      <div className="mock-site">
        <div className="mock-site-nav">
          <span className="mock-site-logo">acme</span>
          <span className="mock-site-link" />
          <span className="mock-site-link" />
        </div>
        <div className="mock-site-hero">
          <h3>{eventName}</h3>
          <p>Live session hosted by Acme Co. Fill out the form below to save your seat.</p>
        </div>
        <label className="mock-form-field">
          <span>Full Name</span>
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
        <button className="mock-site-button" onClick={onAdvance}>
          Submit
        </button>
      </div>
    </div>
  );
}

function ConfirmationEmailMockup({ onAdvance }) {
  return (
    <div className="mock-email" onClick={onAdvance} role="button" tabIndex={0}>
      <div className="mock-email-header">
        <div><span className="mock-email-label">From</span> Acme Co. &lt;events@acmeco.com&gt;</div>
        <div><span className="mock-email-label">Subject</span> You’re Registered!</div>
      </div>
      <p className="mock-email-body">
        Thanks for registering! Here’s your personal join link, it’s unique to you, so don’t share it.
      </p>
      <div className="mock-email-link">
        Your Join Link: zoom.us/w/8827…
      </div>
    </div>
  );
}

function LiveEventMockup({ onAttend, onMiss }) {
  return (
    <div className="mock-email">
      <div className="mock-email-header">
        <div><span className="mock-email-label">From</span> Acme Co. &lt;events@acmeco.com&gt;</div>
        <div><span className="mock-email-label">Subject</span> You’re Registered!</div>
      </div>
      <p className="mock-email-body">
        It’s time. Click your personal join link below to enter the live session.
      </p>
      <div className="mock-email-link" onClick={onAttend} role="button" tabIndex={0}>
        Your Join Link: zoom.us/w/8827… →
      </div>
      <p className="walkthrough-hint" onClick={onMiss} role="button" tabIndex={0} style={{ marginTop: 14, cursor: 'pointer' }}>
        Or, the visitor lets the email sit unread
      </p>
    </div>
  );
}

function OutcomeMockup({ attended }) {
  return (
    <div className="mock-linkedin-confirm">
      <p className="mock-linkedin-confirm-title">
        {attended ? 'Thanks for Joining!' : 'Sorry We Missed You!'}
      </p>
      <p className="mock-linkedin-confirm-body">
        {attended
          ? 'A recap email with slides and next steps is on its way.'
          : 'A replay link is on its way so you can catch up whenever you’re ready.'}
      </p>
    </div>
  );
}

export default function EventLogicalWalkthrough({ channel, entry, eventName, onChangeChannel }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [attended, setAttended] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const totalSteps = 4;
  const isOutcome = stepIndex === totalSteps;

  function advance() {
    setStepIndex((i) => Math.min(i + 1, totalSteps));
  }

  function choose(didAttend) {
    setAttended(didAttend);
    advance();
  }

  function restart() {
    setStepIndex(0);
    setAttended(null);
    setFormData(DEFAULT_FORM_DATA);
  }

  function goTo(i) {
    if (i <= stepIndex) setStepIndex(i);
  }

  const crumbLabels = [
    entry.entryTitle,
    'Visitor Lands on the Page & Registers',
    'Visitor Receives Confirmation Email',
    'The Live Event Happens',
    'Visitor Sees the Follow-Up',
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
            <p className="walkthrough-kicker">Step 1 of 5</p>
            <h2 className="walkthrough-title">{entry.entryTitle}</h2>
            <div className="walkthrough-visual">
              <InviteMockup onAdvance={advance} eventName={eventName} />
            </div>
            <p className="walkthrough-caption">{entry.entryDescription}</p>
            <p className="walkthrough-hint">{entry.entryCta}</p>
          </>
        )}
        {stepIndex === 1 && (
          <>
            <p className="walkthrough-kicker">Step 2 of 5</p>
            <h2 className="walkthrough-title">Visitor Lands on the Page & Registers</h2>
            <div className="walkthrough-visual">
              <RegistrationMockup onAdvance={advance} eventName={eventName} formData={formData} onChange={setFormData} />
            </div>
            <p className="walkthrough-caption">
              After clicking the “Register Now” button, the visitor lands on your custom landing page and completes the embedded Marketo form to register for the live session.
            </p>
            <p className="walkthrough-hint">Click Submit to continue</p>
          </>
        )}
        {stepIndex === 2 && (
          <>
            <p className="walkthrough-kicker">Step 3 of 5</p>
            <h2 className="walkthrough-title">Visitor Receives Confirmation Email</h2>
            <div className="walkthrough-visual">
              <ConfirmationEmailMockup onAdvance={advance} />
            </div>
            <p className="walkthrough-caption">
              Marketo fires an automated confirmation email containing the visitor’s unique Zoom join link, generated specifically for them.
            </p>
            <p className="walkthrough-hint">Click to continue</p>
          </>
        )}
        {stepIndex === 3 && (
          <>
            <p className="walkthrough-kicker">Step 4 of 5</p>
            <h2 className="walkthrough-title">The Live Event Happens</h2>
            <div className="walkthrough-visual">
              <LiveEventMockup onAttend={() => choose(true)} onMiss={() => choose(false)} />
            </div>
            <p className="walkthrough-caption">
              On the day of the event, the visitor clicks the Zoom join link from their confirmation email to enter, or lets it sit unread. Both outcomes matter, they lead to very different follow-up.
            </p>
          </>
        )}
        {isOutcome && (
          <>
            <p className="walkthrough-kicker">Step 5 of 5</p>
            <h2 className="walkthrough-title">Visitor Sees the Follow-Up</h2>
            <div className="walkthrough-visual">
              <OutcomeMockup attended={attended} />
            </div>
            <p className="walkthrough-caption">
              That’s the whole experience from the visitor’s side. Behind the scenes, this attendance outcome is what determines which nurture track they land in next.
            </p>
            <button className="walkthrough-restart" onClick={restart}>
              ↺ Replay from the start
            </button>
          </>
        )}
      </div>
    </div>
  );
}
