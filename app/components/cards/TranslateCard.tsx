import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ArrowLeftRight } from "lucide-react";

interface TranslateCardProps {
  defaultTargetLang?: string; // idioma destino por defecto
}

function TranslateCard({ defaultTargetLang = "es" }: TranslateCardProps) {
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState(defaultTargetLang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Limpiar traducción cuando cambie el idioma origen o destino
  useEffect(() => {
    if (translated) {
      setTranslated("");
      setError(null);
    }
  }, [sourceLang, targetLang]);

  // Auto-traducir con debounce
  useEffect(() => {
    if (!input.trim()) {
      setTranslated("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        // Usar MyMemory Translation API que no tiene problemas de CORS
        const url = new URL("https://api.mymemory.translated.net/get");
        url.searchParams.set("q", input);
        url.searchParams.set("langpair", `${sourceLang}|${targetLang}`);

        const resp = await fetch(url.toString());
        if (!resp.ok) throw new Error("Error en la API");
        const data = await resp.json();

        if (data.responseStatus === 200) {
          setTranslated(data.responseData.translatedText);
        } else {
          throw new Error(data.responseDetails || "Error en la traducción");
        }
      } catch (err) {
        console.error("Translation error:", err);
        setError("No se pudo traducir el texto");
      } finally {
        setLoading(false);
      }
    }, 1000); // Esperar 1 segundo después de que el usuario deje de escribir

    return () => clearTimeout(timeoutId);
  }, [input, sourceLang, targetLang]);

  const handleTranslate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // Usar MyMemory Translation API que no tiene problemas de CORS
      const url = new URL("https://api.mymemory.translated.net/get");
      url.searchParams.set("q", input);
      url.searchParams.set("langpair", `${sourceLang}|${targetLang}`);

      const resp = await fetch(url.toString());
      if (!resp.ok) throw new Error("Error en la API");
      const data = await resp.json();

      if (data.responseStatus === 200) {
        setTranslated(data.responseData.translatedText);
      } else {
        throw new Error(data.responseDetails || "Error en la traducción");
      }
    } catch (err) {
      console.error("Translation error:", err);
      setError("No se pudo traducir el texto");
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    // Solo intercambiar si tenemos una traducción
    if (translated && input) {
      setInput(translated);
      setTranslated("");
      // Intercambiar los idiomas
      const tempLang = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(tempLang);
    }
  };

  const handleClear = () => {
    setInput("");
    setTranslated("");
    setError(null);
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
                Traductor de texto
              </div>
              <div className="text-[1.35rem] font-semibold text-black mb-2">
                {translated ? `${sourceLang.toUpperCase()} → ${targetLang.toUpperCase()}` : "Listo para traducir"}
              </div>
              <div className="text-gray-400 text-sm mb-4">
                {translated ? "Traducción completada" : "Introduce texto para traducir"}
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-700">
              Traductor
            </div>
          )}
        </div>
        <button
          aria-label={
            isExpanded ? "Colapsar traductor" : "Expandir traductor"
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
        <div className="space-y-2 flex-1 overflow-hidden flex flex-col">
          {/* Selector de idioma y botón de intercambio */}
          <div className="flex gap-2 items-end flex-shrink-0">
            <div className="flex flex-col w-2/5">
              <label className="text-xs text-gray-500 mb-1">
                Idioma origen
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-xs w-full"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
                <option value="ru">Русский</option>
                <option value="ar">العربية</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
            <div className="flex justify-center w-1/5">
              <button
                onClick={handleSwapLanguages}
                disabled={!translated || !input}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Intercambiar idiomas"
              >
                <ArrowLeftRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col w-2/5">
              <label className="text-xs text-gray-500 mb-1">Traducir a</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-xs w-full"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
                <option value="ru">Русский</option>
                <option value="ar">العربية</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>

          {/* Área de texto original */}
          <div className="flex flex-col flex-shrink-0">
            <label className="text-xs text-gray-500 mb-1">
              Texto original
            </label>
            <textarea
              className="border border-gray-300 rounded-md p-2 text-xs w-full resize-none focus:outline-none focus:border-green-500 focus:ring-0 "
              rows={2}
              placeholder="Escribe el texto a traducir..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Área de traducción */}
          <div className="flex flex-col flex-shrink-0">
            <label className="text-xs text-gray-500 mb-1">
              Traducción
            </label>
            <textarea
              className="border border-gray-300 rounded-md p-2 text-xs w-full resize-none bg-gray-50 focus:outline-none "
              rows={2}
              placeholder={loading ? "Traduciendo..." : "La traducción aparecerá aquí"}
              value={loading ? "Traduciendo..." : translated}
              readOnly
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-xs hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={handleTranslate}
              disabled={loading || !input.trim()}
            >
              {loading ? "Traduciendo..." : "Traducir ahora"}
            </button>
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={handleClear}
              disabled={!input && !translated}
            >
              Limpiar
            </button>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-2 flex-shrink-0">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TranslateCard;
