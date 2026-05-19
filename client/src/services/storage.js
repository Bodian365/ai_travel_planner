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

      const existingTripId = tripData.id || tripData.fullData?.id;

      const existingIndex = existingTripId
        ? history.findIndex((trip) => trip.id === existingTripId)
        : -1;

      if (existingIndex !== -1) {
        history[existingIndex] = {
          ...history[existingIndex],
          city: tripData.destination || history[existingIndex].city,

          date: tripData.dates || history[existingIndex].date,
          fullData: tripData,
        };

        console.log("Подорож успішно ОНОВЛЕНО в історії сховища!");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return history[existingIndex];
      } else {
        const newTrip = {
          id: crypto.randomUUID(),
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
};
