"use client";

import { useActionState, type ReactNode } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { sendContact, type ContactState } from "./actions";
import { budgets } from "./budgets";

const initial: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", company: "", email: "", website: "", budget: "", need: "", message: "" },
};

// Underlined fields on the section background; the line turns red when the server flags them.
const controlClass =
  "min-w-0 border-0 border-b border-[#3a3145] bg-transparent py-2.5 text-[17px] text-base-content outline-none transition-colors placeholder:text-[#6f6880] focus:border-tint aria-[invalid=true]:border-error";
const labelClass = "text-[13px] text-[#a39bae]";

export function ContactForm({ needs }: { needs: string[] }) {
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-2xl border border-success/40 bg-success/10 p-6 text-lg text-success">
        <FiCheckCircle aria-hidden className="mt-1 shrink-0 text-xl" />
        {state.message}
      </p>
    );
  }

  const errorText = (name: keyof ContactState["values"], id: string) =>
    state.errors[name] && (
      <p id={`${id}-error`} className="text-sm text-error">
        {state.errors[name]}
      </p>
    );

  // Label + control + error, wired with aria attributes.
  const field = (name: keyof ContactState["values"], label: string, control: (props: object) => ReactNode, wide = false) => {
    const error = state.errors[name];
    const id = `contact-${name}`;
    return (
      <div className={`flex min-w-0 flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {control({
          id,
          name,
          defaultValue: state.values[name],
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? `${id}-error` : undefined,
        })}
        {errorText(name, id)}
      </div>
    );
  };

  return (
    <form action={action} noValidate className="grid gap-x-[18px] gap-y-[22px] sm:grid-cols-2">
      {state.status === "error" && (
        <p role="alert" className="text-error sm:col-span-2">
          {state.message}
        </p>
      )}
      {field("name", "Nombre", (p) => (
        <input {...p} type="text" required autoComplete="name" className={controlClass} />
      ))}
      {field("company", "Compañía", (p) => (
        <input {...p} type="text" required autoComplete="organization" className={controlClass} />
      ))}
      {field("email", "Email", (p) => (
        <input {...p} type="email" required autoComplete="email" className={controlClass} />
      ))}
      {field("website", "Sitio web (opcional)", (p) => (
        <input {...p} type="url" inputMode="url" autoComplete="url" placeholder="https://" className={controlClass} />
      ))}
      {field(
        "budget",
        "Presupuesto",
        (p) => (
          <select {...p} required className={`${controlClass} bg-base-200`}>
            <option value="" disabled>
              Elige un rango
            </option>
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        ),
        true,
      )}

      {/* One need, picked from pills (radio inputs underneath). */}
      <fieldset
        className="flex flex-col gap-3 sm:col-span-2"
        aria-invalid={Boolean(state.errors.need)}
        aria-describedby={state.errors.need ? "contact-need-error" : undefined}
      >
        <legend className={`${labelClass} mb-3`}>¿Qué necesitas?</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((need) => (
            <label key={need} className="cursor-pointer">
              <input type="radio" name="need" value={need} required defaultChecked={state.values.need === need} className="peer sr-only" />
              <span className="block rounded-full border border-base-content/20 px-3.5 py-[9px] text-sm text-[#a39bae] transition-colors peer-checked:border-tint peer-checked:bg-tint/20 peer-checked:text-base-content peer-focus-visible:outline-2 peer-focus-visible:outline-tint hover:border-base-content/50">
                {need}
              </span>
            </label>
          ))}
        </div>
        {errorText("need", "contact-need")}
      </fieldset>

      {field(
        "message",
        "Mensaje",
        (p) => <textarea {...p} required rows={3} placeholder="Cuéntanos sobre tu marca, objetivos y fechas." className={`${controlClass} resize-y`} />,
        true,
      )}

      {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar
          <input type="text" name="nickname" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-[18px] sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-full bg-base-content px-[26px] py-4 text-[15px] font-semibold text-base-100 transition-colors hover:bg-accent-cycle disabled:opacity-60"
        >
          {pending ? "Enviando…" : "Enviar"}
        </button>
        <span className="text-[13px] text-[#8e86a0]">Respuesta en 48 horas hábiles.</span>
      </div>
    </form>
  );
}
