const tones = {
  dark: "border-white/20 text-white/40",
  // For placeholders sitting on a white surface.
  light: "border-[#14102b]/20 text-[#14102b]/40",
};

// Dashed box that marks where an image goes until the asset is provided.
export function AssetPlaceholder({
  label,
  className,
  tone = "dark",
}: {
  label: string;
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed text-sm font-semibold uppercase tracking-widest ${tones[tone]} ${className ?? ""}`}
    >
      {label}
    </div>
  );
}
