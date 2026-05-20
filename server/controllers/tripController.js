import { generateTripPlan, refineTripPlan } from "../services/openaiService.js";

// 1. Перша генерація
export const generateTrip = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      budget,
      currency,
      travelers,
      interests,
      lng,
    } = req.body;

    if (!destination || !startDate || !endDate || !currency) {
      return res
        .status(400)
        .json({ error: "Будь ласка, заповніть обов'язкові поля" });
    }

    const tripData = {
      destination,
      startDate,
      endDate,
      budget,
      currency,
      travelers,
      interests,
      lng,
    };
    const generatedPlan = await generateTripPlan(tripData);

    return res.status(200).json(generatedPlan);
  } catch (error) {
    console.error("Помилка в generateTrip:", error);
    return res
      .status(500)
      .json({ error: "Внутрішня помилка сервера при генерації плану" });
  }
};

// 2. Коригування маршруту
export const refineTrip = async (req, res) => {
  try {
    const { currentPlan, feedback } = req.body;

    // Валідація
    if (!currentPlan || !feedback) {
      return res
        .status(400)
        .json({ error: "Для коригування потрібен поточний план та опис змін" });
    }

    const updatedPlan = await refineTripPlan(currentPlan, feedback);
    return res.status(200).json(updatedPlan);
  } catch (error) {
    console.error("Помилка в refineTrip:", error);
    return res
      .status(500)
      .json({ error: "Внутрішня помилка сервера при редагуванні плану" });
  }
};
