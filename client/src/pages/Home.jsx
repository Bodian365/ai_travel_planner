import { useState } from "react";
import TripForm from "../components/TripForm";
import TripPlan from "../components/TripPlan";
import { ApiService } from "../services/api";
import { StorageService } from "../services/storage";

function Home() {
  const [tripResult, setTripResult] = useState(null);

  const handleFormSubmit = async (formData) => {
    const result = await ApiService.generateTrip(formData);
    setTripResult(result);

    StorageService.saveTrip(result);
  };

  const handleRouteRefine = async (feedbackText) => {
    const updatedTrip = await ApiService.updateTripRoute(
      tripResult,
      feedbackText,
    );
    console.log(updatedTrip);
    setTripResult(updatedTrip);
    StorageService.saveTrip(updatedTrip);
  };

  return (
    <div className="container mx-auto w-6xl  grid grid-cols-7 gap-6 no-scrollbar">
      <TripForm onSubmit={handleFormSubmit} />
      {tripResult && (
        <TripPlan tripData={tripResult} onRouteUpdate={handleRouteRefine} />
      )}
    </div>
  );
}

export default Home;
