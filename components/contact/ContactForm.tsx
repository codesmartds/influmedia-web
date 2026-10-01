"use client";

import { useActionState, type ReactNode } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { sendContact, type ContactState } from "./actions";
import { budgets } from "./budgets";

const initial: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", company: "", email: "", website: "", budget: "", need: "", message: "" },
};

// Card-colored fields with a visible border; red when the server flags them.
const controlClass =
  "w-full rounded-xl border-white/20 bg-base-200 focus:border-secondary aria-[invalid=true]:border-error";

export function ContactForm({ needs }: { needs: string[] }) {
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-2xl bg-success/15 p-6 text-lg text-success">
        <FiCheckCircle aria-hidden className="mt-1 shrink-0 text-xl" />
        {state.message}
      </p>
    );
  }

  // Label + control + error, wired with aria attributes.
  const field = (name: keyof ContactState["values"], label: string, control: (props: object) => ReactNode, wide = false) => {
    const error = state.errors[name];
    const id = `contact-${name}`;
    return (
      <div className={`flex flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
        <label htmlFor={id} className="text-sm font-bold">
          {label}
        </label>
        {control({
          id,
          name,
          defaultValue: state.values[name],
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? `${id}-error` : undefined,
        })}
        {error && (
          <p id={`${id}-error`} className="text-sm text-error">
            {error}
          </p>
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
      {field("name", "Nombre", (p) => (
        <input {...p} type="text" required autoComplete="name" className={`input ${controlClass}`} />
      ))}
      {field("company", "Compañía", (p) => (
        <input {...p} type="text" required autoComplete="organization" className={`input ${controlClass}`} />
      ))}
      {field("email", "Correo electrónico", (p) => (
        <input {...p} type="email" required autoComplete="email" className={`input ${controlClass}`} />
      ))}
      {field("website", "Sitio web (opcional)", (p) => (
        <input {...p} type="url" inputMode="url" autoComplete="url" placeholder="empresa.com" className={`input ${controlClass}`} />
      ))}
      {field("budget", "Presupuesto", (p) => (
        <select {...p} required className={`select ${controlClass}`}>
          <option value="" disabled>
            Elige un rango
          </option>
          {budgets.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      ))}
      {field("need", "¿Qué necesitas?", (p) => (
        <select {...p} required className={`select ${controlClass}`}>
          <option value="" disabled>
            Elige una opción
          </option>
          {needs.map((need) => (
            <option key={need} value={need}>
              {need}
            </option>
          ))}
        </select>
      ))}
      {field(
        "message",
        "Mensaje",
        (p) => (
          <textarea {...p} required rows={5} placeholder="Cuéntanos sobre tu marca, objetivos y fechas." className={`textarea ${controlClass}`} />
        ),
        true,
      )}

      {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar
          <input type="text" name="nickname" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary btn-lg rounded-xl border-0 uppercase sm:col-span-2 sm:justify-self-start sm:px-12">
        {pending ? "Enviando…" : <>Enviar proyecto <FiArrowRight aria-hidden /></>}
      </button>
    </form>
  );
}
