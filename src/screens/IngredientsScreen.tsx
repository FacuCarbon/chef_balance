import { ChevronDown, History, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatDecimalCurrency } from "../lib/formatting";
import { RecipeToast } from "../components/RecipeToast";

type IngredientItem = {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  merma: number;
  supplier: string;
  updatedAt: string;
};

const ingredientsSeed: IngredientItem[] = [
  { id: "harina", name: "Harina 0000", unit: "kg", unitPrice: 850, merma: 2, supplier: "Molinera del Sur", updatedAt: "2026-05-18" },
  { id: "azucar", name: "Azúcar Blanca", unit: "kg", unitPrice: 1200, merma: 0, supplier: "Distribuidora Norte", updatedAt: "2026-05-15" },
  { id: "huevos", name: "Huevos", unit: "docena", unitPrice: 2500, merma: 5, supplier: "Granja El Amanecer", updatedAt: "2026-05-19" },
  { id: "manteca", name: "Manteca", unit: "kg", unitPrice: 6500, merma: 3, supplier: "Lácteos Pampa", updatedAt: "2026-05-10" },
  { id: "crema", name: "Crema de Leche", unit: "litro", unitPrice: 3800, merma: 2, supplier: "Lácteos Pampa", updatedAt: "2026-05-14" },
  { id: "levadura", name: "Levadura Fresca", unit: "kg", unitPrice: 4200, merma: 1, supplier: "Panificadora Central", updatedAt: "2026-05-12" },
  { id: "aceite", name: "Aceite Vegetal", unit: "litro", unitPrice: 2900, merma: 4, supplier: "Aceiteras del Plata", updatedAt: "2026-05-11" },
  { id: "dulce", name: "Dulce de Leche", unit: "kg", unitPrice: 3600, merma: 2, supplier: "Lácteos Pampa", updatedAt: "2026-05-16" }
];

export function IngredientsScreen() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    setToastMessage(message);

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 4200);
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="space-y-4 px-0 pb-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-[28px] font-bold leading-none">Insumos</h1>
            <p className="mt-1 text-xs font-bold text-cocoa/42">8 registrados</p>
          </div>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full bg-clay text-white shadow-button transition hover:-translate-y-0.5 active:translate-y-0"
            title="Nuevo insumo"
            aria-label="Nuevo insumo"
            onClick={() => showToast("Crear insumo está fuera del alcance")}
          >
            <Plus size={22} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => showToast("Buscar insumo está fuera del alcance")}
          className="flex h-11 w-full items-center gap-3 rounded-[14px] bg-[#f2f0ee] px-4 text-left text-cocoa/42 transition hover:bg-[#ece7e2] active:scale-[0.995]"
          aria-label="Buscar insumo"
        >
          <Search size={18} />
          <span className="text-sm font-bold">Buscar por nombre o proveedor...</span>
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-2">
        {ingredientsSeed.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            onEdit={() => showToast("Editar insumo fuera del alcance")}
            onShowHistory={() => showToast("Historial fuera del alcance")}
            onShowDetails={() => showToast("Detalles del insumo fuera del alcance")}
          />
        ))}
      </div>

      {toastMessage ? (
        <RecipeToast
          open
          description={toastMessage}
          onClose={() => {
            setToastMessage(null);
            if (toastTimerRef.current !== null) {
              window.clearTimeout(toastTimerRef.current);
              toastTimerRef.current = null;
            }
          }}
        />
      ) : null}
    </div>
  );
}

function IngredientCard({
  ingredient,
  onEdit,
  onShowHistory,
  onShowDetails
}: {
  ingredient: IngredientItem;
  onEdit: () => void;
  onShowHistory: () => void;
  onShowDetails: () => void;
}) {
  const netPrice = ingredient.unitPrice * (1 + ingredient.merma / 100);

  return (
    <article className="overflow-hidden rounded-[18px] border border-cocoa/8 bg-white shadow-card">
      <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4">
        <div className="min-w-0">
          <h2 className="truncate text-[18px] font-black leading-none text-cocoa">{ingredient.name}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#f4f1ec] px-2.5 py-1 text-[11px] font-black text-cocoa/58">
              {ingredient.unit}
            </span>
            {ingredient.merma > 0 ? (
              <span className="rounded-full bg-[#fff0e0] px-2.5 py-1 text-[11px] font-black text-[#d96f00]">
                +{ingredient.merma}% merma
              </span>
            ) : null}
            <span className="truncate text-[12px] font-medium text-cocoa/50">{ingredient.supplier}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[20px] font-black leading-none text-cocoa">
            ${ingredient.unitPrice.toLocaleString("es-AR")}
          </p>
          <p className="mt-2 text-[11px] font-black text-[#e44f45]">Neto: {formatDecimalCurrency.format(netPrice)}</p>
          <p className="mt-0.5 text-[11px] font-black text-[#e44f45]">{ingredient.updatedAt}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-cocoa/8 text-[14px] font-black">
        <button
          type="button"
          onClick={onEdit}
          className="border-r border-cocoa/8 py-3 text-clay transition hover:bg-[#fcf6f1]"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={onShowHistory}
          className="border-r border-cocoa/8 py-3 text-cocoa/62 transition hover:bg-[#fcf6f1]"
        >
          <span className="inline-flex items-center gap-1">
            <History size={14} />
            Historial
          </span>
        </button>
        <button
          type="button"
          onClick={onShowDetails}
          className="py-3 text-cocoa/42 transition hover:bg-[#fcf6f1]"
          aria-label="Más opciones"
          title="Más opciones"
        >
          <ChevronDown size={18} className="mx-auto" />
        </button>
      </div>
    </article>
  );
}
