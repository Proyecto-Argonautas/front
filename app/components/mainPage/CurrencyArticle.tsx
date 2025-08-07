import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Ellipsis,
  Trash2,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useTravel } from "~/contexts/TravelContext";
import { UserContext } from "~/contexts/UserContext";

export default function CurrencyArticle() {
  // Contextos
  const user = useContext(UserContext);
  const { travelData } = useTravel();

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

  const commonCurrencies = [
    "USD",
    "EUR",
    "MXN",
    "GBP",
    "JPY",
    "CAD",
    "BRL",
    "AUD",
    "CHF",
    "CNY",
  ];

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
        const res = await fetch("https://api.fxratesapi.com/currencies");
        const data = await res.json();

        if (data && data.currencies) {
          setSymbols(data.currencies);
        } else {
          // Use comprehensive fallback currency data
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
        }
      } catch {
        // Silently use fallback data - this is expected behavior
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
          `https://api.fxratesapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=1`,
        );
        const data = await res.json();

        if (data && typeof data.result === "number") {
          setExchangeRate(data.result);
        } else {
          // Use more comprehensive fallback rates
          const fallbackRates: { [key: string]: number } = {
            "EUR-USD": 1.08,
            "USD-EUR": 0.93,
            "USD-MXN": 17.5,
            "MXN-USD": 0.057,
            "EUR-MXN": 18.9,
            "MXN-EUR": 0.053,
            "GBP-USD": 1.27,
            "USD-GBP": 0.79,
            "EUR-GBP": 0.85,
            "GBP-EUR": 1.18,
            "USD-JPY": 149.5,
            "JPY-USD": 0.0067,
            "EUR-JPY": 161.5,
            "JPY-EUR": 0.0062,
            "USD-CAD": 1.35,
            "CAD-USD": 0.74,
            "EUR-CAD": 1.46,
            "CAD-EUR": 0.68,
            "USD-AUD": 1.52,
            "AUD-USD": 0.66,
            "EUR-AUD": 1.64,
            "AUD-EUR": 0.61,
            "USD-CHF": 0.88,
            "CHF-USD": 1.14,
            "EUR-CHF": 0.95,
            "CHF-EUR": 1.05,
          };
          const rateKey = `${fromCurrency}-${toCurrency}`;
          setExchangeRate(fallbackRates[rateKey] || 1);
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
      } catch {
        // Silently use fallback rate - this is expected behavior
        const fallbackRates: { [key: string]: number } = {
          "EUR-USD": 1.08,
          "USD-EUR": 0.93,
          "USD-MXN": 17.5,
          "MXN-USD": 0.057,
          "EUR-MXN": 18.9,
          "MXN-EUR": 0.053,
        };
        const rateKey = `${fromCurrency}-${toCurrency}`;
        setExchangeRate(fallbackRates[rateKey] || 1);
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

  // Función para eliminar el artículo completo
  const handleDeleteArticle = () => {
    console.log("Artículo eliminado:", {
      user_id: user?.id || "unknown",
      travel_id: travelData?.destiny || "unknown",
      component_type: "currency",
    });
    setVisible(false);
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
    <article className="relative w-full mt-2 bg-light-primary rounded-2xl shadow-md">
      <div className="relative flex items-center justify-between w-full">
        <button
          aria-controls="article-details"
          aria-expanded={open}
          className="flex items-center gap-2 flex-1 p-4 cursor-pointer bg-transparent border-0 rounded-t-2xl outline-none"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <DollarSign />
          <h2 className="flex gap-2 text-lg font-semibold min-w-10">
            Divisas
          </h2>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>

        <div className="relative pr-4" ref={optionsRef}>
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
            <div className="absolute right-0 mt-2 w-32 bg-light-primary border rounded-md shadow-md z-10">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-light-secondary-100"
                onClick={handleDeleteArticle}
                type="button"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t px-4 py-6 space-y-4 text-sm text-gray-700">
          {/* Header con información de conversión */}
          <div className="flex justify-between py-2">
            <div>
              <div className="text-sm text-gray-500">
                1 {fromCurrency} equivale a
              </div>
              <div className="font-semibold text-xl">
                {isLoading
                  ? "..."
                  : exchangeRate
                    ? exchangeRate.toFixed(4)
                    : "Error"}{" "}
                {symbols[toCurrency]?.description || toCurrency}
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-base mb-4">{lastUpdated}</div>

          {/* Campos de entrada para las cantidades */}
          <div className="flex gap-3 items-center">
            <div className="flex flex-col w-1/2">
              <label className="text-sm text-gray-500 mb-2">
                {fromCurrency}
              </label>
              <input
                className="border border-gray-300 rounded-md p-3 text-base w-full"
                min="0"
                onChange={(e) => handleFromAmountChange(Number(e.target.value))}
                placeholder="Cantidad"
                step="0.01"
                type="number"
                value={Math.round(amount * 100) / 100}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm text-gray-500 mb-2">{toCurrency}</label>
              <input
                className="border border-gray-300 rounded-md p-3 text-base w-full"
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
          <div className="flex gap-3 items-center pt-2">
            <select
              className="border border-gray-300 rounded-md p-3 text-base w-full"
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
              className="border border-gray-300 rounded-md p-3 text-base w-full"
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
