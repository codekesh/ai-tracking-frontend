import { useEffect, useState } from "react";
import { trackingAPI } from "../../shared/api/axios";
import UserCard from "./components/UserCard";
import SummaryCard from "./components/SummaryCard";
import StreakCard from "./components/StreakCard";
import AISuggestionsCard from "./components/AISuggestionsCard";
import type { DashboardResponse } from "./types";

export default function DashboardHome() {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    async function load() {
      const res = await trackingAPI.get("/dashboard/summary");
      setData(res.data);
    }

    load();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <UserCard user={data.user} />
      <SummaryCard diet={data.diet} />
      <StreakCard streaks={data.streaks} />
      <AISuggestionsCard suggestions={data.aiSuggestions} />
    </div>
  );
}
