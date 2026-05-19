import { useState } from "react";
import {
  ArrowsCounterClockwiseIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";

function RouteTimeLine({ itinerary, onRouteUpdate }) {
  return (
    <div className="col-span-2 w-full h-96 mx-auto border-2 border-gray-200 rounded-2xl relative bg-slate-50">
      <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar p-4 pb-20">
        <div className="flex flex-col">
          {itinerary.map((dayObj, index) => (
            <TimelineDay
              key={dayObj.day}
              dayNumber={dayObj.day}
              activities={dayObj.activities}
              isLast={index === itinerary.length - 1}
            />
          ))}
        </div>
        <RouteChatInput onRouteUpdate={onRouteUpdate} />
      </div>
    </div>
  );
}

export default RouteTimeLine;

function TimelineDay({ dayNumber, activities = [], isLast = false }) {
  return (
    <div className="relative flex gap-6 pb-6 last:pb-0">
      <div className="flex flex-col items-center w-6 shrink-0">
        <div className="w-5 h-5 rounded-full border-4 border-indigo-600 bg-white z-10 shadow-xs" />

        {!isLast && (
          <div className="absolute top-5 left-2.75 w-0.5 h-full bg-indigo-600/30 z-10" />
        )}
      </div>

      <div className="grow bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative before:content-[''] before:absolute before:top-4 before:-left-2 before:w-4 before:h-4 before:bg-white before:border-l before:border-b before:border-slate-100 before:rotate-45">
        <h4 className="font-bold text-lg text-slate-800 mb-3">
          Day {dayNumber}
        </h4>

        <ul className="flex flex-col gap-2 pl-2">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-slate-600 font-medium"
            >
              <span className="text-xs text-indigo-500">•</span>
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RouteChatInput({ onRouteUpdate }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    console.log("Користувач хоче змінити:", prompt);
    onRouteUpdate(prompt);
    setPrompt("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-20"
    >
      <div className="flex gap-3 bg-white border-2 border-indigo-900 rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md">
        <span className="text-slate-400 animate-spin-slow select-none text-xl">
          <ArrowsCounterClockwiseIcon size={24} />
        </span>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Want to change something in the route?"
          className="grow bg-transparent text-slate-700 font-medium placeholder:text-slate-400 text-base focus:outline-none"
        />

        <button
          type="submit"
          className="text-indigo-900 hover:text-indigo-700 transition-transform hover:scale-110 active:scale-95 text-xl cursor-pointer"
        >
          <PaperPlaneTiltIcon size={24} />
        </button>
      </div>
    </form>
  );
}
