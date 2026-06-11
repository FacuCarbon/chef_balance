import { ArrowRight, ChefHat, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { CostResult, Recipe } from "../types/recipe";
import { formatCurrency, formatPercent } from "../lib/formatting";

type RecipeHeroProps = {
  recipe: Recipe;
  result: CostResult;
};

export function RecipeHero({ recipe, result }: RecipeHeroProps) {
  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-card">
      <div className="relative min-h-52 bg-cocoa">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/45 to-transparent" />
        <div className="relative flex min-h-52 flex-col justify-end p-5 text-white">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-clay shadow-card">
            <ChefHat size={25} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-biscuit">Receta precargada</p>
          <h1 className="font-display text-4xl font-bold leading-none">{recipe.name}</h1>
          <p className="mt-2 max-w-xs text-sm text-white/82">{recipe.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        <Metric label="Porciones" value={String(recipe.servings)} icon={<UsersRound size={15} />} />
        <Metric label="Costo total" value={formatCurrency.format(result.totalCost)} />
        <Metric label="Margen" value={formatPercent(result.margin)} />
      </div>
      <div className="px-4 pb-4">
        <Link
          to="/insumos"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-clay px-4 py-4 text-sm font-black text-white shadow-button transition hover:-translate-y-0.5"
        >
          Revisar insumos
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl bg-sand px-3 py-3">
      <p className="flex items-center gap-1 text-[11px] font-bold text-cocoa/50">{icon}{label}</p>
      <p className="mt-1 text-sm font-black text-cocoa">{value}</p>
    </div>
  );
}
