import { AlertTriangle, CheckCircle2, CircleAlert } from "lucide-react";
import type { ProfitStatus } from "../types/recipe";

const statusContent = {
  healthy: {
    label: "Rentabilidad saludable",
    helper: "El margen supera el umbral recomendado.",
    className: "bg-mint/12 text-mint border-mint/25",
    icon: CheckCircle2
  },
  medium: {
    label: "Margen medio",
    helper: "Conviene revisar precio si suben los insumos.",
    className: "bg-amber/12 text-amber border-amber/25",
    icon: AlertTriangle
  },
  critical: {
    label: "Margen critico",
    helper: "El precio sugerido queda cerca del costo real.",
    className: "bg-danger/12 text-danger border-danger/25",
    icon: CircleAlert
  }
};

export function ProfitBadge({ status }: { status: ProfitStatus }) {
  const content = statusContent[status];
  const Icon = content.icon;

  return (
    <div className={`rounded-3xl border p-4 ${content.className}`}>
      <div className="flex items-center gap-3">
        <Icon size={22} />
        <div>
          <p className="font-black">{content.label}</p>
          <p className="text-xs font-bold opacity-75">{content.helper}</p>
        </div>
      </div>
    </div>
  );
}
