import OpenAI from "openai";
import {
  getRefineSystemPromptUA,
  getTripSystemPromptUA,
  getRefineSystemPromptEN,
  getTripSystemPromptEN,
  userContent,
} from "../prompts/prompts.js";

// Ініціалізуємо клієнта OpenAI
const openai = new OpenAI();

export const generateTripPlan = async (tripData) => {
  const {
    destination,
    startDate,
    endDate,
    budget,
    travelers,
    currency,
    interests,
    lng,
  } = tripData;

  // Чіткий промпт для ШІ
  const systemPrompt =
    lng === "en" ? getTripSystemPromptEN : getTripSystemPromptUA;

  // Передаємо параметри
  const userPrompt =
    lng === "en"
      ? `Plan a trip to the city/country: ${destination}.
    Travel dates: from ${startDate} to ${endDate}.
    Number of people: ${travelers}.
    Currency: ${currency}.
    Total budget: ${budget}.
    User interests: ${interests}.`
      : `Сплануй подорож до міста/країни: ${destination}.
    Дати подорожі: з ${startDate} по ${endDate}.
    Кількість осіб: ${travelers}.
    Валюта: ${currency}.
    Загальний бюджет: ${budget}.
    Інтереси користувача: ${interests}.`;

  try {
    // Робимо запит
    const response = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      response_format: { type: "json_object" }, // Змушуємо повертати відповідь лише в json форматі
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7, // Оптимальний баланс між точністю розрахунків та цікавим маршрутом
    });

    const tripJson = JSON.parse(response.choices[0].message.content);

    return {
      ...tripJson,
      lng: lng || "uk",
    };
  } catch (error) {
    console.error("Помилка під час звернення до OpenAI API:", error);
    throw new Error("Не вдалося згенерувати план подорожі");
  }
};

// Функція для коригування вже існуючого плану подорожі
export const refineTripPlan = async (currentPlan, feedback) => {
  const isEnglish = currentPlan.lng === "en";
  const systemPrompt = isEnglish
    ? getRefineSystemPromptEN
    : getRefineSystemPromptUA;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent(currentPlan, feedback) },
      ],
      // Знижуємо температуру для сухих структурних змін (порахувати, видалити з масиву)
      temperature: 0.3,
    });

    const parsedData = JSON.parse(response.choices[0].message.content);

    const finalResult = {
      ...parsedData,
      id: currentPlan.id || null,
      lng: currentPlan.lng || "uk",
    };

    return finalResult;
  } catch (error) {
    console.error("Помилка під час коригування в OpenAI API:", error);
    throw new Error("Не вдалося відкоригувати план подорожі");
  }
};
