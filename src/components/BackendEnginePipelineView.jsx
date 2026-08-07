import { useState } from 'react';
import BackendEngineDiagram from './BackendEngineDiagram';
import GlossaryText from './GlossaryText';

export default function BackendEnginePipelineView({ channel }) {
  const [stepIndex, setStepIndex] = useState(0);
  const crumbLabels = ['Overview', 'The Core Data Flow Engine'];

  function goTo(i) {
    setStepIndex(i);
  }

  return (
    <div className="walkthrough">
      <ol className="walkthrough-progress">
        {crumbLabels.map((label, i) => (
          <li
            key={label}
            className={`${i === stepIndex ? 'is-current' : ''} ${i !== stepIndex ? 'is-done' : ''}`.trim()}
            onClick={() => goTo(i)}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="walkthrough-stage">
        {stepIndex === 0 && (
          <>
            <h2 className="walkthrough-title">How do leads progress from entry point to sales opportunity?</h2>
            <button className="channel-card" onClick={() => setStepIndex(1)}>
              <span className="channel-card-label">The Backend Systems Engine</span>
              <span className="channel-card-sublabel">{channel.sublabel}</span>
              <p className="channel-card-description">{channel.pickerDescription}</p>
            </button>
            <p className="walkthrough-hint">Click to view the architecture diagram</p>
          </>
        )}
        {stepIndex === 1 && (
          <>
            <h2 className="walkthrough-title">The Core Data Flow Engine</h2>
            <div className="picker-diagram">
              <BackendEngineDiagram />
            </div>
            {channel.footnote && (
              <p className="tech-production-note">
                <strong>{channel.footnote.label}</strong> <GlossaryText text={channel.footnote.text} />
              </p>
            )}
            <button className="walkthrough-restart" onClick={() => setStepIndex(0)}>
              ← Back to overview
            </button>
          </>
        )}
      </div>
    </div>
  );
}
