import { useState } from 'react';

function LinkedInPostMockup({ onAdvance }) {
  return (
    <div className="mock-linkedin-post">
      <div className="mock-linkedin-header">
        <span className="mock-avatar" />
        <div>
          <div className="mock-ad-name">Acme Co.</div>
          <div className="mock-ad-promoted">Promoted</div>
        </div>
      </div>
      <p className="mock-ad-copy">
        New report: “The State of Lead Routing, 2026.” See how top revenue teams are fixing broken attribution.
      </p>
      <div className="mock-ad-image" />
      <button className="mock-linkedin-cta" onClick={onAdvance}>
        Download
      </button>
    </div>
  );
}

function LinkedInFormMockup({ onAdvance }) {
  return (
    <div className="mock-linkedin-form">
      <p className="mock-linkedin-form-note">Auto-filled from your LinkedIn profile</p>
      <div className="mock-form-field">
        <span>First Name</span>
        <div className="mock-form-input is-prefilled">Mari</div>
      </div>
      <div className="mock-form-field">
        <span>Last Name</span>
        <div className="mock-form-input is-prefilled">Koehler</div>
      </div>
      <div className="mock-form-field">
        <span>Work Email</span>
        <div className="mock-form-input is-prefilled">mari@maricompany.com</div>
      </div>
      <div className="mock-form-field">
        <span>Company Name</span>
        <div className="mock-form-input is-prefilled">Mari Company</div>
      </div>
      <button className="mock-linkedin-cta" onClick={onAdvance}>
        Submit
      </button>
    </div>
  );
}

function LinkedInConfirmMockup() {
  return (
    <div className="mock-linkedin-confirm">
      <p className="mock-linkedin-confirm-title">Thanks! We’ll be in touch.</p>
      <p className="mock-linkedin-confirm-body">You’re still right here in your LinkedIn feed.</p>
    </div>
  );
}

export default function OffPlatformLogicalWalkthrough({ channel, onChangeChannel }) {
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = 2;
  const isOutcome = stepIndex === totalSteps;

  function advance() {
    setStepIndex((i) => Math.min(i + 1, totalSteps));
  }

  function restart() {
    setStepIndex(0);
  }

  function goTo(i) {
    if (i <= stepIndex) setStepIndex(i);
  }

  const crumbLabels = [channel.entryTitle, 'Visitor Opens the Native Lead Form', 'Lead Submitted, Visitor Stays on LinkedIn'];

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
            <p className="walkthrough-kicker">Step 1 of 3</p>
            <h2 className="walkthrough-title">{channel.entryTitle}</h2>
            <div className="walkthrough-visual">
              <LinkedInPostMockup onAdvance={advance} />
            </div>
            <p className="walkthrough-caption">{channel.entryDescription}</p>
            <p className="walkthrough-hint">{channel.entryCta}</p>
          </>
        )}
        {stepIndex === 1 && (
          <>
            <p className="walkthrough-kicker">Step 2 of 3</p>
            <h2 className="walkthrough-title">Visitor Opens the Native Lead Form</h2>
            <div className="walkthrough-visual">
              <LinkedInFormMockup onAdvance={advance} />
            </div>
            <p className="walkthrough-caption">
              The form opens as an overlay directly inside LinkedIn. Every field is pre-filled from the visitor’s LinkedIn profile, they never type anything and never leave the app.
            </p>
            <p className="walkthrough-hint">Click Submit to continue</p>
          </>
        )}
        {isOutcome && (
          <>
            <p className="walkthrough-kicker">Step 3 of 3</p>
            <h2 className="walkthrough-title">Lead Submitted, Visitor Stays on LinkedIn</h2>
            <div className="walkthrough-visual">
              <LinkedInConfirmMockup />
            </div>
            <p className="walkthrough-caption">
              There’s no redirect, no landing page, no URL to inspect. From the visitor’s side, this is the whole journey, everything that happens next happens behind the scenes between systems.
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
