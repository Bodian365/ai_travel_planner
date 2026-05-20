const API_BASE_URL = "http://localhost:3001/api";

export const ApiService = {
  // Перша генерація маршруту на основі форми
  async generateTrip(formData) {
    try {
      //formData: { destination, startDate, endDate, travelers, budget, currency, interests: [] }
      const response = await fetch(`${API_BASE_URL}/plan-trip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error during generation");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Api generateTrip error:", error);
      throw error;
    }
  },

  // Перегенерація (редагування через інпут-чат)
  async updateTripRoute(currentRoute, changePrompt) {
    try {
      console.log(currentRoute, changePrompt);
      const response = await fetch(`${API_BASE_URL}/refine-trip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPlan: currentRoute,
          feedback: changePrompt,
        }),
      });

      if (!response.ok) throw new Error("Server error during modification");

      return await response.json();
    } catch (error) {
      console.error("Api updateTripRoute error:", error);
      throw error;
    }
  },
};
