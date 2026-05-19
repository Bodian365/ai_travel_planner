import Budget from "./Budget";
import Notice from "./Notice";
import RouteTimeLine from "./RouteTimeLine";

function TripPlan({ tripData, onRouteUpdate }) {
  const isOpen = !tripData.budgetStatus.isSufficient;
  return (
    <div className="col-span-4 grid grid-cols-2 gap-y-4">
      {isOpen ? (
        <Notice
          city={tripData.destination}
          message={tripData.budgetStatus.warningMessage}
        />
      ) : (
        ""
      )}
      <Budget
        budgetDetails={tripData.budgetDetails}
        totalBudget={tripData.totalBudget}
      />
      <RouteTimeLine
        itinerary={tripData.itinerary}
        onRouteUpdate={onRouteUpdate}
      />
    </div>
  );
}

export default TripPlan;
