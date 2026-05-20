import CurrencyConversions from "./CurrencyConversions";
import EstimatedExpenses from "./EstimatedExpenses";

function Budget({ budgetDetails, totalBudget }) {
  return (
    <div className="col-span-2 grid grid-cols-2 gap-6">
      <EstimatedExpenses budgetDetails={budgetDetails} />
      <CurrencyConversions totalBudget={totalBudget} />
    </div>
  );
}

export default Budget;
