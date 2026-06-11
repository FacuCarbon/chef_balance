import { formatDecimalCurrency, formatPercent } from "../lib/formatting";

type MarginSelectorProps = {
  margin: number;
  baseCost: number;
  onChange: (margin: number) => void;
};

export function MarginSelector({ margin, baseCost, onChange }: MarginSelectorProps) {
  const multiplier = (1 + margin / 100).toFixed(2);

  return (
    <section className="rounded-[18px] bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[19px] font-black leading-none">Simulador de Markup</h2>
          <p className="mt-1 text-[12px] font-medium text-cocoa/45">
            Precio = Costo x (1 + {formatPercent(margin)}) = {formatDecimalCurrency.format(baseCost)} x {multiplier}
          </p>
        </div>
        <strong className="text-[20px] font-black text-clay">{formatPercent(margin)}</strong>
      </div>

      <input
        className="mt-5 w-full accent-clay"
        type="range"
        min="10"
        max="120"
        value={margin}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="mt-2 flex justify-between text-[11px] font-bold text-cocoa/45">
        <span>10%</span>
        <span>Umbral alerta: 30%</span>
        <span>120%</span>
      </div>
    </section>
  );
}
