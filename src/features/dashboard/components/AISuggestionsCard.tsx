export default function AISuggestionsCard({
  suggestions,
}: {
  suggestions: string[];
}) {
  return (
    <div style={{ border: "1px solid gray", padding: "15px" }}>
      <h3>AI Insights</h3>
      <ul>
        {suggestions.map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
