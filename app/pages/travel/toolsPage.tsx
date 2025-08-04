import CurrencyExchangeCard from "~/components/cards/CurrencyExchangeCard";
import PackListCard from "~/components/cards/PackListCard";
import TranslateCard from "~/components/cards/TranslateCard";
import FindWeatherCard from "~/components/cards/FindWeatherCard";

export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "resume", content: "Nombre viaje" },
  ];
}

export default function ToolPage() {
  return (
    <div className="min-h-screen py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            🛠️ Herramientas de Viaje
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-start">
          <CurrencyExchangeCard key="currency-exchange" />
          <FindWeatherCard key="weather" />
          <TranslateCard key="translate" />
          <PackListCard key="pack-list" />
        </div>
      </div>
    </div>
  );
}
