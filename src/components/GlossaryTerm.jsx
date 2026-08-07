import { glossary } from '../data/glossary';
import { useGlossary } from '../context/GlossaryContext';

export default function GlossaryTerm({ termId, children }) {
  const { openTerm } = useGlossary();
  const term = glossary.find((t) => t.id === termId);
  if (!term) return children;

  return (
    <button type="button" className="glossary-term" onClick={() => openTerm(termId)}>
      {children}
    </button>
  );
}
