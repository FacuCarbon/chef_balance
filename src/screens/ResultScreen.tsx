import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { ResultSummary } from "../components/ResultSummary";
import type { CostResult, Recipe } from "../types/recipe";

type ResultScreenProps = {
  recipe: Recipe;
  result: CostResult;
};

export function ResultScreen({ recipe, result }: ResultScreenProps) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-black text-clay">{recipe.name}</p>
        <h1 className="font-display text-3xl font-bold">Precio sugerido</h1>
      </div>
      <ResultSummary result={result} />
      <Link
        to="/calculo"
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-clay px-4 py-4 text-sm font-black text-clay"
      >
        <RotateCcw size={17} />
        Ajustar margen
      </Link>
    </div>
  );
}
