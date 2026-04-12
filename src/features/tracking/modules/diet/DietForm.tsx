import { useState } from "react";
import "./DietForm.css";
import type { DietFormProps, MealType } from "../../types";
import { searchFoods } from "./api";

export default function DietForm({ onAdd }: DietFormProps) {
  const [foodName, setFoodName] = useState("");
  const [numberOfServings, setNumberOfServings] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [mealType, setMealType] = useState<MealType>("BREAKFAST");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any | null>(null);
  const [foodId, setFoodId] = useState<number | null>(null);

  const handleSubmit = () => {
    onAdd({
      foodId,
      foodName,
      numberOfServings: Number(numberOfServings),
      servingSize: Number(servingSize),
      mealType,
      calories: selectedFood ? selectedFood.calories : 0,
      protein: selectedFood ? selectedFood.protein : 0,
      carbs: selectedFood ? selectedFood.carbs : 0,
      fat: selectedFood ? selectedFood.fat : 0,
    });

    setFoodName("");
    setNumberOfServings("");
    setServingSize("");
    setMealType("BREAKFAST");
    setFoodId(null);
    setSelectedFood(null);
    setSuggestions([]);
  };

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await searchFoods(query);
      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  };

  const calculated =
    selectedFood && numberOfServings && servingSize
      ? (() => {
          const baseSize = selectedFood.servingSize; // e.g. 100g
          const inputSize = Number(servingSize);
          const servings = Number(numberOfServings);

          const factor = (inputSize / baseSize) * servings;

          return {
            calories: selectedFood.calories * factor,
            protein: selectedFood.protein * factor,
            carbs: selectedFood.carbs * factor,
            fat: selectedFood.fat * factor,
          };
        })()
      : null;

  return (
    <div>
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
            onChange={(e) => {
              const value = e.target.value;
              setFoodName(value);
              setFoodId(null);
              setSelectedFood(null);
              fetchSuggestions(value);
            }}
          />
          <span>Food Name</span>
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((food) => (
                <div
                  key={food.id}
                  className="suggestion-item"
                  onClick={() => {
                    setFoodName(food.name);
                    setFoodId(food.id);
                    setSelectedFood(food);
                    setSuggestions([]);
                  }}
                >
                  <strong>{food.name}</strong> — {food.calories} kcal /{" "}
                  {food.servingSize}
                  {food.servingUnit}
                </div>
              ))}
            </div>
          )}
        </label>

        <label>
          <input
            required
            placeholder=""
            type="number"
            className="input"
            value={numberOfServings}
            onChange={(e) => setNumberOfServings(e.target.value)}
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
          disabled={!foodName || !numberOfServings || !servingSize}
        >
          Add
        </button>
      </form>
      {selectedFood && (
        <div className="nutrition-preview">
          <h4>Nutrition</h4>

          {calculated ? (
            <>
              <p>
                <strong>Total Calories:</strong>{" "}
                {calculated.calories.toFixed(2)}
              </p>
              <p>Protein: {calculated.protein.toFixed(2)}</p>
              <p>Carbs: {calculated.carbs.toFixed(2)}</p>
              <p>Fat: {calculated.fat.toFixed(2)}</p>
            </>
          ) : (
            <>
              <p>Calories: {selectedFood.calories}</p>
              <p>Protein: {selectedFood.protein}</p>
              <p>Carbs: {selectedFood.carbs}</p>
              <p>Fat: {selectedFood.fat}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
