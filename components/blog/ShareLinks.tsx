"use client";

import { useEffect, useState } from "react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiLink } from "react-icons/fi";

const btn =
  "flex size-11 cursor-pointer items-center justify-center rounded-xl border border-base-300 text-lg transition-colors hover:border-secondary hover:text-secondary";

export function ShareLinks({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-base-content/50">Compartir</span>
      <button type="button" onClick={copy} aria-label={copied ? "Enlace copiado" : "Copiar enlace"} className={btn}>
        {copied ? <FiCheck aria-hidden className="text-success" /> : <FiLink aria-hidden />}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en LinkedIn"
        className={btn}
      >
        <FaLinkedinIn aria-hidden />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir por WhatsApp"
        className={btn}
      >
        <FaWhatsapp aria-hidden />
      </a>
      <span role="status" className="sr-only">
        {copied ? "Enlace copiado" : ""}
      </span>
    </div>
  );
}
