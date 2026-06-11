import { ChefHat, Home, ScanLine, Settings, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/inicio", label: "Inicio", icon: Home },
  { to: "/recetas", label: "Recetas", icon: ChefHat },
  { to: "/calculo", label: "", icon: ScanLine, featured: true },
  { to: "/insumos", label: "Insumos", icon: ShoppingCart },
  { to: "/ajustes", label: "Ajustes", icon: Settings }
];

export function FlowTabs() {
  return (
    <nav className="z-30 grid h-[clamp(72px,10dvh,84px)] shrink-0 grid-cols-5 border-t border-cocoa/10 bg-white px-4 pb-2 pt-2 shadow-[0_-10px_30px_rgba(80,35,16,0.08)]">
      {tabs.map(({ to, label, icon: Icon, featured }) => (
        <NavLink
          key={`${to}-${label}`}
          to={to}
          className={({ isActive }) =>
            featured
              ? "relative -mt-8 flex flex-col items-center gap-1 text-[10px] font-bold text-clay"
              : `flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold transition ${
                  isActive ? "text-clay" : "text-cocoa/38 hover:text-clay"
                }`
          }
        >
          <span
            className={
              featured
                ? "grid h-[clamp(48px,7dvh,56px)] w-[clamp(48px,7dvh,56px)] place-items-center rounded-full bg-clay text-white shadow-button"
                : ""
            }
          >
            <Icon size={featured ? 26 : 21} strokeWidth={featured ? 2 : 2.2} />
          </span>
          {label ? <span>{label}</span> : <span className="h-[12px]" aria-hidden="true" />}
        </NavLink>
      ))}
    </nav>
  );
}
