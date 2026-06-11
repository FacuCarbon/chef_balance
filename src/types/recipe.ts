export type ProfitStatus = "healthy" | "medium" | "critical";

export type RecipeIngredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  servings: number;
  targetMargin: number;
  imageUrl: string;
  ingredients: RecipeIngredient[];
};

export type CostResult = {
  ingredientSubtotal: number;
  energyCost: number;
  totalCost: number;
  costPerServing: number;
  margin: number;
  suggestedUnitPrice: number;
  suggestedBatchPrice: number;
  estimatedUnitProfit: number;
  status: ProfitStatus;
};

export type User = {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
  category: string;
};
