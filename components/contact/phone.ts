// The phone field accepts a plain number or a WhatsApp link (wa.me).
// Returns where the link points and how the number reads on screen.
export function phoneLink(raw: string): { href: string; label: string } {
  const value = raw.trim();
  const digits = value.replace(/\D/g, "");
  const isUrl = /^https?:\/\//.test(value);
  // Central American numbers: 3-digit country code + 8-digit local number.
  const label =
    digits.length === 11
      ? `+${digits.slice(0, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`
      : isUrl
        ? `+${digits}`
        : value;
  return { href: isUrl ? value : `tel:+${digits}`, label };
}
