import { useState } from "react";
import { useTranslation } from "react-i18next";

function TripForm({ onSubmit }) {
  const { t } = useTranslation();
  const predefinedInterests = [
    t("museums"),
    t("gastronomy"),
    t("nature"),
    t("architecture"),
  ];

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
    e.preventDefault();

    if (!destination.trim()) {
      alert("Please enter a destination!");
      return;
    }

    const formData = {
      destination: destination.trim(),
      startDate,
      endDate,
      travelers: Number(travelers),
      budget: Number(budget),
      currency,
      interests: selectedInterests,
    };

    onSubmit(formData);
  };

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="col-span-3 px-7 py-5 rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        {t("headerForm")}
      </h2>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        {/* Destination */}
        <label className="flex flex-col gap-1">
          <span className="font-medium text-slate-700">
            {t("destinationTitle")}
          </span>
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
            <span className="font-medium text-slate-700">{t("startDate")}</span>
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
            <span className="font-medium text-slate-700">{t("endDate")}</span>
            <input
              className="border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="date"
              min={startDate || today}
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
              {t("numTravelers")}
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
            <span className="font-medium text-slate-700">
              {t("totalBudget")}
            </span>
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

        <div className="flex flex-col gap-2 mt-2">
          <span className="font-medium text-slate-700">{t("interests")}</span>

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
            placeholder={t("ownInterests")}
            className="mt-2 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-[#3730A3] hover:bg-indigo-800 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          ✨ {t("generateRoute")}
        </button>
      </form>
    </div>
  );
}

export default TripForm;
