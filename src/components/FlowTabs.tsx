import { ChefHat, Home, ScanLine, Settings, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/inicio", label: "Inicio", icon: Home },
  { to: "/recetas", label: "Recetas", icon: ChefHat },
  { to: "/insumos", label: "Insumos", icon: ShoppingCart },
  { to: "/ajustes", label: "Ajustes", icon: Settings }
];

type FlowTabsProps = {
  onScanClick: () => void;
};

export function FlowTabs({ onScanClick }: FlowTabsProps) {
  return (
    <nav className="z-30 grid h-[clamp(72px,10dvh,84px)] shrink-0 grid-cols-5 border-t border-cocoa/10 bg-white px-4 pb-2 pt-2 shadow-[0_-10px_30px_rgba(80,35,16,0.08)]">
      {tabs.slice(0, 2).map(({ to, label, icon: Icon }) => (
        <NavLink
          key={`${to}-${label}`}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold transition ${
              isActive ? "text-clay" : "text-cocoa/38 hover:text-clay"
            }`
          }
        >
          <span>
            <Icon size={21} strokeWidth={2.2} />
          </span>
          <span>{label}</span>
        </NavLink>
      ))}
      <button
        type="button"
        onClick={onScanClick}
        className="relative -mt-8 flex flex-col items-center gap-1 text-[10px] font-bold text-clay"
        aria-label="Escanear"
        title="Escanear"
      >
        <span className="grid h-[clamp(48px,7dvh,56px)] w-[clamp(48px,7dvh,56px)] place-items-center rounded-full bg-clay text-white shadow-button">
          <ScanLine size={26} strokeWidth={2} />
        </span>
        <span aria-hidden="true" className="h-[12px]" />
      </button>
      {tabs.slice(2).map(({ to, label, icon: Icon }) => (
        <NavLink
          key={`${to}-${label}`}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold transition ${
              isActive ? "text-clay" : "text-cocoa/38 hover:text-clay"
            }`
          }
        >
          <span>
            <Icon size={21} strokeWidth={2.2} />
          </span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
