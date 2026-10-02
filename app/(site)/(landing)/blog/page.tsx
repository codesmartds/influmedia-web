import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { BlogSlide } from "@/components/blog/BlogSlide";
import { POSTS_PER_PAGE } from "@/components/blog/format";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Blog | Influmedia",
};

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { page: raw } = await searchParams;
  const page = Number(Array.isArray(raw) ? raw[0] : (raw ?? "1"));
  if (!Number.isInteger(page) || page < 1) notFound();

  const payload = await getPayload({ config });
  // The newest post is featured on page 1 and kept out of the paginated grid.
  const latest = await payload.find({
    collection: "posts",
    where: { published: { equals: true } },
    sort: "-publishedAt",
    limit: 1,
    depth: 1,
  });
  const featured = latest.docs[0] ?? null;
  const result = await payload.find({
    collection: "posts",
    where: { published: { equals: true }, ...(featured && { id: { not_equals: featured.id } }) },
    sort: "-publishedAt",
    limit: POSTS_PER_PAGE,
    page,
    depth: 1,
  });
  // A page past the end is a 404, not an empty grid.
  if (page > 1 && result.docs.length === 0) notFound();

  return (
    <PageTransition>
      <BlogSlide featured={page === 1 ? featured : null} posts={result.docs} page={page} totalPages={result.totalPages} />
    </PageTransition>
  );
}
