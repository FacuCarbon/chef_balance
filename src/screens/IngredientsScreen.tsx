import { ChevronDown, History, Plus, Search, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useMemo, useState } from "react";
import { formatDecimalCurrency } from "../lib/formatting";

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
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingIngredient = useMemo(
    () => ingredientsSeed.find((ingredient) => ingredient.id === editingId) ?? null,
    [editingId]
  );

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
            className="grid h-12 w-12 place-items-center rounded-full bg-clay text-white shadow-button"
            title="Fuera de alcance"
            aria-label="Nuevo insumo"
          >
            <Plus size={22} />
          </button>
        </div>

        <div className="flex h-11 items-center gap-3 rounded-[14px] bg-[#f2f0ee] px-4 text-cocoa/42">
          <Search size={18} />
          <span className="text-sm font-bold">Buscar por nombre o proveedor...</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-2">
        {ingredientsSeed.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} onEdit={() => setEditingId(ingredient.id)} />
        ))}
      </div>

      {editingIngredient ? (
        <EditSheetPortal ingredient={editingIngredient} onClose={() => setEditingId(null)} />
      ) : null}
    </div>
  );
}

function IngredientCard({
  ingredient,
  onEdit
}: {
  ingredient: IngredientItem;
  onEdit: () => void;
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
        <button type="button" className="border-r border-cocoa/8 py-3 text-cocoa/62 transition hover:bg-[#fcf6f1]">
          <span className="inline-flex items-center gap-1">
            <History size={14} />
            Historial
          </span>
        </button>
        <button type="button" className="py-3 text-cocoa/42 transition hover:bg-[#fcf6f1]" aria-label="Más opciones">
          <ChevronDown size={18} className="mx-auto" />
        </button>
      </div>
    </article>
  );
}

function EditSheetPortal({ ingredient, onClose }: { ingredient: IngredientItem; onClose: () => void }) {
  const host = typeof document === "undefined" ? null : document.getElementById("screen-overlay-host");

  if (!host) {
    return null;
  }

  return createPortal(<EditSheet ingredient={ingredient} onClose={onClose} />, host);
}

function EditSheet({ ingredient, onClose }: { ingredient: IngredientItem; onClose: () => void }) {
  const netCost = ingredient.unitPrice * (1 + ingredient.merma / 100);

  return (
    <div className="pointer-events-auto absolute inset-0 overflow-hidden bg-[#7a716d]/45">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-[26px] bg-white px-5 pb-5 pt-4 shadow-card">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-[18px] font-black leading-none text-cocoa">Editar Insumo</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#f5f3f1] text-cocoa/75"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2.5">
          <Field label="Nombre del insumo *" value={ingredient.name} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Unidad de medida" value={ingredient.unit} select />
            <Field label="Precio unitario ($) *" value={ingredient.unitPrice.toString()} numeric />
          </div>
          <Field label="% Merma (desperdicio)" value={ingredient.merma.toString()} numeric />
          <p className="text-[11px] font-black text-[#ff6d00]">Costo neto ≈ {formatDecimalCurrency.format(netCost)}</p>
          <Field label="Proveedor (opcional)" value={ingredient.supplier} placeholder="Ej: Molinera del Sur" />

          <button
            type="button"
            onClick={onClose}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-[14px] bg-clay px-4 py-3 text-[15px] font-black text-white shadow-button"
          >
            ✓ Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  select,
  numeric
}: {
  label: string;
  value: string;
  placeholder?: string;
  select?: boolean;
  numeric?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-black text-cocoa/72">{label}</span>
      <div className="rounded-[14px] bg-[#f4f2f0] px-4 py-1.5 text-[14px] font-medium text-cocoa">
        {select ? (
          <div className="flex items-center justify-between gap-3">
            <span>{value}</span>
            <ChevronDown size={16} className="text-cocoa/45" />
          </div>
        ) : numeric ? (
          <input
            type="number"
            defaultValue={value}
            className="w-full bg-transparent outline-none [appearance:textfield]"
          />
        ) : (
          <input
            type="text"
            defaultValue={value}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none placeholder:text-cocoa/35"
          />
        )}
      </div>
    </label>
  );
}
