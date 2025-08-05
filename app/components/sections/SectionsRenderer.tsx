import { useSections } from "~/contexts/SectionsContext";
import CurrencyArticle from "../mainPage/CurrencyArticle";
import FlightArticle from "../mainPage/FlightsArticle";
import HotelArticleTest from "../mainPage/HotelArticle";
import NotesArticle from "../mainPage/NotesArticle";
import WeatherArticle from "../mainPage/WeatherArticle";
import TranslateArticle from "../mainPage/TranslateArticle";

export default function SectionsRenderer() {
  const { sections } = useSections();

  if (sections.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-y-2">
      {sections.map((section) => (
        <div className="w-full" key={section.id}>
          {section.type === "note" && (
            <NotesArticle alignment="left" defaultOpen={false} />
          )}
          {section.type === "flight" && <FlightArticle />}
          {section.type === "hotel" && <HotelArticleTest />}
          {section.type === "currency" && <CurrencyArticle />}
          {section.type === "weather" && <WeatherArticle />}
          {section.type === "translate" && <TranslateArticle />}
        </div>
      ))}
    </div>
  );
}
