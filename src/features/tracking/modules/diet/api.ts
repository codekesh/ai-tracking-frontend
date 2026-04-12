import { trackingAPI } from "../../../../shared/api/axios";
import type { DietRequest } from "../../types";

export const addDietEntry = (data: DietRequest) => {
  return trackingAPI.post("/tracking/diet", data);
};

export const getDietEntries = () => {
  return trackingAPI.get("/tracking/diet");
};

export const searchFoods = (query: string) => {
  return trackingAPI.get(`/foods?search=${query}`);
};