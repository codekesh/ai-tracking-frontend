import type { MealSectionProps } from "../../types";
import "./MealSection.css";

export default function MealSection({
  title,
  entries,
  isOpen,
  onToggle,
}: MealSectionProps) {
  const totalCalories = entries.reduce((sum, e) => sum + (e.calories || 0), 0);

  return (
    <div className="meal-section">
      <button className="meal-header" onClick={onToggle}>
        <span>{title}</span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>⌄</span>
      </button>

      <div className={`meal-content ${isOpen ? "expanded" : ""}`}>
        <div className="meal-inner">
          <p className="meal-total">
            <strong>Total Calories:</strong> {totalCalories}
          </p>

          {entries.length === 0 ? (
            <p className="empty-text">No items added.</p>
          ) : (
            <table className="meal-table">
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id}>
                    <td>{e.foodName}</td>
                    <td>{e.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
