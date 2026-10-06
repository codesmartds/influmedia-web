"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { audienceSizes, type AudienceSize } from "./audienceSizes";

const fieldNames = ["name", "email", "phone", "country", "instagram", "tiktok", "category", "audienceSize", "message"] as const;
type Field = (typeof fieldNames)[number];

// `values` echoes the submission so the form refills after React resets it.
export type ApplyState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<Field, string>>;
  values: Record<Field, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Accept "@user", "user" or a profile URL; store a full profile URL. */
function profileUrl(value: string, network: "instagram" | "tiktok"): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const handle = value.replace(/^@/, "").replace(/\s/g, "");
  if (!/^[\w.]{2,30}$/.test(handle)) return null;
  return network === "instagram" ? `https://www.instagram.com/${handle}` : `https://www.tiktok.com/@${handle}`;
}

export async function applyAsCreator(_: ApplyState, formData: FormData): Promise<ApplyState> {
  const values = Object.fromEntries(
    fieldNames.map((name) => [name, String(formData.get(name) ?? "").trim()]),
  ) as ApplyState["values"];

  // Honeypot: a field hidden from people. Bots fill it; pretend success.
  if (formData.get("nickname")) return { status: "success", message: "", errors: {}, values };

  const payload = await getPayload({ config });
  const errors: ApplyState["errors"] = {};
  if (!values.name) errors.name = "Escribe tu nombre.";
  if (!EMAIL.test(values.email)) errors.email = "Escribe un correo válido.";
  if (!values.country) errors.country = "¿Desde qué país creas contenido?";

  const instagram = profileUrl(values.instagram, "instagram");
  const tiktok = profileUrl(values.tiktok, "tiktok");
  if (values.instagram && !instagram) errors.instagram = "Revisa tu usuario, por ejemplo @tuusuario.";
  if (values.tiktok && !tiktok) errors.tiktok = "Revisa tu usuario, por ejemplo @tuusuario.";
  if (!values.instagram && !values.tiktok) errors.instagram = "Comparte al menos tu Instagram o tu TikTok.";

  const category = values.category
    ? await payload.find({ collection: "categories", where: { id: { equals: values.category } }, limit: 1 }).catch(() => null)
    : null;
  if (!category?.docs[0]) errors.category = "Elige tu categoría principal.";
  if (!audienceSizes.some((a) => a.value === values.audienceSize)) errors.audienceSize = "Elige un rango de seguidores.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  await payload.create({
    collection: "creator-applications",
    data: {
      name: values.name,
      email: values.email.toLowerCase(),
      phone: values.phone || null,
      country: values.country,
      instagram,
      tiktok,
      category: category!.docs[0].id,
      audienceSize: values.audienceSize as AudienceSize,
      message: values.message || null,
    },
  });

  return {
    status: "success",
    message: `¡Gracias, ${values.name.split(" ")[0]}! Revisaremos tu perfil y te escribiremos si encaja con lo que buscan nuestras marcas.`,
    errors: {},
    values,
  };
}
