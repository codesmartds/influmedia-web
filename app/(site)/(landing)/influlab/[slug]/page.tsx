import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { PostDetail } from "@/components/blog/PostDetail";
import { PageTransition } from "@/components/transitions/PageTransition";

async function getPost(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

export async function generateMetadata({ params }: PageProps<"/influlab/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: `${post.title} | Influmedia`, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/influlab/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const payload = await getPayload({ config });
  // Related: same topic first, then the newest others, three in all.
  const base = { published: { equals: true }, id: { not_equals: post.id } };
  const sameTopic = post.topic
    ? (await payload.find({ collection: "posts", where: { ...base, topic: { equals: post.topic } }, sort: "-publishedAt", limit: 3, depth: 1 })).docs
    : [];
  const rest = (
    await payload.find({ collection: "posts", where: { ...base, id: { not_in: [post.id, ...sameTopic.map((p) => p.id)] } }, sort: "-publishedAt", limit: 3, depth: 1 })
  ).docs;
  const more = { docs: [...sameTopic, ...rest].slice(0, 3) };

  return (
    <PageTransition>
      <PostDetail post={post} more={more.docs} />
    </PageTransition>
  );
}
