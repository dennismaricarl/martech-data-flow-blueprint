import { useState } from 'react';
import GlossaryText from './GlossaryText';
import TechLogPanel from './TechLogPanel';

function MiddlewareCallout() {
  return (
    <div className="tech-aside-callout">
      <span className="tech-aside-badge">How Meta/Google Differ</span>
      <p>
        <GlossaryText text="While LinkedIn features a native, direct LaunchPoint connector in Marketo, Google Ads and Meta lead forms frequently rely on middleware (e.g., Zapier, Tray.io, or custom webhook catch hooks) to ingest the payload, normalize field formats, and route data into the CRM or Marketo." />
      </p>
    </div>
  );
}

export default function OffPlatformTechnicalWalkthrough({ channel, onChangeChannel }) {
  const [stageIndex, setStageIndex] = useState(0);
  const totalStages = 4;
  const isLast = stageIndex === totalStages - 1;

  function advance() {
    setStageIndex((i) => Math.min(i + 1, totalStages - 1));
  }

  function restart() {
    setStageIndex(0);
  }

  function goTo(i) {
    if (i <= stageIndex) setStageIndex(i);
  }

  const stageTitles = ['Submission', 'Webhook Push', 'Marketo LaunchPoint API', 'Program Stamping & CRM Sync'];

  return (
    <div className="walkthrough">
      <div className="walkthrough-channel-bar">
        <span>Channel: <strong>{channel.label}</strong></span>
        <button className="walkthrough-change-channel" onClick={onChangeChannel}>
          ← Try a different channel
        </button>
      </div>

      <ol className="walkthrough-progress">
        {stageTitles.map((title, i) => (
          <li
            key={title}
            className={`${i === stageIndex ? 'is-current' : ''} ${i < stageIndex ? 'is-done' : ''}`.trim()}
            onClick={() => goTo(i)}
          >
            {i + 1}. {title}
          </li>
        ))}
      </ol>

      <div className="walkthrough-stage">
        {stageIndex === 0 && (
          <>
            <p className="walkthrough-kicker">Step 1 of {totalStages}</p>
            <h2 className="walkthrough-title">Submission</h2>
            <div className="walkthrough-visual">
              <div className="tech-panel is-clickable" onClick={advance} role="button" tabIndex={0}>
                <div className="tech-panel-header">
                  <span>LinkedIn – Native Lead Gen Form</span>
                </div>
                <div className="tech-panel-body">
                  <div className="tech-kv-row"><span className="tech-kv-key">First Name</span><span className="tech-kv-value">Mari</span></div>
                  <div className="tech-kv-row"><span className="tech-kv-key">Last Name</span><span className="tech-kv-value">Koehler</span></div>
                  <div className="tech-kv-row"><span className="tech-kv-key">Work Email</span><span className="tech-kv-value">mari@maricompany.com</span></div>
                  <div className="tech-kv-row"><span className="tech-kv-key">Job Title</span><span className="tech-kv-value">VP, Revenue Operations</span></div>
                </div>
                <p className="tech-caption">
                  <GlossaryText text="A user fills out the ad form natively inside LinkedIn. Nothing has been sent anywhere yet, this data is still sitting in LinkedIn’s system." />
                </p>
              </div>
            </div>
            <p className="walkthrough-caption">
              <GlossaryText text="The millisecond the user submits the form, LinkedIn bundles their field inputs into a structured JSON data object sitting at rest on LinkedIn’s servers." />
            </p>
            <p className="walkthrough-hint">Click to see the webhook fire</p>
          </>
        )}

        {stageIndex === 1 && (
          <>
            <p className="walkthrough-kicker">Step 2 of {totalStages}</p>
            <h2 className="walkthrough-title">Webhook Push</h2>
            <div className="walkthrough-visual">
              <TechLogPanel
                panel={{
                  system: 'LinkedIn – Automated Webhook “Driver”',
                  log: [
                    { k: 'Event', v: 'form.submitted' },
                    { k: 'Delivery Method', v: 'HTTPS POST Request' },
                    { k: 'Payload Format', v: 'JSON Object → { "first_name": "Mari", "email": "..." }' },
                    { k: 'Latency', v: 'Real-time, same instant as submission' },
                  ],
                  caption: 'LinkedIn’s server fires an automated HTTP POST request, delivering the JSON payload directly to Marketo’s designated endpoint URL. This is a push, not a poll, nothing has to ask LinkedIn for the lead.',
                }}
              />
            </div>
            <button className="walkthrough-restart" onClick={advance}>
              Continue to Marketo →
            </button>
          </>
        )}

        {stageIndex === 2 && (
          <>
            <p className="walkthrough-kicker">Step 3 of {totalStages}</p>
            <h2 className="walkthrough-title">Marketo LaunchPoint API</h2>
            <div className="walkthrough-visual">
              <TechLogPanel
                panel={{
                  system: 'Marketo – LinkedIn LaunchPoint Connector',
                  log: [
                    { k: 'One-time setup', v: 'Authenticated via OAuth in Marketo LaunchPoint Settings' },
                    { k: 'Result of setup', v: 'Establishes an invisible, standing API highway between systems' },
                    { k: 'Action', v: 'Receives HTTP POST, parses JSON payload & checks duplicates' },
                    { k: 'Result', v: 'Clean contact dropped into the marketing database' },
                  ],
                  caption: 'Through a one-time setup, Marketo connects to LinkedIn’s Ads Manager via LaunchPoint (Marketo’s OAuth-based integration framework), establishing an automated pipeline between systems. When a user submits a form, Marketo receives the HTTP POST, parses the JSON object, and ingests the contact into the database.',
                }}
              />
            </div>
            <MiddlewareCallout />
            <button className="walkthrough-restart" onClick={advance}>
              Continue to Program stamping →
            </button>
          </>
        )}

        {stageIndex === 3 && (
          <>
            <p className="walkthrough-kicker">Step 4 of {totalStages}</p>
            <h2 className="walkthrough-title">Program Stamping & CRM Sync</h2>
            <div className="tech-panel-row">
              <TechLogPanel
                panel={{
                  system: 'Marketo – Smart Campaign (Stamping)',
                  log: [
                    { k: 'Trigger', v: `“${channel.stampingTrigger}”` },
                    { k: 'Action', v: 'Stamp lead record upon form submission (no browser session or hidden URL fields required)' },
                    { k: 'Lead Source ←', v: `“${channel.leadSource}”` },
                    { k: 'Program', v: channel.program },
                  ],
                  caption: 'Without live web UTM parameters, attribution relies on native event triggers: a Marketo Smart Campaign listens for the “Fills Out LinkedIn Lead Gen Form” event and automatically stamps the record (e.g., Lead Source = Paid Social).',
                }}
              />
              <TechLogPanel
                panel={{
                  system: 'CRM – Lead/Contact Sync',
                  log: [
                    { k: 'Sync', v: 'Native Marketo–CRM connector' },
                    { k: 'Record', v: 'Lead created or updated, source stamped' },
                  ],
                  caption: 'Marketo’s native bi-directional connector syncs the record to Salesforce automatically. Existing contacts are updated with the new form values, while brand-new prospects are created as new leads, fully preserving all newly stamped attribution.',
                }}
              />
            </div>
            {isLast && (
              <button className="walkthrough-restart" onClick={restart}>
                ↺ Replay from the start
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
