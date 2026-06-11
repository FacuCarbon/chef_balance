import { ChevronRight, Plus, Search, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import type { CostResult, Recipe } from "../types/recipe";
import { formatCurrency, formatPercent } from "../lib/formatting";

type RecipeOverviewScreenProps = {
  recipe: Recipe;
  result: CostResult;
};

export function RecipeOverviewScreen({ recipe, result }: RecipeOverviewScreenProps) {
  const activeCard = {
    id: recipe.id,
    name: recipe.name,
    servings: `${recipe.servings} porciones`,
    imageUrl: recipe.imageUrl,
    status: result.status,
    totalCost: formatCurrency.format(result.totalCost),
    margin: formatPercent(result.margin),
    price: formatCurrency.format(result.suggestedUnitPrice),
    costPerServing: formatCurrency.format(result.costPerServing)
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-[28px] font-bold leading-none">Tus Recetas</h1>
          <p className="mt-1 text-xs font-bold text-cocoa/42">1 registrada</p>
        </div>
        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-full bg-clay text-white shadow-button"
          title="Fuera de alcance"
          aria-label="Nueva receta fuera de alcance"
        >
          <Plus size={22} />
        </button>
      </div>

      <div className="flex h-11 items-center gap-3 rounded-[14px] bg-[#f2f0ee] px-4 text-cocoa/42">
        <Search size={18} />
        <span className="text-sm font-bold">Buscar receta...</span>
      </div>

      <div className="space-y-3">
        <RecipeCard card={activeCard} />
      </div>
    </div>
  );
}

function RecipeCard({
  card
}: {
  card: {
    id: string;
    name: string;
    servings: string;
    imageUrl: string;
    status: "healthy" | "medium" | "critical";
    totalCost: string;
    margin: string;
    price: string;
    costPerServing: string;
  };
}) {
  return (
    <Link
      to={`/recetas/${card.id}`}
      className={`block overflow-hidden rounded-[18px] border bg-white p-3 shadow-card transition hover:-translate-y-0.5 ${
        card.status === "critical" ? "border-danger/18" : card.status === "medium" ? "border-amber/18" : "border-cocoa/8"
      }`}
    >
      <div className="flex gap-3">
        <div className="grid h-[98px] w-[98px] shrink-0 place-items-center overflow-hidden rounded-[14px] bg-biscuit">
          <img src={card.imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-[16px] font-black leading-tight text-cocoa">{card.name}</h2>
              <p className="mt-1 text-xs font-bold text-cocoa/45">{card.servings}</p>
            </div>
            <ChevronRight className="text-cocoa/22" size={18} />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div
              className={`rounded-full px-3 py-1 text-[11px] font-black ${
                card.status === "critical"
                  ? "bg-danger/10 text-danger"
                  : card.status === "medium"
                    ? "bg-amber/12 text-amber"
                    : "bg-mint/10 text-mint"
              }`}
            >
              {card.status === "critical" ? "En pérdida" : card.status === "medium" ? "Revisar" : "Rentable"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-cocoa/10 pt-3">
        <div className="grid grid-cols-2 gap-2">
          <MetricTile label="Costo Total" value={card.totalCost} />
          <MetricTile label="Margen real" value={card.margin} status={card.status} />
          <MetricTile label="Precio sugerido" value={card.price} accent />
          <MetricTile label="Costo / porción" value={card.costPerServing} />
        </div>
      </div>
    </Link>
  );
}

function MetricTile({
  label,
  value,
  status,
  accent
}: {
  label: string;
  value: string;
  status?: "healthy" | "medium" | "critical";
  accent?: boolean;
}) {
  const trend = status ? trendMeta(status) : null;
  const Icon = trend?.Icon;

  return (
    <div className={`rounded-[12px] px-3 py-2 ${accent ? "bg-[#fbf2eb]" : "bg-[#faf7f3]"}`}>
      <p className="text-[11px] font-black text-cocoa/36">{label}</p>
      <p
        className={`mt-1 flex min-w-0 items-center gap-1 truncate text-[14px] font-black ${
          trend ? trend.className : accent ? "text-clay" : "text-cocoa"
        }`}
      >
        {Icon ? <Icon size={13} strokeWidth={2.6} /> : null}
        <span className="truncate">{value}</span>
      </p>
    </div>
  );
}

function trendMeta(status: "healthy" | "medium" | "critical") {
  return {
    healthy: {
      Icon: TrendingUp,
      className: "text-mint"
    },
    medium: {
      Icon: Minus,
      className: "text-amber"
    },
    critical: {
      Icon: TrendingDown,
      className: "text-danger"
    }
  }[status];
}
