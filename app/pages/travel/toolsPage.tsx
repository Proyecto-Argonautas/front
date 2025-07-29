import CurrencyExchangeCard from "~/components/cards/CurrencyExchangeCard";
import PackListCard from "~/components/cards/PackListCard";

export default function ToolPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            🛠️ Herramientas de Viaje
          </h1>
          
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
          <CurrencyExchangeCard key="currency-exchange" />
          <PackListCard key="pack-list" />
        </div>
      </div>
    </div>
  );
}
