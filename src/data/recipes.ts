import type { Recipe } from "../types/recipe";

export const demoRecipe: Recipe = {
  id: "receta-bolas-fraile",
  name: "Bolas de Fraile",
  description: "Receta base para venta por unidad con insumos ya cargados.",
  servings: 12,
  targetMargin: 50,
  imageUrl: "/bolas-de-fraile.png",
  ingredients: [
    { id: "harina", name: "Harina 0000", quantity: 0.5, unit: "kg", unitPrice: 1200 },
    { id: "azucar", name: "Azucar comun", quantity: 0.15, unit: "kg", unitPrice: 1500 },
    { id: "levadura", name: "Levadura fresca", quantity: 0.03, unit: "kg", unitPrice: 4200 },
    { id: "aceite", name: "Aceite para fritura", quantity: 0.2, unit: "l", unitPrice: 1800 },
    { id: "dulce", name: "Dulce de leche", quantity: 0.25, unit: "kg", unitPrice: 3600 },
    { id: "azucar-impalpable", name: "Azucar impalpable", quantity: 0.05, unit: "kg", unitPrice: 2800 }
  ]
};
