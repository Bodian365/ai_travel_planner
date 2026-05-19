function CurrencyConversions({ totalBudget }) {
  return (
    <div className="bg-white px-5 py-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-1 pb-6 mb-4 border-b-2 border-gray-200">
        <span>💵</span> Currency Conversions
      </h3>
      <div className="grid grid-cols-7 text-lg gap-y-4 items-center">
        {Object.entries(totalBudget).map(([currency, value]) => (
          <div key={currency} className="contents">
            <p className="col-span-4 border-b-2 border-gray-200 pb-3 text-slate-600">
              {currency == "localCurrency" ? "Local Currency" : currency}
            </p>
            <p className="col-span-3 text-right border-b-2 border-gray-200 pb-3 font-semibold text-slate-800 tabular-nums">
              = {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrencyConversions;
