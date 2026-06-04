import { TrashIcon } from "@phosphor-icons/react";
import { StorageService } from "../services/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

function History() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectTrip = (item) => {
    navigate("/", { state: { selectedTrip: item } });
  };

  const [tripHistory, setTripHistory] = useState(() => {
    return StorageService.getHistory() || [];
  });

  const handleDelete = (id) => {
    StorageService.deleteTrip(id);
    setTripHistory((prev) => prev.filter((trip) => trip.id !== id));
    toast.success(t("removingFromHistory"));
  };

  return (
    <div className="container mx-auto pb-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("historyTitle")}
      </h2>

      {tripHistory.length === 0 ? (
        <p className="text-center text-gray-500">{t("noTrips")}</p>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          {[...tripHistory]
            .sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);

              return dateA - dateB;
            })
            .map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectTrip(item)}
                className="px-4 py-3 border rounded-lg bg-white border-gray-200 shadow-sm w-1/4 flex justify-between items-center cursor-pointer hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.city}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.date} • {t("travelers", { count: item.people })}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <TrashIcon size={20} />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default History;
