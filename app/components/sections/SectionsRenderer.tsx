import { useSections } from "~/contexts/SectionsContext";
import { useBudget } from "~/hooks/useBudget";
import WidgetBudget from "../budget/WidgetBudget";
import CurrencyArticle from "../mainPage/CurrencyArticle";
import FlightArticle from "../mainPage/FlightsArticle";
import HotelArticleTest from "../mainPage/HotelArticle";
import NotesArticle from "../mainPage/NotesArticle";
import TranslateArticle from "../mainPage/TranslateArticle";
import WeatherArticle from "../mainPage/WeatherArticle";

export default function SectionsRenderer() {
  const { sections, removeSection } = useSections();
  const { total } = useBudget();

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
          {section.type === "budget" && (
            <WidgetBudget
              currency="€"
              title="PRESUPUESTO TOTAL"
              total={total}
              showRemoveOption={true}
              onRemove={() => removeSection(section.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
