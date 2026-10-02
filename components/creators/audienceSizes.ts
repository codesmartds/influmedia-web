// Audience ranges for the creator application. Shared by the form and the
// collection's select so stored values always match an option.
export const audienceSizes = [
  { label: "Menos de 10K", value: "under-10k" },
  { label: "10K – 50K", value: "10k-50k" },
  { label: "50K – 100K", value: "50k-100k" },
  { label: "100K – 500K", value: "100k-500k" },
  { label: "Más de 500K", value: "over-500k" },
] as const;

export type AudienceSize = (typeof audienceSizes)[number]["value"];
