"use server";

import { getPayload } from "payload";
import config from "@payload-config";

// `email` echoes the submission so the input refills after React resets it.
export type SubscribeState = { status: "idle" | "success" | "error"; message: string; email: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(_: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) {
    return { status: "error", message: "Escribe un correo válido, por ejemplo nombre@empresa.com.", email };
  }

  const payload = await getPayload({ config });
  const existing = await payload.find({ collection: "subscribers", where: { email: { equals: email } }, limit: 1 });
  // Already subscribed reads as success: no reason to reveal who is on the list.
  if (!existing.docs[0]) await payload.create({ collection: "subscribers", data: { email, source: "home" } });

  return { status: "success", message: "¡Listo! Te escribiremos con lo próximo que estemos conversando.", email };
}
