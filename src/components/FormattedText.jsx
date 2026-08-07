export default function FormattedText({ text }) {
  if (typeof text !== 'string' || !text.includes('`')) return text;

  const parts = text.split('`');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code className="inline-code" key={i}>
            {part}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
}
