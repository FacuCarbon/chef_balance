import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Utensils, Users } from "lucide-react";
import { CostBreakdown } from "../components/CostBreakdown";
import { MarginSelector } from "../components/MarginSelector";
import { RecipeToast } from "../components/RecipeToast";
import type { CostResult, Recipe } from "../types/recipe";
import { formatDecimalCurrency, formatPercent } from "../lib/formatting";

type CostSimulatorScreenProps = {
  recipe: Recipe;
  result: CostResult;
  margin: number;
  setMargin: (margin: number) => void;
};

export function CostSimulatorScreen({ recipe, result, margin, setMargin }: CostSimulatorScreenProps) {
  const [toastOpen, setToastOpen] = useState(false);
  const toastTimerRef = useRef<number | null>(null);
  const statusMeta = {
    healthy: "Rentable",
    medium: "Revisar Costos",
    critical: "En pérdida"
  }[result.status];
  const statusClass = {
    healthy: "bg-[#dff4df] text-mint",
    medium: "bg-[#f4c97f] text-cocoa",
    critical: "bg-[#f6d0cc] text-danger"
  }[result.status];

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function showEditRecipeToast() {
    setToastOpen(true);

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastOpen(false);
      toastTimerRef.current = null;
    }, 4200);
  }

  return (
    <div className="-mx-5 -mt-7 space-y-5">
      <section className="relative h-[clamp(190px,29dvh,242px)] overflow-hidden">
        <img src={recipe.imageUrl} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa/10 via-cocoa/16 to-cocoa/78" />
        <Link
          to="/recetas"
          className="absolute left-5 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/35 text-white backdrop-blur"
          aria-label="Volver a recetas"
        >
          <ArrowLeft size={22} />
        </Link>
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <h1 className="font-display text-[28px] font-bold leading-none">{recipe.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-[12px] font-bold text-white/88">
            <Users size={14} />
            <span>{recipe.servings} porciones</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${statusClass}`}>{statusMeta}</span>
          </div>
        </div>
      </section>

      <div className="space-y-5 px-5 pb-2">
        <section className="rounded-[28px] bg-cocoa p-5 text-white shadow-card">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Utensils size={17} />
              <p className="text-[17px] font-black">Precio y Ganancia</p>
            </div>
            <span className="rounded-full bg-[#e8c09b] px-3 py-1 text-[11px] font-black uppercase text-cocoa">
              {formatPercent(margin)} markup
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
            <SmallMetric label="Costo Total" value={formatDecimalCurrency.format(result.totalCost)} />
            <SmallMetric label="Ganancia Pura" value={formatDecimalCurrency.format(result.estimatedUnitProfit)} muted />
            <SmallMetric label="Costo / Porción" value={formatDecimalCurrency.format(result.costPerServing)} />
            <SmallMetric label="Precio / Porción" value={formatDecimalCurrency.format(result.suggestedUnitPrice)} muted />
          </div>

          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-[12px] font-black text-white/88">Precio de Venta Sugerido (lote completo)</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="min-w-0 break-words font-display text-[clamp(26px,4dvh,32px)] font-bold leading-none text-white">
                {formatDecimalCurrency.format(result.suggestedBatchPrice)}
              </p>
              <div className="text-right">
                <p className="text-[12px] text-white/65">Margen real</p>
                <p className="text-[18px] font-black text-[#ffd2bc]">{formatPercent(result.margin)}</p>
              </div>
            </div>
          </div>
        </section>

        <MarginSelector margin={margin} baseCost={result.totalCost} onChange={setMargin} />
        <CostBreakdown recipe={recipe} result={result} onEditRecipe={showEditRecipeToast} />
      </div>

      <RecipeToast
        open={toastOpen}
        description="Editar receta está fuera del alcance."
        onClose={() => {
          setToastOpen(false);
          if (toastTimerRef.current !== null) {
            window.clearTimeout(toastTimerRef.current);
            toastTimerRef.current = null;
          }
        }}
      />
    </div>
  );
}

function SmallMetric({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[12px] font-black text-white/78">{label}</p>
      <p className={`mt-1 truncate text-[clamp(18px,3dvh,22px)] font-black leading-none ${muted ? "text-[#ffb7ad]" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
