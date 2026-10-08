"use client";

import { useActionState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { subscribe, type SubscribeState } from "./actions";

const initial: SubscribeState = { status: "idle", message: "", email: "" };

// Email-only newsletter card on the home page.
export function NewsletterBar() {
  const [state, action, pending] = useActionState(subscribe, initial);
  const error = state.status === "error";

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="mx-auto w-full max-w-[96rem] scroll-mt-24 px-5 pt-[clamp(3.5rem,7vw,6rem)] pb-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%]">
      <div className="relative grid items-end gap-[clamp(2rem,5vw,4rem)] overflow-hidden rounded-[28px] border border-[#2a2233] bg-[#140f1b] p-[clamp(1.75rem,5vw,4rem)] lg:grid-cols-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_260px_at_100%_0%,color-mix(in_srgb,var(--acc-tint)_18%,transparent),transparent_70%),radial-gradient(300px_200px_at_0%_100%,rgba(123,167,209,.08),transparent_70%)]"
        />
        <div className="relative flex flex-col gap-[22px]">
          <p className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">Newsletter</p>
          <h2 id="newsletter-title" className="text-[clamp(1.75rem,3.92vw,3.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-balance">
            ¡Sigamos creando juntos!
          </h2>
          <p className="max-w-[480px] text-[17px] leading-relaxed text-muted">
            Casos, eventos y lo que aprendemos en cada campaña, directo en tu correo.
          </p>
        </div>

        {state.status === "success" ? (
          <p role="status" className="relative flex items-center gap-2 font-medium text-accent-cycle">
            <FiCheckCircle aria-hidden className="text-xl" />
            {state.message}
          </p>
        ) : (
          <form action={action} noValidate className="relative flex flex-col gap-3.5">
            <div className="flex gap-2 rounded-full border border-[#2f2738] bg-base-100 p-1.5 has-[[aria-invalid=true]]:border-error">
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@empresa.com"
                defaultValue={state.email}
                aria-invalid={error}
                aria-describedby={error ? "newsletter-error" : "newsletter-note"}
                className="min-w-0 flex-1 bg-transparent px-[18px] py-3 text-base outline-none placeholder:text-[#6f6880]"
              />
              <button
                type="submit"
                disabled={pending}
                className="cursor-pointer rounded-full bg-base-content px-6 py-[13px] text-sm font-semibold whitespace-nowrap text-base-100 transition-colors hover:bg-accent-cycle disabled:opacity-60"
              >
                {pending ? "…" : "Suscribirme"}
              </button>
            </div>
            {error ? (
              <p id="newsletter-error" className="pl-[18px] text-[13px] text-error">
                {state.message}
              </p>
            ) : (
              <p id="newsletter-note" className="pl-[18px] text-[13px] text-[#8e86a0]">
                Puedes darte de baja cuando quieras.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
