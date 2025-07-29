import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Ellipsis,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CurrencyArticle() {
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Estados para el convertidor de moneda (igual que CurrencyExchangeCard)
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

  const commonCurrencies = ["USD", "EUR", "MXN", "GBP", "JPY", "CAD", "BRL"];

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Obtener símbolos de monedas (igual que CurrencyExchangeCard)
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await fetch("https://api.exchangerate.host/symbols");
        const data = await res.json();

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
            BRL: { description: "Brazilian Real" },
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
          BRL: { description: "Brazilian Real" },
        });
      }
    };
    fetchSymbols();
  }, []);

  // Obtener el tipo de cambio (igual que CurrencyExchangeCard)
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`,
        );
        const data = await res.json();

        if (data && typeof data.result === "number") {
          setExchangeRate(data.result);
        } else if (data && data.info && typeof data.info.rate === "number") {
          setExchangeRate(data.info.rate);
        } else if (data && data.rates && data.rates[toCurrency]) {
          setExchangeRate(data.rates[toCurrency]);
        } else {
          console.error(
            "Invalid exchange rate response. Using fallback API...",
          );
          try {
            const fallbackRes = await fetch(
              `https://api.fxratesapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=1`,
            );
            const fallbackData = await fallbackRes.json();

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

  // Actualizar conversiones automáticamente (igual que CurrencyExchangeCard)
  useEffect(() => {
    if (exchangeRate) {
      if (lastEditedField === "from") {
        setConvertedAmount(amount * exchangeRate);
      } else {
        setAmount(convertedAmount / exchangeRate);
      }
    }
  }, [exchangeRate, amount, convertedAmount, lastEditedField]);

  // Funciones para manejar cambios en los campos (igual que CurrencyExchangeCard)
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

  // Función para obtener símbolos ordenados (igual que CurrencyExchangeCard)
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

  if (!visible) return null; // No renderiza si fue eliminado

  return (
    <article className="relative w-full mt-5 bg-white rounded-2xl shadow-md">
      <button
        aria-controls="article-details"
        aria-expanded={open}
        className="flex items-center justify-between w-full p-4 cursor-pointer bg-transparent border-0 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center gap-2 mr-auto">
          <DollarSign />
          <h2 className="flex gap-2 text-lg font-semibold min-w-10">
            Currency
          </h2>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>

        <div className="relative" ref={optionsRef}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // No colapsa el artículo
              setShowOptions((prev) => !prev);
            }}
            type="button"
          >
            <Ellipsis />
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-20">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => setVisible(false)}
                type="button"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </button>

      {open && (
        <div className="border-t px-4 py-4 space-y-3 text-sm text-gray-700">
          {/* Header con información de conversión */}
          <div className="flex justify-between">
            <div>
              <div className="text-xs text-gray-500">
                1 {fromCurrency} equivale a
              </div>
              <div className="font-semibold text-lg">
                {isLoading
                  ? "..."
                  : exchangeRate
                    ? exchangeRate.toFixed(4)
                    : "Error"}{" "}
                {symbols[toCurrency]?.description || toCurrency}
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-sm mb-3">{lastUpdated}</div>

          {/* Campos de entrada para las cantidades */}
          <div className="flex gap-2 items-center">
            <div className="flex flex-col w-1/2">
              <label className="text-xs text-gray-500 mb-1">
                {fromCurrency}
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 text-sm w-full"
                min="0"
                onChange={(e) => handleFromAmountChange(Number(e.target.value))}
                placeholder="Cantidad"
                step="0.01"
                type="number"
                value={Math.round(amount * 100) / 100}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-xs text-gray-500 mb-1">{toCurrency}</label>
              <input
                className="border border-gray-300 rounded-md p-2 text-sm w-full"
                min="0"
                onChange={(e) => handleToAmountChange(Number(e.target.value))}
                placeholder="Conversión"
                step="0.01"
                type="number"
                value={Math.round(convertedAmount * 100) / 100}
              />
            </div>
          </div>

          {/* Selectores de moneda */}
          <div className="flex gap-2 items-center">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm w-full"
              onChange={(e) => setFromCurrency(e.target.value)}
              value={fromCurrency}
            >
              {getSortedSymbols().length > 0
                ? getSortedSymbols().map(([code, data]) => (
                    <option key={code} value={code}>
                      {code} - {data?.description || code}
                    </option>
                  ))
                : commonCurrencies.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
            </select>
            <select
              className="border border-gray-300 rounded-md p-2 text-sm w-full"
              onChange={(e) => setToCurrency(e.target.value)}
              value={toCurrency}
            >
              {getSortedSymbols().length > 0
                ? getSortedSymbols().map(([code, data]) => (
                    <option key={code} value={code}>
                      {code} - {data?.description || code}
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
      )}
    </article>
  );
}
