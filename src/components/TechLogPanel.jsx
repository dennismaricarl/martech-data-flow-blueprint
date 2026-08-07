import GlossaryText from './GlossaryText';

export default function TechLogPanel({ panel }) {
  return (
    <div className="tech-panel">
      <div className="tech-panel-header">
        <span>
          <GlossaryText text={panel.system} />
        </span>
      </div>
      <div className="tech-panel-body">
        {panel.log.map((row, i) => (
          <div className="tech-kv-row" key={i}>
            <span className="tech-kv-key">
              <GlossaryText text={row.k} />
            </span>
            <span className="tech-kv-value">
              <GlossaryText text={row.v} />
            </span>
          </div>
        ))}
      </div>
      {panel.caption && (
        <p className="tech-caption">
          {typeof panel.caption === 'string' ? <GlossaryText text={panel.caption} /> : panel.caption}
        </p>
      )}
    </div>
  );
}
