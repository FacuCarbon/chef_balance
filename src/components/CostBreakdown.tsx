import { PenLine, Zap } from "lucide-react";
import type { CostResult, Recipe } from "../types/recipe";
import { calculateIngredientCost } from "../lib/calculations";
import { formatDecimalCurrency } from "../lib/formatting";

type CostBreakdownProps = {
  recipe: Recipe;
  result: CostResult;
  onEditRecipe: () => void;
};

export function CostBreakdown({ recipe, result, onEditRecipe }: CostBreakdownProps) {
  const ingredientRows = recipe.ingredients.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
    detail: `${ingredient.quantity} ${ingredient.unit} • $${ingredient.unitPrice.toLocaleString("es-AR")}`,
    value: calculateIngredientCost(ingredient)
  }));

  return (
    <section className="overflow-hidden rounded-[18px] bg-white shadow-card">
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="text-[21px] font-black leading-none">Escandallo de Costos</h2>
        <button
          type="button"
          onClick={onEditRecipe}
          className="grid h-9 w-9 place-items-center rounded-full bg-[#f6efe9] text-clay transition hover:-translate-y-0.5 hover:bg-[#f1e3d8]"
          aria-label="Editar receta"
          title="Editar receta"
        >
          <PenLine size={18} className="text-clay/90" />
        </button>
      </div>

      <div className="mt-4 px-5">
        <div className="flex items-center justify-between border-b border-cocoa/10 pb-2 text-[11px] font-black uppercase tracking-wide text-cocoa/32">
          <span>Insumo</span>
          <span>Subtotal</span>
        </div>
        <div className="divide-y divide-cocoa/10">
          {ingredientRows.map((row) => (
            <div key={row.id} className="flex items-center justify-between py-3">
              <div className="min-w-0 pr-3">
                <p className="truncate text-[15px] font-black text-cocoa">{row.name}</p>
                <p className="mt-0.5 truncate text-[12px] font-medium text-cocoa/45">{row.detail}</p>
              </div>
              <span className="shrink-0 text-[15px] font-black text-cocoa">
                {formatDecimalCurrency.format(row.value)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-y border-cocoa/10 bg-[#fff8ec] px-3 py-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-clay" />
            <span className="text-[15px] font-black text-cocoa">Costo energético</span>
            <span className="rounded-full bg-[#ffe4b8] px-2 py-0.5 text-[11px] font-black text-clay">5%</span>
          </div>
          <span className="text-[15px] font-black text-cocoa">{formatDecimalCurrency.format(result.energyCost)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-cocoa px-5 py-4 text-white">
        <span className="text-[14px] font-black uppercase tracking-wide">Costo total</span>
        <span className="text-[16px] font-black">{formatDecimalCurrency.format(result.totalCost)}</span>
      </div>
    </section>
  );
}
