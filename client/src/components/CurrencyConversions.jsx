import { useTranslation } from "react-i18next";

function CurrencyConversions({ totalBudget }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white px-5 py-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-1 pb-6 mb-4 border-b-2 border-gray-200">
        <span>💵</span> {t("curConversions")}
      </h3>
      <div className="flex flex-col gap-4 text-lg">
        {Object.entries(totalBudget).map(([currency, value]) => (
          <div
            key={currency}
            className="flex justify-between items-center border-b border-gray-200 pb-3"
          >
            <p className="text-slate-600">
              {currency === "localCurrency"
                ? t("localCurrency")
                : currency.toUpperCase()}
            </p>

            <p className="font-semibold text-slate-800 tabular-nums text-right">
              = {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrencyConversions;
