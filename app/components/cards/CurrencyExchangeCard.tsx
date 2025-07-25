import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const CurrencyExchangeCard: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [symbols, setSymbols] = useState<{ [key: string]: { description: string } }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<'from' | 'to'>('from');
  const [isExpanded, setIsExpanded] = useState(true);

  const commonCurrencies = ["USD", "EUR", "MXN", "GBP", "JPY", "CAD", "BRL"];

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await fetch("https://api.exchangerate.host/symbols");
        const data = await res.json();
        console.log("API Response:", JSON.stringify(data, null, 2)); // Better debug log
        console.log("Has symbols property:", data.hasOwnProperty('symbols'));
        console.log("Symbols value:", data.symbols);
        
        if (data && data.symbols) {
          setSymbols(data.symbols);
        } else {
          console.error("Invalid API response structure. Using fallback data.");
          // Fallback con monedas básicas
          setSymbols({
            USD: { description: "United States Dollar" },
            EUR: { description: "Euro" },
            MXN: { description: "Mexican Peso" },
            GBP: { description: "British Pound Sterling" },
            JPY: { description: "Japanese Yen" },
            CAD: { description: "Canadian Dollar" },
            BRL: { description: "Brazilian Real" }
          });
        }
      } catch (error) {
        console.error("Error fetching symbols:", error);
        // Fallback con monedas básicas
        setSymbols({
          USD: { description: "United States Dollar" },
          EUR: { description: "Euro" },
          MXN: { description: "Mexican Peso" },
          GBP: { description: "British Pound Sterling" },
          JPY: { description: "Japanese Yen" },
          CAD: { description: "Canadian Dollar" },
          BRL: { description: "Brazilian Real" }
        });
      }
    };
    fetchSymbols();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`);
        const data = await res.json();
        console.log("Exchange Rate API Response:", JSON.stringify(data, null, 2)); // Better debug log
        console.log("Has result property:", data.hasOwnProperty('result'));
        console.log("Result value:", data.result);
        console.log("Has info property:", data.hasOwnProperty('info'));
        
        if (data && typeof data.result === 'number') {
          setExchangeRate(data.result);
        } else if (data && data.info && typeof data.info.rate === 'number') {
         
          setExchangeRate(data.info.rate);
        } else if (data && data.rates && data.rates[toCurrency]) {
          // Otra estructura posible
          setExchangeRate(data.rates[toCurrency]);
        } else {
          console.error("Invalid exchange rate response. Using fallback API...");
          // Intentar con otra API como fallback
          try {
            const fallbackRes = await fetch(`https://api.fxratesapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=1`);
            const fallbackData = await fallbackRes.json();
            console.log("Fallback API Response:", JSON.stringify(fallbackData, null, 2));
            
            if (fallbackData && fallbackData.result) {
              setExchangeRate(fallbackData.result);
            } else {
              setExchangeRate(null);
            }
          } catch (fallbackError) {
            console.error("Fallback API also failed:", fallbackError);
            setExchangeRate(null);
          }
        }
        
        const date = new Date();
        setLastUpdated(
          date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) +
            ", " +
            date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) +
            " UTC"
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
      if (lastEditedField === 'from') {
        setConvertedAmount(amount * exchangeRate);
      } else {
        setAmount(convertedAmount / exchangeRate);
      }
    }
  }, [exchangeRate, amount, convertedAmount, lastEditedField]);

  const handleFromAmountChange = (value: number) => {
    setAmount(value);
    setLastEditedField('from');
    if (exchangeRate) {
      setConvertedAmount(value * exchangeRate);
    }
  };

  const handleToAmountChange = (value: number) => {
    setConvertedAmount(value);
    setLastEditedField('to');
    if (exchangeRate) {
      setAmount(value / exchangeRate);
    }
  };

  const getSortedSymbols = () => {
    if (!symbols || Object.keys(symbols).length === 0) {
      return [];
    }
    
    try {
      const entries = Object.entries(symbols).filter(([code, data]) => 
        code && data && typeof data === 'object' && data.description
      );
      const common = entries.filter(([code]) => commonCurrencies.includes(code));
      const others = entries.filter(([code]) => !commonCurrencies.includes(code)).sort((a, b) => a[0].localeCompare(b[0]));
      return [...common, ...others];
    } catch (error) {
      console.error("Error processing symbols:", error);
      return [];
    }
  };

  return (
    <div className="w-full max-w-sm mt-8 bg-white rounded-2xl shadow-lg p-4 relative">
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1 pr-12">
          {isExpanded ? (
            <>
              <div className="text-gray-600 text-sm">1 {fromCurrency} equivale a</div>
              <div className="text-[1.35rem] font-semibold text-black">
                {isLoading ? "..." : exchangeRate ? exchangeRate.toFixed(2) : "Error"} {symbols[toCurrency]?.description || toCurrency}
              </div>
              <div className="text-gray-400 text-sm mb-3">{lastUpdated}</div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-700">Currency Exchange</div>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isExpanded ? "Colapsar convertidor" : "Expandir convertidor"}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col w-1/2">
              <label className="text-xs text-gray-500 mb-1">{fromCurrency}</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={Math.round(amount * 100) / 100}
                onChange={(e) => handleFromAmountChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-2 text-xs w-full"
                placeholder="Cantidad"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-xs text-gray-500 mb-1">{toCurrency}</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={Math.round(convertedAmount * 100) / 100}
                onChange={(e) => handleToAmountChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-2 text-xs w-full"
                placeholder="Conversión"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-xs w-full"
            >
              {getSortedSymbols().length > 0 ? getSortedSymbols().map(([code, data]) => (
                <option key={code} value={code}>
                  {code} - {data?.description || code}
                </option>
              )) : commonCurrencies.map(code => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-xs w-full"
            >
              {getSortedSymbols().length > 0 ? getSortedSymbols().map(([code, data]) => (
                <option key={code} value={code}>
                  {code} - {data?.description || code}
                </option>
              )) : commonCurrencies.map(code => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyExchangeCard;



// w-1/2 border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white