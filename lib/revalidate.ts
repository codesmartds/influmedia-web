import { revalidatePath } from "next/cache";
import type { PayloadRequest } from "payload";

// Content is reused across pages (logos on home and /influencer-marketing,
// categories on /talento-exclusivo, contact info in the footer…), so any change
// refreshes the whole site instead of tracking which page shows what.
// Skipped when there's no Next request to revalidate (the CLI seed).
const revalidateSite = ({ req }: { req: PayloadRequest }) => {
  if (req.context.skipRevalidate) return;
  revalidatePath("/", "layout");
};

/** afterChange + afterDelete hooks for collections. */
export const revalidateCollection = {
  afterChange: [revalidateSite],
  afterDelete: [revalidateSite],
};

/** afterChange hook for globals (they can't be deleted). */
export const revalidateGlobal = { afterChange: [revalidateSite] };
