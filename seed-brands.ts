import { resetBrands, seedBrands } from "@/lib/seeds/brands";

// CLI entry: `npm run seed:brands` deletes the client logos, then uploads them again.
await resetBrands();
await seedBrands();
process.exit(0);
