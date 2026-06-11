import { ChefHat, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-shell">
      <main className={`phone-frame ${currentUser ? "" : "auth-frame"}`} aria-label="Chef Balance">
        {currentUser ? (
          <header className="flex min-h-[68px] items-center justify-between border-b border-cocoa/8 bg-[#FFFCF9] px-[26px] text-cocoa">
            <div className="flex items-center gap-2.5">
              <ChefHat className="text-clay" size={22} strokeWidth={2.2} />
              <p className="font-display text-[21px] font-bold leading-none">Chef Balance</p>
            </div>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border-0 bg-biscuit text-cocoa shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              onClick={logout}
              type="button"
              aria-label="Cerrar sesion"
            >
              <LogOut size={18} strokeWidth={2.4} />
            </button>
          </header>
        ) : null}
        <section
          className={`relative h-full min-h-0 bg-[#FFFCF9] ${
            currentUser ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"
          }`}
        >
          {children}
          <div id="screen-overlay-host" className="pointer-events-none absolute inset-0 z-50" />
        </section>
      </main>
    </div>
  );
}
