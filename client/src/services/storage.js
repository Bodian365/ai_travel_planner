const STORAGE_KEY = "trip_planner_history";

export const StorageService = {
  // Отримати всі збережені поїздки
  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Помилка зчитування з localStorage:", error);
      return [];
    }
  },

  // Зберегти нову поїздку в історію
  saveTrip(tripData) {
    try {
      const history = this.getHistory();

      // 1. Оскільки ID тепер завжди є на першому рівні, шукаємо його прямо
      const existingTripId = tripData.id;

      const existingIndex = existingTripId
        ? history.findIndex((trip) => trip.id === existingTripId)
        : -1;

      if (existingIndex !== -1) {
        // 🔄 РЕЖИМ ОНОВЛЕННЯ
        history[existingIndex] = {
          ...history[existingIndex], // Зберігаємо createdAt
          city: tripData.destination || history[existingIndex].city,
          date: tripData.dates || history[existingIndex].date,
          fullData: tripData, // Чистий JSON від ШІ (включаючи приклеєний ID)
        };

        console.log("Подорож успішно ОНОВЛЕНО в історії сховища!");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return history[existingIndex];
      } else {
        // 🆕 РЕЖИМ СТВОРЕННЯ (Викликається тільки перший раз із форми)
        const newTrip = {
          id: tripData.id || crypto.randomUUID(), // Якщо бек раптом згенерував ID на першому кроці — беремо його, інакше робимо UUID
          city: tripData.destination,
          date: tripData.dates || tripData.dateRange || "June 2026",
          people: Number(tripData.travelers) || 1,
          createdAt: new Date().toISOString(),
          fullData: tripData,
        };

        history.unshift(newTrip);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        console.log("Створено НОВИЙ запис подорожі в історії!");
        return newTrip;
      }
    } catch (error) {
      console.error("Помилка запису в localStorage:", error);
      return null;
    }
  },

  deleteTrip(id) {
    try {
      const history = this.getHistory();

      const updatedHistory = history.filter((trip) => trip.id !== id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

      console.log(`Подорож з ID ${id} успішно видалено зі сховища!`);
      return true;
    } catch (error) {
      console.error("Помилка видалення з localStorage:", error);
      return false;
    }
  },

  setActiveTrip(tripData) {
    try {
      localStorage.setItem("active_trip_plan", JSON.stringify(tripData));
    } catch (error) {
      console.error("Помилка збереження активного плану:", error);
    }
  },

  getActiveTrip() {
    try {
      const data = localStorage.getItem("active_trip_plan");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Помилка зчитування активного плану:", error);
      return null;
    }
  },

  clearActiveTrip() {
    localStorage.removeItem("active_trip_plan");
  },
};
