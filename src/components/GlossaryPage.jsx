import { useMemo, useState } from 'react';
import { glossary } from '../data/glossary';
import { useGlossary } from '../context/GlossaryContext';
import FormattedText from './FormattedText';

export default function GlossaryPage() {
  const [query, setQuery] = useState('');
  const { openTerm } = useGlossary();

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? glossary.filter(
          (t) =>
            t.label.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
        )
      : glossary;

    const map = new Map();
    filtered.forEach((term) => {
      if (!map.has(term.category)) map.set(term.category, []);
      map.get(term.category).push(term);
    });
    return Array.from(map.entries());
  }, [query]);

  return (
    <div className="walkthrough">
      <div className="walkthrough-stage glossary-stage">
        <h2 className="walkthrough-title">Glossary</h2>
        <p className="about-copy">
          Every technical term tagged throughout this project, defined in plain English with its MOps context.
          Click any term for the full breakdown.
        </p>

        <input
          type="text"
          className="glossary-search"
          placeholder="Search terms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {grouped.length === 0 && <p className="tech-param-empty">No terms match “{query}”.</p>}

        {grouped.map(([category, terms]) => (
          <div className="glossary-category-group" key={category}>
            <h3 className="glossary-category-title">{category}</h3>
            <div className="glossary-term-grid">
              {terms.map((term) => (
                <button
                  key={term.id}
                  type="button"
                  className="channel-card glossary-term-card"
                  onClick={() => openTerm(term.id)}
                >
                  <span className="channel-card-label">{term.label}</span>
                  <p className="channel-card-description">
                    <FormattedText text={term.definition} />
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
