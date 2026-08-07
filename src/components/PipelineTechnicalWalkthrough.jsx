import { useState } from 'react';
import GlossaryText from './GlossaryText';
import TechLogPanel from './TechLogPanel';

export default function PipelineTechnicalWalkthrough({ channel, onChangeChannel, pathLabel = 'Path' }) {
  const [stageIndex, setStageIndex] = useState(0);
  const pipeline = channel.pipeline;
  const totalStages = pipeline.length;
  const isLast = stageIndex === totalStages - 1;
  const stage = pipeline[stageIndex];

  function advance() {
    setStageIndex((i) => Math.min(i + 1, totalStages - 1));
  }

  function restart() {
    setStageIndex(0);
  }

  function goTo(i) {
    if (i <= stageIndex) setStageIndex(i);
  }

  return (
    <div className="walkthrough">
      <div className="walkthrough-channel-bar">
        <span>{pathLabel}: <strong>{channel.label}</strong></span>
        {onChangeChannel && (
          <button className="walkthrough-change-channel" onClick={onChangeChannel}>
            ← Try a different {pathLabel.toLowerCase()}
          </button>
        )}
      </div>

      <ol className="walkthrough-progress">
        {pipeline.map((s, i) => (
          <li
            key={s.title}
            className={`${i === stageIndex ? 'is-current' : ''} ${i < stageIndex ? 'is-done' : ''}`.trim()}
            onClick={() => goTo(i)}
          >
            {i + 1}. {s.crumbTitle || s.title}
          </li>
        ))}
      </ol>

      <div className="walkthrough-stage">
        <p className="walkthrough-kicker">Step {stageIndex + 1} of {totalStages}</p>
        <h2 className="walkthrough-title">{stage.title}</h2>
        <div className="tech-panel-row">
          {stage.panels.map((p, i) => (
            <TechLogPanel panel={p} key={i} />
          ))}
        </div>
        {stage.note && (
          <p className="tech-production-note">
            <strong>{stage.note.label}</strong> <GlossaryText text={stage.note.text} />
          </p>
        )}
        {isLast ? (
          <button className="walkthrough-restart" onClick={restart}>
            ↺ Replay from the start
          </button>
        ) : (
          <button className="walkthrough-restart" onClick={advance}>
            {stage.cta || 'Continue →'}
          </button>
        )}
      </div>
    </div>
  );
}
