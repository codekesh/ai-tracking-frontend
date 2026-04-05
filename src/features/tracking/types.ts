export interface DietRequest {
  mealType: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DietEntry {
  mealType: string;
  id: number;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
}

export type DietFormProps = {
  onAdd: (data: DietEntryInput) => void;
};

export type DietEntryInput = {
  foodName: string;
  noOfServings: number;
  servingSize: string;
  mealType: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";

export type MealSectionProps = {
  title: string;
  entries: {
    id: number;
    foodName: string;
    calories: number;
    timestamp: string;
  }[];
  isOpen: boolean;
  onToggle: () => void;
};

export interface Tracker {
  id: number;
  domain: string;
}