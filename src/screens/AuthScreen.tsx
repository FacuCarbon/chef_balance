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
      <div className="flex min-h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_78%_3%,rgba(234,202,179,.9),transparent_210px),linear-gradient(180deg,#fffaf6_0%,#fffaf6_58%,#f7d7cc_100%)] px-7 pb-6 pt-12">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-biscuit text-clay">
            <ChefHat size={20} strokeWidth={2} />
          </div>
          <div>
            <p className="font-display text-[19px] font-bold leading-none text-cocoa">Chef Balance</p>
            <p className="mt-0.5 text-[11px] font-bold text-cocoa/42">Tu rentabilidad, clara y simple.</p>
          </div>
        </div>

        <section className="mt-8">
          <h1 className="font-display text-[29px] font-bold leading-none text-cocoa">Crear cuenta</h1>
          <p className="mt-2 max-w-[280px] text-sm font-bold leading-5 text-cocoa/62">
            Empezá a conocer la rentabilidad real de tu negocio.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
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
            className="flex w-full items-center justify-center gap-3 rounded-[14px] bg-clay px-5 py-3.5 text-base font-black text-white shadow-button transition hover:-translate-y-0.5"
          >
            <CircleCheck size={18} />
            Crear mi cuenta gratis
          </button>
        </form>

        <div className="mt-5 flex items-center gap-3 text-xs font-bold text-cocoa/35">
          <span className="h-px flex-1 bg-cocoa/10" />
          <span>o registrate con</span>
          <span className="h-px flex-1 bg-cocoa/10" />
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-sm font-black text-cocoa shadow-card">
            G
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-sm font-black text-cocoa shadow-card">
            f
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode("login");
          }}
          className="mt-5 w-full text-center text-sm font-black text-cocoa/60"
        >
          ¿Ya tenés cuenta? <span className="text-clay">Iniciar sesión</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-end overflow-hidden bg-[radial-gradient(circle_at_54%_4%,rgba(234,202,179,.9),transparent_230px),linear-gradient(180deg,#fff8f2_0%,#f7d7cc_48%,#fffaf6_100%)] px-6 pb-7 pt-12">
      <div className="mb-10 text-center">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-white text-clay shadow-card">
          <ChefHat size={58} strokeWidth={1.9} />
        </div>
        <h1 className="mt-7 font-display text-[42px] font-bold leading-none">Chef Balance</h1>
        <p className="mt-3 text-base font-black text-clay">Tu rentabilidad, clara y simple.</p>
      </div>

      <section className="rounded-t-[23px] border border-white/80 bg-white/85 p-6 shadow-card backdrop-blur">
        <h2 className="text-center text-2xl font-black">¡Bienvenido!</h2>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
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
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-clay px-5 py-4 text-base font-black text-white shadow-button transition hover:-translate-y-0.5"
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
          className="mt-6 w-full rounded-2xl border border-clay px-4 py-3 text-sm font-black text-clay transition hover:bg-biscuit/60"
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
      <span className="mt-2 flex items-center rounded-2xl border border-cocoa/10 bg-white px-4 py-3">
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
      <span className="mt-2 flex items-center rounded-2xl border border-cocoa/10 bg-white px-4 py-3">
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
