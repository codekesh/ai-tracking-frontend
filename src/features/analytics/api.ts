import { analyticsAPI } from "../../shared/api/axios";

export const getAnalyticsData = () => {
  return analyticsAPI.get("/analytics/diet/daily");
};
