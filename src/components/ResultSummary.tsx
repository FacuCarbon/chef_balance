import { ArrowRight } from "lucide-react";
import type { CostResult } from "../types/recipe";
import { formatCurrency, formatDecimalCurrency, formatPercent } from "../lib/formatting";
import { ProfitBadge } from "./ProfitBadge";

type ResultSummaryProps = {
  result: CostResult;
};

export function ResultSummary({ result }: ResultSummaryProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-[28px] bg-cocoa p-5 text-white shadow-card">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-biscuit">
          Precio de venta sugerido
        </p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-4xl font-bold leading-none">
              {formatCurrency.format(result.suggestedUnitPrice)}
            </p>
            <p className="mt-2 text-xs font-bold text-white/65">por unidad vendible</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
            <p className="text-[11px] text-white/65">Margen</p>
            <p className="text-lg font-black text-biscuit">{formatPercent(result.margin)}</p>
          </div>
        </div>
      </div>
      <ProfitBadge status={result.status} />
      <div className="rounded-[28px] bg-white p-5 shadow-card">
        <h2 className="font-display text-2xl font-bold">Relacion costo-precio</h2>
        <div className="mt-4 space-y-3">
          <Line label="Costo por porcion" value={formatDecimalCurrency.format(result.costPerServing)} />
          <Line label="Ganancia estimada" value={formatDecimalCurrency.format(result.estimatedUnitProfit)} />
          <Line label="Precio lote completo" value={formatCurrency.format(result.suggestedBatchPrice)} />
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-3xl bg-sand p-4 text-sm font-bold text-cocoa/70">
          <ArrowRight className="shrink-0 text-clay" size={19} />
          El precio sugerido se calcula desde el costo por porcion y el margen seleccionado.
        </div>
      </div>
    </section>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-cocoa/10 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-cocoa/60">{label}</span>
      <strong className="text-sm text-cocoa">{value}</strong>
    </div>
  );
}
