import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { resetBrands, seedBrands } from "@/lib/seeds/brands";

// Client logos only; both require a logged-in admin.
//   POST   /api/seeds/brands   delete current logos, then upload the new ones
//   DELETE /api/seeds/brands   delete current logos only
async function auth() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  return user ? payload : null;
}

export async function POST() {
  const payload = await auth();
  if (!payload) return Response.json({ error: "No autorizado" }, { status: 401 });

  const removed = await resetBrands(payload);
  const inserted = await seedBrands(payload);
  revalidatePath("/", "layout");
  return Response.json({ ok: true, removed, inserted });
}

export async function DELETE() {
  const payload = await auth();
  if (!payload) return Response.json({ error: "No autorizado" }, { status: 401 });

  const removed = await resetBrands(payload);
  revalidatePath("/", "layout");
  return Response.json({ ok: true, removed });
}
