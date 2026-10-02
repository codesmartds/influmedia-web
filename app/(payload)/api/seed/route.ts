import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { seed } from "@/lib/seed";

// Runs the seed in any environment. Requires a logged-in admin: Payload
// reads the session cookie (or an Authorization header) from the request.
export async function POST() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) return Response.json({ error: "No autorizado" }, { status: 401 });

  await seed();
  // The seed skips per-document revalidation; refresh every page once.
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
