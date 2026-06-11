import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

type RecipeToastProps = {
  open: boolean;
  title?: string;
  description: string;
  onClose: () => void;
};

const TOAST_HOST_ID = "screen-overlay-host";
const CHEF_LOGO = "/favicon.svg";

export function RecipeToast({ open, title = "Demo funcional", description, onClose }: RecipeToastProps) {
  const [shouldRender, setShouldRender] = useState(open);
  const [phase, setPhase] = useState<"enter" | "open" | "exit">("open");

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setPhase("enter");
      const frame = window.requestAnimationFrame(() => setPhase("open"));
      const timer = window.setTimeout(() => setPhase("open"), 240);
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timer);
      };
    }

    if (shouldRender) {
      setPhase("exit");
      const timer = window.setTimeout(() => setShouldRender(false), 180);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [open, shouldRender]);

  if (typeof document === "undefined") {
    return null;
  }

  const host = document.getElementById(TOAST_HOST_ID);

  if (!host) {
    return null;
  }

  return createPortal(
    shouldRender ? (
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto absolute left-1/2 top-4 z-[60] w-[min(100%-1.5rem,22rem)] -translate-x-1/2 transition-all duration-200 ease-[cubic-bezier(0.2,0.85,0.22,1)] ${
          phase === "exit"
            ? "-translate-y-2 scale-[0.98] opacity-0"
            : phase === "enter"
              ? "-translate-y-3 scale-[0.97] opacity-0"
              : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <div className="overflow-hidden rounded-[20px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(255,248,241,0.98)_56%,rgba(245,225,211,0.96)_100%)] shadow-[0_18px_44px_rgba(80,35,16,0.18)] backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(144,73,53,0.4),transparent)]" />
          <div className="flex items-start gap-3 px-4 py-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-white shadow-[0_8px_20px_rgba(80,35,16,0.08)] ring-1 ring-cocoa/8">
              <img src={CHEF_LOGO} alt="" className="h-9 w-9 rounded-[12px] object-cover" />
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-clay/75">Chef Balance</p>
              <h2 className="mt-1 text-[16px] font-black leading-tight text-cocoa">{title}</h2>
              <p className="mt-1 text-[13px] font-semibold leading-5 text-cocoa/68">{description}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-cocoa/55 shadow-[0_4px_12px_rgba(80,35,16,0.08)] ring-1 ring-cocoa/8 transition hover:text-cocoa"
              aria-label="Cerrar notificación"
            >
              <X size={16} strokeWidth={2.8} />
            </button>
          </div>
        </div>
      </div>
    ) : null,
    host
  );
}
