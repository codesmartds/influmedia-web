// Budget ranges for the contact form, in USD. Shared by the form and the
// collection's select so stored values always match an option.
export const budgets = [
  { label: "Menos de $1,000", value: "under-1k" },
  { label: "$1,000 – $5,000", value: "1k-5k" },
  { label: "$5,000 – $15,000", value: "5k-15k" },
  { label: "Más de $15,000", value: "over-15k" },
  { label: "Aún no lo sé", value: "unknown" },
] as const;

export type BudgetValue = (typeof budgets)[number]["value"];
