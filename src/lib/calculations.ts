import type { CostResult, ProfitStatus, Recipe, RecipeIngredient } from "../types/recipe";

export function calculateIngredientCost(ingredient: RecipeIngredient) {
  return ingredient.quantity * ingredient.unitPrice;
}

export function getProfitStatus(margin: number): ProfitStatus {
  if (margin >= 50) {
    return "healthy";
  }

  if (margin >= 31) {
    return "medium";
  }

  return "critical";
}

export function calculateRecipeCost(recipe: Recipe, margin: number): CostResult {
  if (recipe.servings <= 0) {
    throw new Error("La cantidad de porciones debe ser mayor a cero.");
  }

  const ingredientSubtotal = recipe.ingredients.reduce(
    (sum, ingredient) => sum + calculateIngredientCost(ingredient),
    0
  );
  const energyCost = ingredientSubtotal * 0.05;
  const totalCost = ingredientSubtotal + energyCost;
  const costPerServing = totalCost / recipe.servings;
  const suggestedUnitPrice = costPerServing * (1 + margin / 100);

  return {
    ingredientSubtotal,
    energyCost,
    totalCost,
    costPerServing,
    margin,
    suggestedUnitPrice,
    suggestedBatchPrice: totalCost * (1 + margin / 100),
    estimatedUnitProfit: suggestedUnitPrice - costPerServing,
    status: getProfitStatus(margin)
  };
}
