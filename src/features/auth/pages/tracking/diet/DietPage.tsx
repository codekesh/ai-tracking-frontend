import { useEffect, useState } from "react";
import { addDietEntry, getDietEntries, type DietEntry } from "./api";

export default function DietPage() {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [entries, setEntries] = useState<DietEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await getDietEntries();
        setEntries(res.data);
      } catch (err) {
        console.error("Failed to fetch entries", err);
      }
    };

    fetchEntries();
  }, []);

  const handleSubmit = async () => {
    await addDietEntry({
      foodName,
      calories: Number(calories),
      protein: 0,
      carbs: 0,
      fat: 0,
    });

    setFoodName("");
    setCalories("");
  };

  const totalCalories = entries.reduce((sum, e) => sum + (e.calories || 0), 0);

  return (
    <div>
      <h2>Diet Tracker</h2>
      <h3>Total Calories: {totalCalories}</h3>
      <div>
        <input
          placeholder="Food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <input
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={!foodName || !calories}>
          Add
        </button>
      </div>

      <h3>Entries</h3>

      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.foodName}</td>
              <td>{e.calories}</td>
              <td>{new Date(e.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
