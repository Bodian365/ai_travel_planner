import uaFlag from "../assets/ua-flag.png";
import enFlag from "../assets/en-flag.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // 🎯 Змінюємо мову в i18next на льоту
    localStorage.setItem("lng", lng); // 💾 Зберігаємо в кеш, щоб при F5 мова лишалася
  };
  return (
    <header className="flex items-center bg-white mx-auto mb-10 py-5  px-40 shadow-sm">
      <h1 className="mr-auto text-2xl text-(--header-color) font-bold">
        AI Travel Planner🚀
      </h1>
      <nav className="flex items-center gap-6">
        <ul className="flex gap-3 ">
          <NavLink linkTo={"/"}>🗺️ {t("homeButton")}</NavLink>
          <NavLink linkTo={"/history"}>📜 {t("historyButton")}</NavLink>
        </ul>
        <ul className="flex gap-2">
          <LangButton lang={"uk"} changeLanguage={changeLanguage}>
            <img src={uaFlag} alt="Українська" className="h-5" />
            <span>UA</span>
          </LangButton>
          <span className="text-lg">/</span>
          <LangButton lang={"en"} changeLanguage={changeLanguage}>
            <img src={enFlag} alt="English" className="h-5" />
            <span>EN</span>
          </LangButton>
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ children, linkTo }) {
  return (
    <li>
      <Link
        to={linkTo}
        className="border-2  border-(--header-color) transition-colors rounded-xl px-3 py-2 font-medium hover:bg-(--light-header-color) cursor-pointer "
      >
        {children}
      </Link>
    </li>
  );
}

function LangButton({ children, lang, changeLanguage }) {
  return (
    <li>
      <button
        onClick={() => changeLanguage(lang)}
        className="text-lg flex items-center gap-1 cursor-pointer hover:underline"
      >
        {children}
      </button>
    </li>
  );
}

export default Header;
