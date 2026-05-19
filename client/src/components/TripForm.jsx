import { useState } from "react";

function TripForm({ onSubmit }) {
  const predefinedInterests = [
    "Museums",
    "Gastronomy",
    "Nature",
    "Architecture",
  ];

  // 1. Створюємо стейти для всіх полей форми
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [budget, setBudget] = useState("950");
  const [currency, setCurrency] = useState("UAH");

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState("");

  // Функція перемикання інтересу
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Функція для додавання свого варіанту через клавішу Enter
  const handleAddCustomInterest = (e) => {
    if (e.key === "Enter" && customInterest.trim() !== "") {
      e.preventDefault();

      const newTag = customInterest.trim();
      if (!selectedInterests.includes(newTag)) {
        setSelectedInterests([...selectedInterests, newTag]);
      }
      setCustomInterest("");
    }
  };

  // Головна функція відправки форми
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки браузером

    // Валідація: перевіряємо, чи ввів користувач хоча б куди він їде
    if (!destination.trim()) {
      alert("Please enter a destination!");
      return;
    }

    // Пакуємо всі стейти в один чистий об'єкт
    const formData = {
      destination: destination.trim(),
      startDate,
      endDate,
      travelers: Number(travelers),
      budget: Number(budget),
      currency,
      interests: selectedInterests,
    };

    // Відправляємо цей об'єкт у Home.jsx
    onSubmit(formData);
  };

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="col-span-3 px-7 py-5 rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        Start Planning Your Adventure
      </h2>

      {/* Прив'язуємо наш обробник до onSubmit форми */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        {/* Destination */}
        <label className="flex flex-col gap-1">
          <span className="font-medium text-slate-700">Destination</span>
          <input
            className="border border-indigo-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Paris, France"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </label>

        {/* Date */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-medium text-slate-700">Start Date</span>
            <input
              className="border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="date"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-medium text-slate-700">End Date</span>
            <input
              className="border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="date"
              min={startDate || today} // Дата кінця не може бути раніше за дату початку
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Num of Travelers */}
          <label className="flex flex-col gap-1">
            <span className="font-medium text-slate-700">
              Number of travelers
            </span>
            <input
              className="border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="number"
              min="1"
              placeholder="1"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-1">
            {/* Total Budget */}
            <span className="font-medium text-slate-700">Total Budget</span>
            <div className="flex gap-2">
              <input
                className="w-2/3 border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="number"
                min="1"
                placeholder="950"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              {/* Currency */}
              <select
                className="w-1/3 border border-indigo-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Секція інтересів залишається твоєю рідною та робочою */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="font-medium text-slate-700">Interests</span>

          <div className="flex flex-wrap gap-2">
            {[...new Set([...predefinedInterests, ...selectedInterests])].map(
              (interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border cursor-pointer ${
                      isSelected
                        ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                        : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected ? "✓ " : ""}
                    {interest}
                  </button>
                );
              },
            )}
          </div>

          <input
            type="text"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyDown={handleAddCustomInterest}
            placeholder="Type your own interest and press Enter..."
            className="mt-2 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-[#3730A3] hover:bg-indigo-800 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          ✨ Generate Route
        </button>
      </form>
    </div>
  );
}

export default TripForm;
