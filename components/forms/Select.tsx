"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

// Custom select for the site's forms: a button that opens an animated
// listbox styled like the rest of the redesign (the native dropdown can't be
// styled). The value travels in a hidden input, so server actions read it
// like a normal field. Keyboard: ↑ ↓ Home End, Enter/Space to pick, Esc to
// close, and typing a letter jumps to the next option starting with it.

export type SelectOption = { value: string; label: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export function Select({
  id,
  name,
  options,
  placeholder,
  defaultValue = "",
  invalid = false,
  describedBy,
  className = "",
}: {
  id: string;
  name: string;
  options: SelectOption[];
  placeholder: string;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const selected = options.find((o) => o.value === value);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };
  const pick = (i: number) => {
    setValue(options[i].value);
    setOpen(false);
    button.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Escape") e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive(e.key === "Home" ? 0 : options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    } else if (e.key.length === 1) {
      // Type-ahead: next option starting with the typed character.
      const ch = e.key.toLowerCase();
      const order = [...options.slice(active + 1), ...options.slice(0, active + 1)];
      const hit = order.find((o) => o.label.toLowerCase().startsWith(ch));
      if (hit) setActive(options.indexOf(hit));
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={button}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 border-0 border-b bg-transparent py-2.5 text-left text-[17px] outline-none transition-colors ${
          invalid ? "border-error" : open ? "border-tint" : "border-[#3a3145] focus-visible:border-tint"
        }`}
      >
        <span className={`truncate ${selected ? "text-base-content" : "text-[#6f6880]"}`}>{selected?.label ?? placeholder}</span>
        <motion.span aria-hidden animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="shrink-0 text-sm text-[#a39bae]">
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 origin-top overflow-auto rounded-2xl border border-[#2a2233] bg-[#140f1a]/95 p-1.5 shadow-[0_24px_60px_rgba(0,0,0,.55)] backdrop-blur-xl"
          >
            {options.map((o, i) => {
              const isSelected = o.value === value;
              const isActive = i === active;
              return (
                <motion.li
                  key={o.value}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => pick(i)}
                  initial={reduce ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE, delay: reduce ? 0 : 0.02 * i }}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors ${
                    isActive ? "bg-tint/15 text-base-content" : "text-[#c9c2d2]"
                  }`}
                >
                  {o.label}
                  {isSelected && (
                    <span aria-hidden className="text-accent-cycle">
                      ✓
                    </span>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
