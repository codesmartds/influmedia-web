"use client";

import { useState, useSyncExternalStore } from "react";

const pill =
  "cursor-pointer rounded-full border border-[#2a2233] px-3.5 py-[9px] font-mono text-[11px] tracking-[0.1em] text-[#a39bae] transition-colors hover:border-base-content hover:text-base-content";

// The page URL, read from the browser after hydration ("" on the server).
const noop = () => () => {};
const useHref = () =>
  useSyncExternalStore(
    noop,
    () => window.location.href,
    () => "",
  );

export function ShareLinks({ title }: { title: string }) {
  const url = useHref();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={pill}>
        LINKEDIN
      </a>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" className={pill}>
        WHATSAPP
      </a>
      <button type="button" onClick={copy} className={pill}>
        {copied ? "COPIADO ✓" : "COPIAR LINK"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Enlace copiado" : ""}
      </span>
    </div>
  );
}
