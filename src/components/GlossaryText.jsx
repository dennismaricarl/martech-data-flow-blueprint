import { glossary } from '../data/glossary';
import GlossaryTerm from './GlossaryTerm';

let matcher = null;

function getMatcher() {
  if (matcher) return matcher;

  const lookup = new Map();
  const phrases = [];

  glossary.forEach((term) => {
    (term.match || []).forEach((phrase) => {
      if (!lookup.has(phrase)) {
        phrases.push(phrase);
        lookup.set(phrase, term.id);
      }
    });
  });

  // Longest phrases first so multi-word matches win over shorter substrings
  // that happen to be prefixes of them (e.g. "UTM parameters" before "UTM").
  phrases.sort((a, b) => b.length - a.length);
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = phrases.length ? new RegExp(`\\b(${escaped.join('|')})\\b`, 'g') : null;

  matcher = { pattern, lookup };
  return matcher;
}

export default function GlossaryText({ text }) {
  if (typeof text !== 'string' || !text) return text;

  const { pattern, lookup } = getMatcher();
  if (!pattern) return text;
  pattern.lastIndex = 0;

  const parts = [];
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const phrase = match[0];
    const termId = lookup.get(phrase);
    parts.push(
      <GlossaryTerm termId={termId} key={`${termId}-${match.index}`}>
        {phrase}
      </GlossaryTerm>
    );
    lastIndex = match.index + phrase.length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts}</>;
}
