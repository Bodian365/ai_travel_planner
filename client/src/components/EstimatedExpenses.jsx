import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function EstimatedExpenses({ budgetDetails }) {
  const labels = Object.keys(budgetDetails).map((category) => category);
  const amounts = Object.entries(budgetDetails).map((item) =>
    item[1].slice(0, -3),
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "(USD)",
        data: amounts,
        backgroundColor: "rgba(79, 70, 229, 0.7)",
        borderColor: "rgb(79, 70, 229)",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y",

    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },

    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: {
          padding: 5,
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#475569",
          font: {
            size: 12,
          },
          padding: 5,
        },
      },
    },
  };

  return (
    <div className="bg-white px-5 py-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-1 mb-5">
        <span>📊</span> Estimated Expenses
      </h3>

      <div className="h-full w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default EstimatedExpenses;
