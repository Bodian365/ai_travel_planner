import { useTranslation } from "react-i18next";

function Loader() {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-4 min-h-75 sticky top-6">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-gray-500 font-medium text-sm animate-pulse text-center">
        {t("loaderMessage")}
      </p>
    </div>
  );
}

export default Loader;
