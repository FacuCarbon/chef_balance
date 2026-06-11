import type { RecipeIngredient } from "../types/recipe";
import { calculateIngredientCost } from "../lib/calculations";
import { formatDecimalCurrency } from "../lib/formatting";

type IngredientRowProps = {
  ingredient: RecipeIngredient;
};

export function IngredientRow({ ingredient }: IngredientRowProps) {
  return (
    <article className="rounded-[14px] border border-cocoa/8 bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-cocoa">{ingredient.name}</h3>
          <p className="mt-1 text-xs font-bold text-cocoa/50">
            {ingredient.quantity} {ingredient.unit} usados
          </p>
        </div>
        <p className="text-xl font-black text-cocoa">
          {formatDecimalCurrency.format(calculateIngredientCost(ingredient))}
        </p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-clay"
          style={{ width: `${Math.min(100, calculateIngredientCost(ingredient) / 14)}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-cocoa/55">
        Precio unitario simulado:{" "}
        <strong className="text-cocoa">{formatDecimalCurrency.format(ingredient.unitPrice)}</strong>
      </p>
    </article>
  );
}
