import { useEffect, useState } from "react";
import { getDietEntries, addDietEntry, type DietEntry } from "./api";
import DietForm from "./DietForm";
import MealSection from "./MealSection";

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";

export default function DietPage() {
  const [entries, setEntries] = useState<DietEntry[]>([]);
  const [openMeal, setOpenMeal] = useState<string | null>(null);

  const fetchEntries = async () => {
    const res = await getDietEntries();
    setEntries(res.data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAdd = async (data: any) => {
    await addDietEntry(data);
    fetchEntries();
  };

  const handleToggle = (meal: string) => {
    setOpenMeal((prev) => (prev === meal ? null : meal));
  };

  const grouped = {
    BREAKFAST: entries.filter((e) => e.mealType === "BREAKFAST"),
    LUNCH: entries.filter((e) => e.mealType === "LUNCH"),
    DINNER: entries.filter((e) => e.mealType === "DINNER"),
    SNACKS: entries.filter((e) => e.mealType === "SNACKS"),
  };

  const totalCalories = entries.reduce((sum, e) => sum + (e.calories || 0), 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "10px",
        gap: "100px",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ width: "340px", flexShrink: 0 }}>
        <DietForm onAdd={handleAdd} />
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1 }}>
        <h2>Total Calories: {totalCalories}</h2>

        <MealSection
          title="Breakfast"
          entries={grouped.BREAKFAST}
          isOpen={openMeal === "BREAKFAST"}
          onToggle={() => handleToggle("BREAKFAST")}
        />

        <MealSection
          title="Lunch"
          entries={grouped.LUNCH}
          isOpen={openMeal === "LUNCH"}
          onToggle={() => handleToggle("LUNCH")}
        />

        <MealSection
          title="Dinner"
          entries={grouped.DINNER}
          isOpen={openMeal === "DINNER"}
          onToggle={() => handleToggle("DINNER")}
        />

        <MealSection
          title="Snacks"
          entries={grouped.SNACKS}
          isOpen={openMeal === "SNACKS"}
          onToggle={() => handleToggle("SNACKS")}
        />
      </div>
    </div>
  );
}
