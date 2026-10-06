"use client";

import { useRef, type ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { CreatorApplicationForm } from "./CreatorApplicationForm";

// Button that opens the roster application form in a modal.
export function ApplyButton({
  categories,
  className,
  children,
}: {
  categories: { id: number; name: string }[];
  className?: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()} className={className}>
        {children}
      </button>
      <dialog ref={dialog} className="modal" aria-labelledby="apply-title">
        <div className="modal-box w-[min(48rem,94vw)] max-w-none rounded-3xl border border-base-300 bg-base-200 p-6 md:p-10">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4" aria-label="Cerrar">
              <FiX aria-hidden className="text-lg" />
            </button>
          </form>
          <p className="text-sm font-bold uppercase text-secondary">Creadores</p>
          <h2 id="apply-title" className="mt-1 text-3xl font-bold">
            Aplica al roster
          </h2>
          <p className="mb-8 mt-2 text-base-content/70">
            Revisamos cada perfil. Si encaja con lo que buscan nuestras marcas, te contactamos.
          </p>
          <CreatorApplicationForm categories={categories} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Cerrar">Cerrar</button>
        </form>
      </dialog>
    </>
  );
}
