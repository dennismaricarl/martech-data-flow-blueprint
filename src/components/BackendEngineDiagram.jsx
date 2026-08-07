import { useEffect, useState } from 'react';
import GlossaryText from './GlossaryText';

const INPUTS = ['Web Traffic', 'Social', 'Syndication', 'Events'];
const OUTPUTS = [
  ['Salesforce', 'Native Sync'],
  ['LeanData /', 'SFDC Rules'],
  ['SDR Queue +', 'Slack Alert'],
];

const INPUT_Y = [81, 145, 209, 273];
const OUTPUT_X = [730, 900, 1070];

const TOOLTIPS = {
  Inputs:
    'These are the primary lead entry archetypes in B2B marketing. Data enters the MarTech stack across 4 primary technical pathways: Webforms, Native Webhooks, REST APIs, and Syndication Ingestion.',
  Core: 'Marketo acts as the central clearinghouse and logic layer. Before a record is allowed to touch Sales or trigger routing rules, Marketo must first calculate fit and engagement, determine if the lead meets the MQL threshold, and stamp the required fields/lifecycle status.',
  Outputs: 'Executes the final handoff by syncing MQLs to Salesforce, routing them to the right account owner, and notifying reps for immediate follow-up.',
};

export default function BackendEngineDiagram() {
  const [active, setActive] = useState(null);

  function toggle(section) {
    setActive((current) => (current === section ? null : section));
  }

  useEffect(() => {
    if (!active) return undefined;
    function handleKey(e) {
      if (e.key === 'Escape') setActive(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active]);

  return (
    <div className="engine-diagram-wrap">
      <svg viewBox="0 0 1240 380" className="engine-diagram" role="img" aria-label="Hub and spoke diagram: five inbound channels feed Marketo scoring and MQL rules, which pushes leads through CRM sync and routing to the SDR.">
        <defs>
          <marker id="engine-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--text-faint)" />
          </marker>
        </defs>

        <g
          className={`engine-diagram-section${active === 'Inputs' ? ' is-active' : ''}`}
          onClick={() => toggle('Inputs')}
        >
          <text x="90" y="30" textAnchor="middle" className="engine-diagram-label">Inputs</text>
          {INPUTS.map((label, i) => {
            const y = INPUT_Y[i];
            const yc = y + 18;
            return (
              <g key={label}>
                <path d={`M170 ${yc} Q 330 ${yc} 470 195`} className="engine-diagram-line" markerEnd="url(#engine-arrow)" />
                <rect x="10" y={y} width="160" height="36" rx="6" className="engine-diagram-box" />
                <text x="90" y={y + 23} textAnchor="middle" className="engine-diagram-box-label">{label}</text>
              </g>
            );
          })}
        </g>

        <path d="M690 195 L730 195" className="engine-diagram-line" markerEnd="url(#engine-arrow)" />

        <g
          className={`engine-diagram-section${active === 'Core' ? ' is-active' : ''}`}
          onClick={() => toggle('Core')}
        >
          <text x="580" y="118" textAnchor="middle" className="engine-diagram-label">Core</text>
          <rect x="470" y="145" width="220" height="100" rx="8" className="engine-diagram-box engine-diagram-box-core" />
          <text x="580" y="174" textAnchor="middle" className="engine-diagram-core-title">Marketo</text>
          <text x="580" y="196" textAnchor="middle" className="engine-diagram-core-subtitle">Scoring &amp; MQL Rules</text>
          <text x="580" y="213" textAnchor="middle" className="engine-diagram-core-caption">Demographic + Behavioral</text>
          <text x="580" y="225" textAnchor="middle" className="engine-diagram-core-caption">+ Score Decay</text>
        </g>

        <g
          className={`engine-diagram-section${active === 'Outputs' ? ' is-active' : ''}`}
          onClick={() => toggle('Outputs')}
        >
          <text x="975" y="148" textAnchor="middle" className="engine-diagram-label">Outputs</text>
          {OUTPUT_X.map((x, i) => (
            <g key={x}>
              <rect x={x} y="173" width="150" height="44" rx="6" className="engine-diagram-box" />
              <text x={x + 75} y="190" textAnchor="middle" className="engine-diagram-box-label">{OUTPUTS[i][0]}</text>
              <text x={x + 75} y="204" textAnchor="middle" className="engine-diagram-box-label">{OUTPUTS[i][1]}</text>
            </g>
          ))}
        </g>

        <path d="M880 195 L900 195" className="engine-diagram-line" markerEnd="url(#engine-arrow)" />
        <path d="M1050 195 L1070 195" className="engine-diagram-line" markerEnd="url(#engine-arrow)" />
      </svg>

      <p className="engine-diagram-hint">Click <strong>Inputs</strong>, <strong>Core</strong>, or <strong>Outputs</strong> above for details.</p>

      {active && (
        <div className="engine-diagram-modal-backdrop" onClick={() => setActive(null)}>
          <div
            className="engine-diagram-modal"
            role="dialog"
            aria-label={`${active} details`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="engine-diagram-modal-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="engine-diagram-modal-title">{active}</h3>
            <p><GlossaryText text={TOOLTIPS[active]} /></p>
          </div>
        </div>
      )}
    </div>
  );
}
