import { trackingAPI } from "../../../../../shared/api/axios";

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

export const addDietEntry = (data: DietRequest) => {
  return trackingAPI.post("/tracking/diet", data);
};

export const getDietEntries = () => {
  return trackingAPI.get("/tracking/diet");
};