"use client";

import { useActionState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { subscribe, type SubscribeState } from "./actions";

const initial: SubscribeState = { status: "idle", message: "", email: "" };

// Email-only newsletter banner, above the footer on the home page.
export function NewsletterBar() {
  const [state, action, pending] = useActionState(subscribe, initial);
  const error = state.status === "error";

  return (
    <section aria-labelledby="newsletter-title" className="mx-auto w-full max-w-[96rem] px-6 py-14 md:px-[4.7%]">
      <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-primary to-[#8c5cff] p-8 text-primary-content md:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="newsletter-title" className="text-2xl font-bold md:text-3xl">
            ¡Sigamos creando juntos!
          </h2>
          <p className="mt-1 text-primary-content/85">Ideas y tendencias de influencer marketing en tu correo.</p>
        </div>

        {state.status === "success" ? (
          <p role="status" className="flex items-center gap-2 font-bold">
            <FiCheckCircle aria-hidden className="text-xl" />
            {state.message}
          </p>
        ) : (
          <form action={action} noValidate className="w-full lg:max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
                defaultValue={state.email}
                aria-invalid={error}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="input h-12 flex-1 rounded-xl border-white/40 bg-white/10 text-primary-content placeholder:text-primary-content/60 focus:border-white aria-[invalid=true]:border-[#ffd1da]"
              />
              <button type="submit" disabled={pending} className="btn h-12 rounded-xl border-0 bg-white px-6 uppercase text-[#14102b] hover:bg-white/90">
                {pending ? "…" : <>Suscribirme <FiArrowRight aria-hidden /></>}
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 text-sm font-bold text-[#ffd1da]">
                {state.message}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
