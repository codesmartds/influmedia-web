"use client";

import { useActionState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { subscribe, type SubscribeState } from "./actions";

const initial: SubscribeState = {
  status: "idle",
  message: "",
  errors: {},
  values: { firstName: "", lastName: "", email: "", birthday: "" },
};

const fields = [
  { name: "firstName", label: "Nombre", type: "text", autoComplete: "given-name", required: true },
  { name: "lastName", label: "Apellido", type: "text", autoComplete: "family-name", required: true },
  { name: "email", label: "Correo electrónico", type: "email", autoComplete: "email", required: true },
  { name: "birthday", label: "Cumpleaños (opcional)", type: "date", autoComplete: "bday", required: false },
] as const;

// Newsletter sign-up bar, shown on the home page above the footer.
export function NewsletterBar() {
  const [state, action, pending] = useActionState(subscribe, initial);

  return (
    <section aria-labelledby="newsletter-title" className="mx-auto w-full max-w-[96rem] px-6 py-14 md:px-[4.7%]">
      <div className="grid gap-8 rounded-3xl border border-base-300 bg-base-200 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:p-12 lg:grid-cols-[0.8fr_1.6fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-bold uppercase text-secondary">Newsletter</p>
          <h2 id="newsletter-title" className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            ¡Sigamos creando juntos!
          </h2>
          <p className="mt-3 text-base-content/75">Ideas, tendencias y aprendizajes de influencer marketing en tu correo.</p>
        </div>

        {state.status === "success" ? (
          <p role="status" className="flex items-start gap-3 rounded-xl bg-success/15 p-5 text-lg text-success">
            <FiCheckCircle aria-hidden className="mt-1 shrink-0 text-xl" />
            {state.message}
          </p>
        ) : (
          <form action={action} noValidate className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const error = state.errors[field.name];
              const id = `newsletter-${field.name}`;
              return (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label htmlFor={id} className="text-sm font-bold">
                    {field.label}
                  </label>
                  <input
                    id={id}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    defaultValue={state.values[field.name]}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="input w-full rounded-xl border-white/20 bg-base-100 [color-scheme:dark] focus:border-secondary aria-[invalid=true]:border-error"
                  />
                  {error && (
                    <p id={`${id}-error`} className="text-sm text-error">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
            <button type="submit" disabled={pending} className="btn btn-primary rounded-xl border-0 uppercase sm:col-span-2 sm:justify-self-start sm:px-10">
              {pending ? "Suscribiendo…" : <>Suscribirme <FiArrowRight aria-hidden /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
