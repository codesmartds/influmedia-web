"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { budgets, type BudgetValue } from "./budgets";

const fieldNames = ["name", "company", "email", "website", "budget", "need", "message"] as const;
type Field = (typeof fieldNames)[number];

// `values` echoes the submission so the form refills after React resets it.
export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<Field, string>>;
  values: Record<Field, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(
    fieldNames.map((name) => [name, String(formData.get(name) ?? "").trim()]),
  ) as ContactState["values"];

  // Honeypot: a field hidden from people. Bots fill it; pretend success.
  if (formData.get("nickname")) {
    return { status: "success", message: "", errors: {}, values };
  }

  const payload = await getPayload({ config });
  const { needs } = await payload.findGlobal({ slug: "contact-info" });
  const needOptions = (needs ?? []).map((n) => n.name);

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Escribe tu nombre.";
  if (!values.company) errors.company = "Escribe el nombre de tu compañía.";
  if (!EMAIL.test(values.email)) errors.email = "Escribe un correo válido, por ejemplo nombre@empresa.com.";
  if (values.website && !/^(https?:\/\/)?[^\s.]+\.[^\s]+$/.test(values.website)) {
    errors.website = "Revisa la dirección, por ejemplo empresa.com.";
  }
  if (!budgets.some((b) => b.value === values.budget)) errors.budget = "Elige un rango de presupuesto.";
  if (!needOptions.includes(values.need)) errors.need = "Elige qué necesitas.";
  if (values.message.length < 10) errors.message = "Cuéntanos un poco más sobre tu proyecto.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  await payload.create({
    collection: "contact-submissions",
    data: { ...values, email: values.email.toLowerCase(), budget: values.budget as BudgetValue },
  });

  return {
    status: "success",
    message: `¡Gracias, ${values.name.split(" ")[0]}! Recibimos tu proyecto y te escribiremos pronto.`,
    errors: {},
    values,
  };
}
