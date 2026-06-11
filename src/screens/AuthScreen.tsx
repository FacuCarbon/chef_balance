import { FormEvent, useState } from "react";
import { ArrowRight, ChefHat, CircleCheck, Eye } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Mode = "login" | "register";

export function AuthScreen() {
  const { currentUser, login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  if (currentUser) {
    return <Navigate to="/inicio" replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const nextError =
      mode === "login"
        ? login(email, password)
        : register({
            businessName: "Chef Balance",
            ownerName: String(formData.get("ownerName") ?? ""),
            email,
            password,
            category: "Emprendimiento gastronomico"
          });

    setError(nextError);
  }

  if (mode === "register") {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-[radial-gradient(circle_at_78%_3%,rgba(234,202,179,.9),transparent_210px),linear-gradient(180deg,#fffaf6_0%,#fffaf6_58%,#f7d7cc_100%)] px-7 pb-4 pt-[clamp(16px,3dvh,28px)]">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-biscuit text-clay">
            <ChefHat size={18} strokeWidth={2} />
          </div>
          <div>
            <p className="font-display text-[18px] font-bold leading-none text-cocoa">Chef Balance</p>
            <p className="mt-0.5 text-[11px] font-bold text-cocoa/42">Tu rentabilidad, clara y simple.</p>
          </div>
        </div>

        <section className="mt-[clamp(12px,2.5dvh,20px)]">
          <h1 className="font-display text-[26px] font-bold leading-none text-cocoa">Crear cuenta</h1>
          <p className="mt-1.5 max-w-[280px] text-[12px] font-bold leading-[1.35] text-cocoa/62">
            Empezá a conocer la rentabilidad real de tu negocio.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="mt-[clamp(12px,2.5dvh,18px)] space-y-3">
          <Field label="Nombre y apellido" name="ownerName" placeholder="Brenda Garcia" />
          <Field label="Correo Electrónico" name="email" type="email" placeholder="brenda@pasteleria.com" />
          <PasswordField
            label="Contraseña"
            name="password"
            placeholder="Mínimo 6 caracteres"
            visible={showRegisterPassword}
            onToggle={() => setShowRegisterPassword((visible) => !visible)}
          />

          {error ? (
            <p className="rounded-[14px] bg-danger/10 px-4 py-3 text-sm font-bold text-danger">{error}</p>
          ) : null}

          <p className="px-3 text-center text-[10px] font-bold leading-4 text-cocoa/36">
            Al registrarte aceptás nuestros <strong className="text-clay">Términos de Servicio.</strong> Tu
            información nunca se comparte sin tu autorización explícita.
          </p>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-[14px] bg-clay px-5 py-2.5 text-[15px] font-black text-white shadow-button transition hover:-translate-y-0.5"
          >
            <CircleCheck size={18} />
            Crear mi cuenta gratis
          </button>
        </form>

        <div className="mt-2.5 flex items-center gap-3 text-[11px] font-bold text-cocoa/35">
          <span className="h-px flex-1 bg-cocoa/10" />
          <span>o registrate con</span>
          <span className="h-px flex-1 bg-cocoa/10" />
        </div>

        <div className="mt-2 flex justify-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[13px] font-black text-cocoa shadow-card">
            G
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[13px] font-black text-cocoa shadow-card">
            f
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode("login");
          }}
          className="mt-3.5 w-full text-center text-sm font-black text-cocoa/60"
        >
          ¿Ya tenés cuenta? <span className="text-clay">Iniciar sesión</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-[radial-gradient(circle_at_54%_4%,rgba(234,202,179,.9),transparent_230px),linear-gradient(180deg,#fff8f2_0%,#f7d7cc_48%,#fffaf6_100%)] px-6 pb-7 pt-[clamp(20px,4dvh,36px)]">
      <div className="mb-[clamp(16px,3dvh,28px)] text-center">
        <div className="mx-auto grid h-[clamp(76px,12dvh,100px)] w-[clamp(76px,12dvh,100px)] place-items-center rounded-full bg-white text-clay shadow-card">
          <ChefHat className="h-[52%] w-[52%]" strokeWidth={1.9} />
        </div>
        <h1 className="mt-[clamp(14px,3dvh,22px)] font-display text-[clamp(30px,4.4dvh,38px)] font-bold leading-none">
          Chef Balance
        </h1>
        <p className="mt-2 text-[15px] font-black text-clay">Tu rentabilidad, clara y simple.</p>
      </div>

      <section className="rounded-t-[23px] border border-white/80 bg-white/85 p-5 shadow-card backdrop-blur">
        <h2 className="text-center text-[22px] font-black">¡Bienvenido!</h2>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <Field
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="brenda@pasteleria.com"
            defaultValue="brenda@pasteleria.com"
          />
          <PasswordField
            label="Contraseña"
            name="password"
            placeholder="Mínimo 6 caracteres"
            defaultValue="123456"
            visible={showLoginPassword}
            onToggle={() => setShowLoginPassword((visible) => !visible)}
          />
          {error ? (
            <p className="rounded-2xl bg-danger/10 px-4 py-3 text-sm font-bold text-danger">{error}</p>
          ) : null}
          <button
            type="submit"
            className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-2xl bg-clay px-5 py-3.5 text-base font-black text-white shadow-button transition hover:-translate-y-0.5"
          >
            Iniciar sesión
            <ArrowRight size={18} />
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode(mode === "login" ? "register" : "login");
          }}
          className="mt-4 w-full rounded-2xl border border-clay px-4 py-3 text-sm font-black text-clay transition hover:bg-biscuit/60"
        >
          Crear cuenta gratis
        </button>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-cocoa/75">{label}</span>
      <span className="mt-1.5 flex items-center rounded-2xl border border-cocoa/10 bg-white px-4 py-2">
        <input
          required
          name={name}
          type={type}
          minLength={type === "password" ? 6 : undefined}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full bg-transparent text-base font-bold text-cocoa outline-none placeholder:text-cocoa/35"
        />
      </span>
    </label>
  );
}

function PasswordField({
  label,
  name,
  placeholder,
  defaultValue,
  visible,
  onToggle
}: {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-cocoa/75">{label}</span>
      <span className="mt-1.5 flex items-center rounded-2xl border border-cocoa/10 bg-white px-4 py-2">
        <input
          required
          name={name}
          type={visible ? "text" : "password"}
          minLength={6}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full bg-transparent text-base font-bold text-cocoa outline-none placeholder:text-cocoa/35"
        />
        <button
          type="button"
          onClick={onToggle}
          className="grid h-6 w-6 shrink-0 place-items-center text-cocoa/40"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <Eye size={18} />
        </button>
      </span>
    </label>
  );
}
