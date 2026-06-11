import { Award, ChevronRight, CircleAlert, Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { CostResult, Recipe } from "../types/recipe";
import { formatPercent } from "../lib/formatting";
import { useAuth } from "../context/useAuth";

type HomeScreenProps = {
  recipe: Recipe;
  result: CostResult;
};

export function HomeScreen({ recipe, result }: HomeScreenProps) {
  const { currentUser } = useAuth();
  const firstName = currentUser?.ownerName.split(" ")[0] ?? "Usuario";
  const statusCounts = {
    healthy: result.status === "healthy" ? 1 : 0,
    medium: result.status === "medium" ? 1 : 0,
    critical: result.status === "critical" ? 1 : 0
  };
  const showAlert = result.status === "critical";

  return (
    <div className="space-y-5">
      <section>
        <h1 className="font-display text-[28px] font-bold leading-none text-cocoa">Hola, {firstName}</h1>
        <p className="mt-1 text-[15px] font-bold text-cocoa/58">Aquí está el resumen de tu negocio</p>
      </section>

      <section
        className={`rounded-[14px] border p-4 ${
          showAlert ? "border-danger/35 bg-danger/10" : "border-mint/25 bg-mint/8"
        }`}
      >
        <div className="flex gap-3">
          <CircleAlert className={`mt-0.5 shrink-0 ${showAlert ? "text-clay" : "text-mint"}`} size={20} />
          <div>
            <p className="font-black text-cocoa">
              {showAlert ? "Alerta de Rentabilidad" : "Rentabilidad dentro del margen"}
            </p>
            <p className="mt-1 text-sm font-bold leading-5 text-cocoa/65">
              {showAlert
                ? "1 receta tiene margen igual o inferior al 30% esperado. Revisá su precio."
                : "La receta activa supera el umbral mínimo esperado."}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[22px] bg-white p-5 shadow-card">
        <h2 className="text-xl font-black text-cocoa">Semáforo de Rentabilidad</h2>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <RentabilityCircle
            label="RENTABLE"
            count={`${statusCounts.healthy} ${statusCounts.healthy === 1 ? "receta" : "recetas"}`}
            color="mint"
            active={result.status === "healthy"}
          />
          <RentabilityCircle
            label="REVISAR"
            count={`${statusCounts.medium} ${statusCounts.medium === 1 ? "receta" : "recetas"}`}
            color="amber"
            active={result.status === "medium"}
          />
          <RentabilityCircle
            label="PÉRDIDA"
            count={`${statusCounts.critical} ${statusCounts.critical === 1 ? "receta" : "recetas"}`}
            color="danger"
            active={result.status === "critical"}
          />
        </div>
        <p
          className={`mt-5 rounded-[12px] border px-4 py-3 text-center text-sm font-black leading-5 ${
            showAlert ? "border-danger/15 bg-danger/10 text-danger" : "border-mint/15 bg-mint/10 text-mint"
          }`}
        >
          {showAlert
            ? "1 receta con margen <= 30%. Te sugerimos ajustar su precio."
            : "La receta activa mantiene un margen saludable."}
        </p>
      </section>

      <section className="rounded-[22px] bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="text-clay" size={18} />
            <h2 className="font-black text-cocoa">Receta activa</h2>
          </div>
          <p className="text-[10px] font-black uppercase text-cocoa/38">Margen real</p>
        </div>
        <div className="mt-5 space-y-4">
          <ProfitRow position="1" name={recipe.name} margin={formatPercent(result.margin)} status={result.status} />
        </div>
      </section>
    </div>
  );
}

function RentabilityCircle({
  label,
  count,
  color,
  active
}: {
  label: string;
  count: string;
  color: "mint" | "amber" | "danger";
  active?: boolean;
}) {
  const colors = {
    mint: {
      ring: "border-mint/45 bg-mint/8",
      text: "text-mint",
      dot: "bg-mint"
    },
    amber: {
      ring: "border-amber/45 bg-amber/8",
      text: "text-amber",
      dot: "bg-amber"
    },
    danger: {
      ring: "border-danger bg-danger/10",
      text: "text-danger",
      dot: "bg-danger"
    }
  };

  return (
    <div>
      <div className={`mx-auto grid h-12 w-12 place-items-center rounded-full border-4 ${colors[color].ring}`}>
        {active ? <span className={`h-5 w-5 rounded-full ${colors[color].dot}`} /> : null}
      </div>
      <p className={`mt-3 text-[11px] font-black ${colors[color].text}`}>{label}</p>
      <p className="mt-2 text-[11px] font-bold text-cocoa/38">{count}</p>
    </div>
  );
}

function ProfitRow({
  position,
  name,
  margin,
  status
}: {
  position: string;
  name: string;
  margin: string;
  status: "healthy" | "medium" | "critical";
}) {
  const trend = {
    healthy: {
      Icon: TrendingUp,
      className: "text-mint"
    },
    medium: {
      Icon: Minus,
      className: "text-amber"
    },
    critical: {
      Icon: TrendingDown,
      className: "text-danger"
    }
  }[status];
  const Icon = trend.Icon;

  return (
    <div className="flex items-center gap-3">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-biscuit text-xs font-black text-cocoa">
        {position}
      </span>
      <p className="min-w-0 flex-1 truncate text-sm font-black text-cocoa">{name}</p>
      <p className={`flex items-center gap-1 text-sm font-black ${trend.className}`}>
        <Icon size={14} strokeWidth={2.6} />
        {margin}
      </p>
      <ChevronRight className="shrink-0 text-cocoa/20" size={17} />
    </div>
  );
}
