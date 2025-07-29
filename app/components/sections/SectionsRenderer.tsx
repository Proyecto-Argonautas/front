import { useSections } from "~/contexts/SectionsContext";
import CurrencyArticle from "../mainPage/CurrencyArticle";
import FlightArticle from "../mainPage/FlightsArticle";
import HotelArticleTest from "../mainPage/HotelArticle";
import NotesArticle from "../mainPage/NotesArticle";

export default function SectionsRenderer() {
  const { sections } = useSections();

  if (sections.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-1">
      {sections.map((section) => (
        <div className="w-full" key={section.id}>
          {section.type === "note" && (
            <NotesArticle alignment="left" defaultOpen={false} />
          )}
          {section.type === "flight" && <FlightArticle />}
          {section.type === "hotel" && <HotelArticleTest />}
          {section.type === "currency" && <CurrencyArticle />}
        </div>
      ))}
    </div>
  );
}
