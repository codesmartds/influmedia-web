// Dashed box that marks where an image goes until the asset is provided.
export function AssetPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 text-sm font-semibold uppercase tracking-widest text-white/40 ${className ?? ""}`}
    >
      {label}
    </div>
  );
}
