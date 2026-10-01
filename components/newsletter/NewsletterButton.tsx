"use client";

import { useActionState, useEffect, useRef } from "react";
import { FiArrowRight, FiCheckCircle, FiX } from "react-icons/fi";
import { subscribe, type SubscribeState } from "./actions";

const initial: SubscribeState = { status: "idle", message: "", email: "" };

// Deck-card trigger that opens the newsletter sign-up in a modal.
export function NewsletterButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [state, action, pending] = useActionState(subscribe, initial);

  useEffect(() => {
    if (state.status === "error") input.current?.focus();
  }, [state]);

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className={`cursor-pointer ${className ?? ""}`}>
        {children}
      </button>

      <dialog ref={dialog} className="modal" aria-labelledby="newsletter-title">
        <div className="modal-box max-w-lg rounded-3xl border border-base-300 bg-base-200 p-8 text-base-content shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4" aria-label="Cerrar">
              <FiX aria-hidden className="text-lg" />
            </button>
          </form>

          <p className="text-sm font-bold uppercase text-secondary">Newsletter</p>
          <h2 id="newsletter-title" className="mt-2 text-3xl font-bold leading-tight">
            Entra a la conversación.
          </h2>
          <p className="mt-3 text-base-content/75">
            Ideas, tendencias y aprendizajes de influencer marketing, directo a tu correo. Sin spam.
          </p>

          {state.status === "success" ? (
            <p role="status" className="mt-6 flex items-start gap-3 rounded-xl bg-success/15 p-4 text-success">
              <FiCheckCircle aria-hidden className="mt-0.5 shrink-0 text-xl" />
              {state.message}
            </p>
          ) : (
            <form action={action} className="mt-6 flex flex-col gap-3" noValidate>
              <label htmlFor="newsletter-email" className="text-sm font-bold">
                Correo electrónico
              </label>
              <input
                ref={input}
                // The dialog moves focus to the first [autofocus] element on open.
                autoFocus
                id="newsletter-email"
                name="email"
                defaultValue={state.email}
                type="email"
                required
                autoComplete="email"
                placeholder="nombre@empresa.com"
                aria-invalid={state.status === "error"}
                aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
                className={`input input-lg w-full rounded-xl border-base-300 bg-base-100 ${state.status === "error" ? "input-error" : ""}`}
              />
              {state.status === "error" && (
                <p id="newsletter-error" role="alert" className="text-sm text-error">
                  {state.message}
                </p>
              )}
              <button type="submit" disabled={pending} className="btn btn-primary btn-lg mt-2 rounded-xl border-0 uppercase">
                {pending ? "Suscribiendo…" : <>Suscribirme <FiArrowRight aria-hidden /></>}
              </button>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Cerrar">Cerrar</button>
        </form>
      </dialog>
    </>
  );
}
