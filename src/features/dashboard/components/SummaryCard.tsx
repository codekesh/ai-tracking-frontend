import type { DietSummary } from "../types";

export default function SummaryCard({ diet }: { diet: DietSummary }) {
  return (
    <div style={{ border: "1px solid gray", padding: "15px" }}>
      <h3>Today Summary</h3>
      <p>
        Calories: {diet.todayCalories} / {diet.goal}
      </p>
      <p>Entries: {diet.entriesCount}</p>
    </div>
  );
}
