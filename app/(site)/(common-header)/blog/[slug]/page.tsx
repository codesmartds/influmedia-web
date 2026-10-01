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

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: `${post.title} | Influmedia`, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const payload = await getPayload({ config });
  const more = await payload.find({
    collection: "posts",
    where: { published: { equals: true }, id: { not_equals: post.id } },
    sort: "-publishedAt",
    limit: 4,
    depth: 1,
  });

  return (
    <PageTransition>
      <PostDetail post={post} more={more.docs} />
    </PageTransition>
  );
}
