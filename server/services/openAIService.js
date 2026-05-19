import OpenAI from "openai";
import {
  getRefineSystemPrompt,
  getTripSystemPrompt,
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
  } = tripData;

  // Чіткий промпт для ШІ
  const systemPrompt = getTripSystemPrompt;

  // Передаємо параметри
  const userPrompt = `Сплануй подорож до міста/країни: ${destination}.
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

    // Отримуємо відповідь, перетворюємо його на звичайний JavaScript та повертаємо
    const tripJson = JSON.parse(response.choices[0].message.content);
    return tripJson;
  } catch (error) {
    console.error("Помилка під час звернення до OpenAI API:", error);
    // Прокидаємо помилку далі до контролера
    throw new Error("Не вдалося згенерувати план подорожі");
  }
};

// Функція для коригування вже існуючого плану подорожі
export const refineTripPlan = async (currentPlan, feedback) => {
  const systemPrompt = getRefineSystemPrompt;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5.4-mini",

      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent(currentPlan, feedback) },
      ],
      // Знижуємо температуру. Для сухих структурних змін (порахувати, видалити з масиву)
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Помилка під час коригування в OpenAI API:", error);
    throw new Error("Не вдалося відкоригувати план подорожі");
  }
};
