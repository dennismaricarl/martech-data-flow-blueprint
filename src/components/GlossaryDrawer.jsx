import { useEffect } from 'react';
import { glossary } from '../data/glossary';
import { useGlossary } from '../context/GlossaryContext';
import FormattedText from './FormattedText';

export default function GlossaryDrawer() {
  const { termId, isOpen, closeDrawer, navigateToGlossary } = useGlossary();
  const term = glossary.find((t) => t.id === termId) ?? null;

  useEffect(() => {
    if (!isOpen) return undefined;
    function handleKey(e) {
      if (e.key === 'Escape') closeDrawer();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeDrawer]);

  return (
    <>
      <div
        className={`glossary-backdrop${isOpen ? ' is-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside className={`glossary-drawer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        {term && (
          <>
            <div className="glossary-drawer-header">
              <div>
                <span className="glossary-drawer-category">{term.category}</span>
                <h2 className="glossary-drawer-title">{term.label}</h2>
              </div>
              <button
                type="button"
                className="glossary-drawer-close"
                onClick={closeDrawer}
                aria-label="Close glossary panel"
              >
                ×
              </button>
            </div>

            <div className="glossary-drawer-body">
              <section className="glossary-drawer-section">
                <h3>What It Is</h3>
                <p><FormattedText text={term.definition} /></p>
              </section>
              <section className="glossary-drawer-section">
                <h3>In MOPs Architecture</h3>
                {Array.isArray(term.mopsContext) ? (
                  term.mopsContext.map((paragraph, i) => (
                    <p key={i}><FormattedText text={paragraph} /></p>
                  ))
                ) : (
                  <p><FormattedText text={term.mopsContext} /></p>
                )}
              </section>
            </div>

            <button type="button" className="glossary-drawer-viewall" onClick={navigateToGlossary}>
              View all in Glossary →
            </button>
          </>
        )}
      </aside>
    </>
  );
}
