import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { POSTS_PER_PAGE, topics, type TopicValue } from "@/components/blog/format";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Influlab | Influmedia",
  description: "Influlab: pruebas, datos y hallazgos de las campañas de Influmedia con creadores reales. Lo que funciona, lo que no y por qué.",
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function BlogPage({ searchParams }: PageProps<"/influlab">) {
  const params = await searchParams;
  const page = Number(first(params.page) ?? "1");
  if (!Number.isInteger(page) || page < 1) notFound();
  const rawTopic = first(params.tema);
  const topic = (topics.find((t) => t.value === rawTopic)?.value ?? null) as TopicValue | null;
  if (rawTopic && !topic) notFound();

  const payload = await getPayload({ config });
  const published: Where = { published: { equals: true } };

  // Counts per topic for the filter, from one light query.
  const all = await payload.find({ collection: "posts", where: published, select: { topic: true }, limit: 1000, depth: 0, pagination: false });
  const counts = new Map<string, number>();
  for (const p of all.docs) if (p.topic) counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1);
  const filters = [
    { id: null, name: "Todos", count: all.docs.length },
    ...topics.map((t) => ({ id: t.value, name: t.label, count: counts.get(t.value) ?? 0 })).filter((f) => f.count > 0),
  ];

  // The newest post is featured on the unfiltered first page and kept out of the grid.
  const featured =
    !topic && page === 1
      ? ((await payload.find({ collection: "posts", where: published, sort: "-publishedAt", limit: 1, depth: 1 })).docs[0] ?? null)
      : null;
  const latest = topic ? null : (await payload.find({ collection: "posts", where: published, sort: "-publishedAt", limit: 1, depth: 0 })).docs[0];
  const result = await payload.find({
    collection: "posts",
    where: {
      and: [published, ...(topic ? [{ topic: { equals: topic } }] : []), ...(latest ? [{ id: { not_equals: latest.id } }] : [])],
    },
    sort: "-publishedAt",
    limit: POSTS_PER_PAGE,
    page,
    depth: 1,
  });
  // A page past the end is a 404, not an empty grid.
  if (page > 1 && result.docs.length === 0) notFound();

  return (
    <PageTransition>
      <BlogIndex
        featured={featured}
        posts={result.docs}
        page={page}
        totalPages={result.totalPages}
        total={all.docs.length}
        topic={topic}
        filters={filters}
      />
    </PageTransition>
  );
}
