import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const CurrencyExchangeCard: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [symbols, setSymbols] = useState<{
    [key: string]: { description: string };
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<"from" | "to">("from");
  const [isExpanded, setIsExpanded] = useState(true);

  const commonCurrencies = ["USD", "EUR", "MXN", "GBP", "JPY", "CAD", "BRL", "AUD", "CHF"];

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        // Use a more comprehensive fallback data directly
        setSymbols({
          USD: { description: "United States Dollar" },
          EUR: { description: "Euro" },
          MXN: { description: "Mexican Peso" },
          GBP: { description: "British Pound Sterling" },
          JPY: { description: "Japanese Yen" },
          CAD: { description: "Canadian Dollar" },
          BRL: { description: "Brazilian Real" },
          AUD: { description: "Australian Dollar" },
          CHF: { description: "Swiss Franc" },
          CNY: { description: "Chinese Yuan" },
          INR: { description: "Indian Rupee" },
          KRW: { description: "South Korean Won" },
          SGD: { description: "Singapore Dollar" },
          HKD: { description: "Hong Kong Dollar" },
          NOK: { description: "Norwegian Krone" },
          SEK: { description: "Swedish Krona" },
          DKK: { description: "Danish Krone" },
          PLN: { description: "Polish Zloty" },
          CZK: { description: "Czech Koruna" },
          HUF: { description: "Hungarian Forint" },
        });
      } catch (error) {
        console.error("Error setting up currency symbols:", error);
        // Even simpler fallback
        setSymbols({
          USD: { description: "United States Dollar" },
          EUR: { description: "Euro" },
          MXN: { description: "Mexican Peso" },
          GBP: { description: "British Pound Sterling" },
          JPY: { description: "Japanese Yen" },
          CAD: { description: "Canadian Dollar" },
          BRL: { description: "Brazilian Real" },
        });
      }
    };
    fetchSymbols();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      try {
        // Primary API: fxratesapi.com (working and free)
        const res = await fetch(
          `https://api.fxratesapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=1`,
        );
        const data = await res.json();
        
        if (data && data.success && typeof data.result === "number") {
          setExchangeRate(data.result);
        } else {
          console.error("Primary API failed, trying backup...");
          // Backup API: exchangerate-api.com (free tier)
          try {
            const backupRes = await fetch(
              `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
            );
            const backupData = await backupRes.json();
            
            if (backupData && backupData.rates && backupData.rates[toCurrency]) {
              setExchangeRate(backupData.rates[toCurrency]);
            } else {
              console.error("Backup API also failed");
              setExchangeRate(null);
            }
          } catch (backupError) {
            console.error("Backup API error:", backupError);
            setExchangeRate(null);
          }
        }

        const date = new Date();
        setLastUpdated(
          date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) +
            ", " +
            date.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            " UTC",
        );
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      if (lastEditedField === "from") {
        setConvertedAmount(amount * exchangeRate);
      } else {
        setAmount(convertedAmount / exchangeRate);
      }
    }
  }, [exchangeRate, amount, convertedAmount, lastEditedField]);

  const handleFromAmountChange = (value: number) => {
    setAmount(value);
    setLastEditedField("from");
    if (exchangeRate) {
      setConvertedAmount(value * exchangeRate);
    }
  };

  const handleToAmountChange = (value: number) => {
    setConvertedAmount(value);
    setLastEditedField("to");
    if (exchangeRate) {
      setAmount(value / exchangeRate);
    }
  };

  const getSortedSymbols = () => {
    if (!symbols || Object.keys(symbols).length === 0) {
      return [];
    }

    try {
      const entries = Object.entries(symbols).filter(
        ([code, data]) =>
          code && data && typeof data === "object" && data.description,
      );
      const common = entries.filter(([code]) =>
        commonCurrencies.includes(code),
      );
      const others = entries
        .filter(([code]) => !commonCurrencies.includes(code))
        .sort((a, b) => a[0].localeCompare(b[0]));
      return [...common, ...others];
    } catch (error) {
      console.error("Error processing symbols:", error);
      return [];
    }
  };

  return (
    <div className={`w-full bg-light-primary rounded-2xl shadow-lg p-4 relative flex flex-col transition-all duration-300 ${isExpanded ? 'h-[410px]' : 'h-auto'}`}>
      <div 
        className={`flex items-start justify-between cursor-pointer pr-12 ${isExpanded ? 'mb-4' : 'mb-1'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          {isExpanded ? (
            <>
              <div className="text-gray-600 text-sm mb-1">
                1 {fromCurrency} equivale a
              </div>
              <div className="text-[1.35rem] font-semibold text-black mb-2">
                {isLoading
                  ? "..."
                  : exchangeRate
                    ? exchangeRate.toFixed(2)
                    : "Error"}{" "}
                {symbols[toCurrency]?.description || toCurrency}
              </div>
              <div className="text-gray-400 text-sm mb-4">{lastUpdated}</div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-700">
              Cambio de divisas 
            </div>
          )}
        </div>
        <button
          aria-label={
            isExpanded ? "Colapsar convertidor" : "Expandir convertidor"
          }
          className="absolute top-4 right-4 p-2 hover:bg-light-secondary-100 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-5 flex-1 overflow-hidden flex flex-col">
          {/* Primera fila: Input EUR */}
          <div className="flex flex-col flex-shrink-0">
            <label className="text-xs text-gray-500 mb-2">EUR</label>
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded-md p-3 text-sm w-1/2 focus:outline-none focus:border-green-500"
                min="0"
                onChange={(e) => handleFromAmountChange(Number(e.target.value))}
                placeholder="1"
                step="0.01"
                type="number"
                value={Math.round(amount * 100) / 100}
              />
              <select
                className="border border-gray-300 rounded-md p-3 text-sm w-1/2 focus:outline-none focus:border-green-500"
                onChange={(e) => setFromCurrency(e.target.value)}
                value={fromCurrency}
              >
                {getSortedSymbols().length > 0
                  ? getSortedSymbols().map(([code, data]) => (
                      <option key={code} value={code}>
                        {code} - {data?.description?.split(' ').slice(0, 2).join(' ') || code}
                      </option>
                    ))
                  : commonCurrencies.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
              </select>
            </div>
          </div>

          {/* Segunda fila: Input USD */}
          <div className="flex flex-col flex-shrink-0">
            <label className="text-xs text-gray-500 mb-2">USD</label>
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded-md p-3 text-sm w-1/2 focus:outline-none focus:border-green-500"
                min="0"
                onChange={(e) => handleToAmountChange(Number(e.target.value))}
                placeholder="1,14"
                step="0.01"
                type="number"
                value={Math.round(convertedAmount * 100) / 100}
              />
              <select
                className="border border-gray-300 rounded-md p-3 text-sm w-1/2 focus:outline-none focus:border-green-500"
                onChange={(e) => setToCurrency(e.target.value)}
                value={toCurrency}
              >
                {getSortedSymbols().length > 0
                  ? getSortedSymbols().map(([code, data]) => (
                      <option key={code} value={code}>
                        {code} - {data?.description?.split(' ').slice(0, 2).join(' ') || code}
                      </option>
                    ))
                  : commonCurrencies.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyExchangeCard;

// w-1/2 border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-light-primary
