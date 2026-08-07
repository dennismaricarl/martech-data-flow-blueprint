import { useState } from 'react';

function VendorContentMockup({ onAdvance, vendorName, assetName }) {
  return (
    <div className="mock-browser" onClick={onAdvance} role="button" tabIndex={0}>
      <div className="mock-browser-bar">
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-url">{vendorName.toLowerCase()}.com/resources/report</span>
      </div>
      <div className="mock-site">
        <div className="mock-site-nav">
          <span className="mock-site-logo">{vendorName}</span>
          <span className="mock-site-link" />
          <span className="mock-site-link" />
        </div>
        <div className="mock-site-hero">
          <h3>{assetName}</h3>
          <p>A free report from Acme Co., hosted exclusively on {vendorName}.</p>
          <button className="mock-site-button">Download Now</button>
        </div>
      </div>
    </div>
  );
}

function VendorFormMockup({ onAdvance, vendorName }) {
  return (
    <div className="mock-form-card">
      <div className="mock-form-title">{vendorName} – Download Form</div>
      <div className="mock-form-field">
        <span>Full Name</span>
        <div className="mock-form-input is-prefilled">Mari Koehler</div>
      </div>
      <div className="mock-form-field">
        <span>Work Email</span>
        <div className="mock-form-input is-prefilled">mari@maricompany.com</div>
      </div>
      <div className="mock-form-field">
        <span>Company</span>
        <div className="mock-form-input is-prefilled">Mari Company</div>
      </div>
      <div className="mock-form-field">
        <span>Job Title</span>
        <div className="mock-form-input is-prefilled">VP, Revenue Operations</div>
      </div>
      <button className="mock-form-submit" onClick={onAdvance}>
        Download
      </button>
    </div>
  );
}

function VendorConfirmMockup({ vendorName }) {
  return (
    <div className="mock-linkedin-confirm">
      <p className="mock-linkedin-confirm-title">Thanks! Check Your Inbox.</p>
      <p className="mock-linkedin-confirm-body">
        Your download link is on its way, {vendorName} has logged this as a qualified download.
      </p>
    </div>
  );
}

export default function VendorLogicalWalkthrough({ channel, entry, vendorName, assetName, onChangeChannel }) {
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

  const crumbLabels = [entry.entryTitle, 'Visitor Fills Out the Vendor’s Form', 'Visitor Downloads the Asset'];

  return (
    <div className="walkthrough">
      <div className="walkthrough-channel-bar">
        <span>Path: <strong>{channel.label}</strong></span>
        <button className="walkthrough-change-channel" onClick={onChangeChannel}>
          ← Try a different path
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
            <h2 className="walkthrough-title">{entry.entryTitle}</h2>
            <div className="walkthrough-visual">
              <VendorContentMockup onAdvance={advance} vendorName={vendorName} assetName={assetName} />
            </div>
            <p className="walkthrough-caption">{entry.entryDescription}</p>
            <p className="walkthrough-hint">{entry.entryCta}</p>
          </>
        )}
        {stepIndex === 1 && (
          <>
            <p className="walkthrough-kicker">Step 2 of 3</p>
            <h2 className="walkthrough-title">Visitor Fills Out the Vendor’s Form</h2>
            <div className="walkthrough-visual">
              <VendorFormMockup onAdvance={advance} vendorName={vendorName} />
            </div>
            <p className="walkthrough-caption">
              This form lives on {vendorName}’s site, not yours. The visitor never sees your brand or your domain, {vendorName} owns this moment entirely.
            </p>
            <p className="walkthrough-hint">Click Download to continue</p>
          </>
        )}
        {isOutcome && (
          <>
            <p className="walkthrough-kicker">Step 3 of 3</p>
            <h2 className="walkthrough-title">Visitor Downloads the Asset</h2>
            <div className="walkthrough-visual">
              <VendorConfirmMockup vendorName={vendorName} />
            </div>
            <p className="walkthrough-caption">
              That’s the whole experience from the visitor’s side. What happens next, and how fast, depends entirely on which delivery path {vendorName} uses to send the lead over.
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
