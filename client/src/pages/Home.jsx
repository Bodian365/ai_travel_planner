import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import TripPlan from "../components/TripPlan";
import { ApiService } from "../services/api";
import { StorageService } from "../services/storage";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [tripResult, setTripResult] = useState(() => {
    const selectedTrip = location.state?.selectedTrip;
    if (selectedTrip) {
      StorageService.setActiveTrip(selectedTrip);
      return selectedTrip;
    }
    return StorageService.getActiveTrip();
  });

  useEffect(() => {
    if (location.state?.selectedTrip) {
      navigate("/", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleFormSubmit = async (formData) => {
    StorageService.clearActiveTrip();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        lng: i18n.language,
      };
      console.log(i18n.language);

      console.log("передаємо дані з мовою", payload);
      const result = await ApiService.generateTrip(payload);
      const savedTrip = StorageService.saveTrip(result);
      StorageService.setActiveTrip(savedTrip);
      setTripResult(savedTrip);
      console.log("first data:", result);
    } catch (error) {
      console.error("Помилка генерації подорожі:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouteRefine = async (feedbackText) => {
    setIsLoading(true);
    try {
      const payload = {
        ...tripResult.fullData,
        id: tripResult.id,
        lng: i18n.language,
      };

      const updatedTrip = await ApiService.updateTripRoute(
        payload,
        feedbackText,
      );

      const savedTrip = StorageService.saveTrip(updatedTrip);
      StorageService.setActiveTrip(savedTrip);
      setTripResult(savedTrip);
    } catch (error) {
      console.error("Помилка при оновленні маршруту:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto w-6xl grid grid-cols-7 gap-6 no-scrollbar p-6">
      {/* ЛІВА ЧАСТИНА:*/}
      <div className="col-span-3">
        {isLoading ? (
          <Loader />
        ) : tripResult ? (
          <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm space-y-3 sticky top-6 ">
            <p className="text-sm font-medium text-gray-500">
              {t("viewing")}:{" "}
              <span className="text-gray-800 font-bold">{tripResult.city}</span>
            </p>
            <button
              onClick={() => {
                StorageService.clearActiveTrip();
                setTripResult(null);
              }}
              className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← {t("createButton")}
            </button>
          </div>
        ) : (
          <TripForm onSubmit={handleFormSubmit} />
        )}
      </div>

      {/* ПРАВА ЧАСТИНА: */}
      <div className="col-span-4">
        {tripResult && (
          <div
            className={
              isLoading
                ? "opacity-50 pointer-events-none transition-opacity"
                : "transition-opacity"
            }
          >
            <TripPlan
              tripData={tripResult.fullData ? tripResult.fullData : tripResult}
              onRouteUpdate={handleRouteRefine}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
