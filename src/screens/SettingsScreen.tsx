import {
  Bell,
  ChevronRight,
  ChefHat,
  Lock,
  Percent,
  RadioTower,
  Shield,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { useEffect, useRef, useState } from "react";
import { RecipeToast } from "../components/RecipeToast";

export function SettingsScreen() {
  const { currentUser } = useAuth();
  const currentName = currentUser?.ownerName ?? "Usuario";
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
    <div className="-mt-7 space-y-5 pb-2">
      <section className="-mx-5 overflow-hidden rounded-b-[34px] bg-[linear-gradient(180deg,#6f341e_0%,#8a4a32_58%,#a45b3f_100%)] px-5 pb-5 pt-5 text-white shadow-card">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#efcfb4] text-[26px] font-black text-cocoa shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            {currentName.charAt(0)}
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-display text-[24px] font-bold leading-none">
              {currentName}
            </h1>
            <p className="mt-1 truncate text-[16px] font-medium text-white/92">
              {currentUser?.email}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-white/16 px-2.5 py-1 text-[11px] font-black text-white/92">
              Demo · Funcional
            </span>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
        <div className="border-b border-cocoa/8 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Percent size={18} className="text-clay" />
            <h2 className="text-[18px] font-black text-cocoa">Rentabilidad</h2>
          </div>
        </div>

        <div className="px-4 pb-4 pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-[17px] font-black leading-none text-cocoa">
                Umbral de Alerta de Margen
              </h3>
              <p className="mt-1 max-w-[210px] text-[12px] leading-5 text-cocoa/42">
                Recibirás alertas cuando el margen real de una receta sea menor a este valor.
              </p>
            </div>
            <span className="text-[18px] font-black text-clay">30%</span>
          </div>

          <button
            type="button"
            onClick={() => showToast("Umbral de alerta fuera del alcance")}
            className="mt-4 block w-full text-left"
            aria-label="Umbral de alerta"
          >
            <div className="relative h-2 rounded-full bg-[#d7d0cc]">
              <div className="absolute left-0 top-0 h-2 w-[30%] rounded-full bg-clay" />
              <div className="absolute left-[30%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#d5d2d8] bg-[#6f6871] shadow-[0_2px_6px_rgba(0,0,0,0.18)]" />
            </div>
            <div className="mt-3 flex justify-between text-[11px] font-bold text-cocoa/45">
              <span>10% (permisivo)</span>
              <span>60% (exigente)</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => showToast("Umbral de alerta fuera del alcance")}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-[14px] bg-[#d2b7ac] text-[15px] font-black text-white"
          >
            Umbral aplicado
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
        <div className="border-b border-cocoa/8 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <ChefHat size={18} className="text-clay" />
            <h2 className="text-[18px] font-black text-cocoa">
              Cálculo de Costos
            </h2>
          </div>
        </div>

        <div className="divide-y divide-cocoa/8">
          <SettingRow
            icon={<RadioTower size={18} />}
            label="Costo energético"
            helper="Se aplica 5% sobre el subtotal de insumos"
            value="5% fijo"
          />
          <SettingRow
            icon={<SlidersHorizontal size={18} />}
            label="Fórmula de precio"
            helper="Precio = Costo x (1 + Markup%)"
            value="Markup"
          />
          <SettingRow
            icon={<Lock size={18} />}
            label="Borrado de insumos"
            helper="Los insumos se dan de baja lógicamente (no se eliminan de recetas históricas)"
            value="Lógico"
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
        <div className="border-b border-cocoa/8 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-clay" />
            <h2 className="text-[18px] font-black text-cocoa">
              Notificaciones
            </h2>
          </div>
        </div>

        <div className="divide-y divide-cocoa/8">
          <ToggleRow
            label="Alertas de margen bajo"
            helper="Cuando una receta cae bajo el umbral"
            active
            onToggle={() => showToast("Cambiar alertas de margen bajo está fuera del alcance")}
          />
          <ToggleRow
            label="Recordatorio de precios"
            helper="Si un insumo no se actualiza en 7 días"
            active
            onToggle={() => showToast("Cambiar recordatorios de precios está fuera del alcance")}
          />
          <ToggleRow
            label="Push notifications"
            helper="Requiere conexión activa a internet"
            onToggle={() => showToast("Cambiar push notifications está fuera del alcance")}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
        <div className="border-b border-cocoa/8 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-clay" />
            <h2 className="text-[18px] font-black text-cocoa">
              Seguridad y Privacidad
            </h2>
          </div>
        </div>

        <div className="divide-y divide-cocoa/8">
          <ValueRow
            label="Contraseña"
            helper="Última modificación: hace 30 días"
            value="Cambiar"
          />
          <ValueRow
            label="Datos compartidos"
            helper="Tu información nunca se comparte sin autorización"
            value="Protegido"
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
        <div className="border-b border-cocoa/8 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Wifi size={18} className="text-clay" />
            <h2 className="text-[18px] font-black text-cocoa">Conectividad</h2>
          </div>
        </div>

        <div className="divide-y divide-cocoa/8">
          <ValueRow
            label="Sincronización"
            helper="OCR y sync requieren conexión activa"
            value="Automática"
          />
          <ValueRow
            label="Modo offline"
            helper="Recetas e insumos disponibles sin internet"
            value="Habilitado"
          />
        </div>
      </section>

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

function ToggleRow({
  label,
  helper,
  active,
  onToggle
}: {
  label: string;
  helper: string;
  active?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#fcf7f3]"
    >
      <div className="min-w-0">
        <h3 className="text-[15px] font-black leading-none text-cocoa">
          {label}
        </h3>
        <p className="mt-1 max-w-[230px] text-[12px] leading-5 text-cocoa/42">
          {helper}
        </p>
      </div>
      <div
        className={`relative h-7 w-12 rounded-full border transition ${
          active
            ? "border-[#9b4f36] bg-[#9b4f36]"
            : "border-[#dfd8d5] bg-[#f2efed]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition ${
            active ? "right-1" : "left-1"
          }`}
        />
      </div>
    </button>
  );
}

function ValueRow({
  label,
  helper,
  value,
}: {
  label: string;
  helper: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-4">
      <div className="min-w-0">
        <h3 className="text-[15px] font-black leading-none text-cocoa">
          {label}
        </h3>
        <p className="mt-1 max-w-[230px] text-[12px] leading-5 text-cocoa/42">
          {helper}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-full bg-[#f4f1ef] px-2.5 py-1 text-[11px] font-black text-cocoa/55">
          {value}
        </span>
        <ChevronRight size={16} className="text-cocoa/30" />
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  label,
  helper,
  value,
}: {
  icon: ReactNode;
  label: string;
  helper: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-4">
      <div className="flex min-w-0 gap-3">
        <span className="mt-0.5 shrink-0 text-clay">{icon}</span>
        <div className="min-w-0">
          <h3 className="text-[15px] font-black leading-none text-cocoa">
            {label}
          </h3>
          <p className="mt-1 max-w-[230px] text-[12px] leading-5 text-cocoa/42">
            {helper}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-full bg-[#f4f1ef] px-2.5 py-1 text-[11px] font-black text-cocoa/55">
          {value}
        </span>
        <ChevronRight size={16} className="text-cocoa/30" />
      </div>
    </div>
  );
}
