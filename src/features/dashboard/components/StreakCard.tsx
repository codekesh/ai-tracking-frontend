import type { StreakSummary } from "../types";

export default function StreakCard({ streaks }: { streaks: StreakSummary }) {
  return (
    <div style={{ border: "1px solid gray", padding: "15px" }}>
      <h3>Streaks</h3>
      <p>🔥 Diet: {streaks.diet} days</p>
    </div>
  );
}