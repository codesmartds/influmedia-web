"use client";

import { useActionState, type ReactNode } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { applyAsCreator, type ApplyState } from "./actions";
import { audienceSizes } from "./audienceSizes";

type Field = keyof ApplyState["values"];

const initial: ApplyState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", email: "", phone: "", country: "", instagram: "", tiktok: "", category: "", audienceSize: "", message: "" },
};

// Card-colored fields with a visible border; red when the server flags them.
const controlClass =
  "w-full rounded-xl border-white/20 bg-base-200 focus:border-secondary aria-[invalid=true]:border-error";

export function CreatorApplicationForm({ categories }: { categories: { id: number; name: string }[] }) {
  const [state, action, pending] = useActionState(applyAsCreator, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-2xl bg-success/15 p-6 text-lg text-success">
        <FiCheckCircle aria-hidden className="mt-1 shrink-0 text-xl" />
        {state.message}
      </p>
    );
  }

  // Label + control + hint/error, wired with aria attributes.
  const field = (name: Field, label: string, control: (props: object) => ReactNode, opts: { wide?: boolean; hint?: string } = {}) => {
    const error = state.errors[name];
    const id = `apply-${name}`;
    const describedBy = error ? `${id}-error` : opts.hint ? `${id}-hint` : undefined;
    return (
      <div className={`flex flex-col gap-1.5 ${opts.wide ? "sm:col-span-2" : ""}`}>
        <label htmlFor={id} className="text-sm font-bold">
          {label}
        </label>
        {control({ id, name, defaultValue: state.values[name], "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
        {error ? (
          <p id={`${id}-error`} className="text-sm text-error">
            {error}
          </p>
        ) : (
          opts.hint && (
            <p id={`${id}-hint`} className="text-sm text-base-content/60">
              {opts.hint}
            </p>
          )
        )}
      </div>
    );
  };

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      {state.status === "error" && (
        <p role="alert" className="text-error sm:col-span-2">
          {state.message}
        </p>
      )}
      {field("name", "Nombre", (p) => <input {...p} type="text" required autoComplete="name" className={`input ${controlClass}`} />)}
      {field("email", "Correo electrónico", (p) => <input {...p} type="email" required autoComplete="email" className={`input ${controlClass}`} />)}
      {field("phone", "Teléfono o WhatsApp (opcional)", (p) => <input {...p} type="tel" autoComplete="tel" className={`input ${controlClass}`} />)}
      {field("country", "País", (p) => <input {...p} type="text" required autoComplete="country-name" placeholder="Guatemala" className={`input ${controlClass}`} />)}
      {field("instagram", "Instagram", (p) => <input {...p} type="text" placeholder="@tuusuario" className={`input ${controlClass}`} />, {
        hint: "Tu usuario o el enlace a tu perfil.",
      })}
      {field("tiktok", "TikTok", (p) => <input {...p} type="text" placeholder="@tuusuario" className={`input ${controlClass}`} />, {
        hint: "Al menos una de las dos redes.",
      })}
      {field("category", "Categoría principal", (p) => (
        <select {...p} required className={`select ${controlClass}`}>
          <option value="" disabled>
            Elige una categoría
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      ))}
      {field("audienceSize", "Seguidores en tu red principal", (p) => (
        <select {...p} required className={`select ${controlClass}`}>
          <option value="" disabled>
            Elige un rango
          </option>
          {audienceSizes.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      ))}
      {field(
        "message",
        "Cuéntanos sobre tu contenido (opcional)",
        (p) => <textarea {...p} rows={4} placeholder="Qué publicas, para quién y con qué marcas has trabajado." className={`textarea ${controlClass}`} />,
        { wide: true },
      )}

      {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar
          <input type="text" name="nickname" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary btn-lg rounded-xl border-0 uppercase sm:col-span-2 sm:justify-self-start sm:px-12">
        {pending ? "Enviando…" : <>Aplicar al roster <FiArrowRight aria-hidden /></>}
      </button>
    </form>
  );
}
