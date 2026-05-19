import { TrashIcon } from "@phosphor-icons/react";

function History() {
  const data = [
    {
      city: "Paris",
      date: "June 2026",
      people: 2,
    },
    {
      city: "New York",
      date: "July 2026",
      people: 3,
    },
    {
      city: "Warsaw",
      date: "June 2026",
      people: 1,
    },
    {
      city: "Pula",
      date: "Oct 2026",
      people: 6,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="px-3 py-3 border rounded-lg mx-auto bg-white border-gray-200 shadow-sm w-1/4 flex justify-between items-center "
        >
          <p>
            {item.city} ({item.date}) - {item.people}{" "}
            {item.people == 1 ? "person" : "people"}
          </p>
          <TrashIcon size={20} />
        </div>
      ))}
    </div>
  );
}

export default History;
