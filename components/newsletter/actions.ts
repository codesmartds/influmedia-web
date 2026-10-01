"use server";

import { getPayload } from "payload";
import config from "@payload-config";

type Fields = { firstName: string; lastName: string; email: string; birthday: string };

// `values` echoes what was submitted: React resets the form after an action,
// so inputs refill from it instead of going blank on a validation error.
export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<keyof Fields, string>>;
  values: Fields;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(_: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const values: Fields = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    birthday: String(formData.get("birthday") ?? ""),
  };

  const errors: SubscribeState["errors"] = {};
  if (!values.firstName) errors.firstName = "Escribe tu nombre.";
  if (!values.lastName) errors.lastName = "Escribe tu apellido.";
  if (!EMAIL.test(values.email)) errors.email = "Escribe un correo válido, por ejemplo nombre@empresa.com.";
  if (values.birthday && Number.isNaN(Date.parse(values.birthday))) errors.birthday = "Revisa la fecha.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  const payload = await getPayload({ config });
  const existing = await payload.find({ collection: "subscribers", where: { email: { equals: values.email } }, limit: 1 });
  const data = {
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    birthday: values.birthday || null,
    source: "home",
  };
  // Re-subscribing updates the details. Either way it reads as success:
  // no reason to reveal who is already on the list.
  if (existing.docs[0]) await payload.update({ collection: "subscribers", id: existing.docs[0].id, data });
  else await payload.create({ collection: "subscribers", data });

  return {
    status: "success",
    message: `¡Gracias, ${values.firstName}! Te escribiremos con lo próximo que estemos conversando.`,
    errors: {},
    values,
  };
}
