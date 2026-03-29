import { useState } from "react";
import "./DietForm.css";
import type { DietFormProps, MealType } from "../../types";

export default function DietForm({ onAdd }: DietFormProps) {
  const [foodName, setFoodName] = useState("");
  const [noOfServings, setNoOfServings] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [mealType, setMealType] = useState<MealType>("BREAKFAST");

  const handleSubmit = () => {
    onAdd({
      foodName,
      noOfServings: Number(noOfServings),
      servingSize,
      mealType,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    });

    setFoodName("");
    setNoOfServings("");
    setServingSize("");
    setMealType("BREAKFAST");
  };

  return (
    <form className="diet-form" onSubmit={(e) => e.preventDefault()}>
      <p className="title">Diet Diary</p>
      <p className="message">Track your meals and nutrition intake.</p>

      <label>
        <input
          required
          placeholder=""
          type="text"
          className="input"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <span>Food Name</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="number"
          className="input"
          value={noOfServings}
          onChange={(e) => setNoOfServings(e.target.value)}
        />
        <span>No. of Servings</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="text"
          className="input"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
        />
        <span>Serving Size</span>
      </label>

      <label className="select-wrapper">
        <select
          className="input"
          value={mealType}
          onChange={(e) => setMealType(e.target.value as MealType)}
        >
          <option value="BREAKFAST">Breakfast</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
          <option value="SNACKS">Snacks</option>
        </select>
        <span>Mealtype</span>
      </label>

      <button
        className="submit"
        onClick={handleSubmit}
        disabled={!foodName || !noOfServings || !servingSize}
      >
        Add
      </button>
    </form>
  );
}
