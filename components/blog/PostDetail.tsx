import Image from "next/image";
import Link from "next/link";
import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Media, Post } from "@/payload-types";
import { NewsletterBar } from "@/components/newsletter/NewsletterBar";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { slugify } from "@/lib/slug";
import { formatShortDate, readingMinutes, topicLabel } from "./format";
import { Byline, PostCard } from "./PostCard";
import { ArticleToc } from "./ArticleToc";
import { ReadingProgress } from "./ReadingProgress";
import { ShareLinks } from "./ShareLinks";

// Article body typography (no typography plugin in this project).
const bodyClass = [
  "text-lg leading-[1.75] text-[#c9c2d2]",
  "[&>*+*]:mt-6",
  "[&_h2]:mt-14 [&_h2]:scroll-mt-36 [&_h2]:font-display [&_h2]:text-[clamp(30px,3vw,42px)] [&_h2]:leading-none [&_h2]:font-semibold [&_h2]:tracking-[-0.045em] [&_h2]:text-base-content",
  "[&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-base-content",
  "[&_ul]:flex [&_ul]:flex-col [&_ul]:border-t [&_ul]:border-base-300",
  "[&_ul>li]:relative [&_ul>li]:list-none [&_ul>li]:border-b [&_ul>li]:border-base-300 [&_ul>li]:py-4 [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:top-[1.55em] [&_ul>li]:before:left-0 [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-tint",
  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:mt-2 [&_ol>li]:marker:font-mono [&_ol>li]:marker:text-tint",
  "[&_blockquote]:my-12 [&_blockquote]:border-l-2 [&_blockquote]:border-tint [&_blockquote]:py-2 [&_blockquote]:pl-7 [&_blockquote]:font-display [&_blockquote]:text-[clamp(26px,2.6vw,36px)] [&_blockquote]:leading-[1.15] [&_blockquote]:font-medium [&_blockquote]:tracking-[-0.035em] [&_blockquote]:text-base-content",
  "[&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-base-content",
].join(" ");

const wrap = "mx-auto w-full max-w-[96rem] px-5 md:px-[4%]";

type LexicalNode = { type?: string; tag?: string; text?: string; children?: LexicalNode[] };
const textOf = (node: LexicalNode): string => node.text ?? (node.children ?? []).map(textOf).join("");

/** The article's h2s, in order: they anchor the table of contents. */
function sections(content: Post["content"]) {
  const root = (content as { root?: LexicalNode }).root;
  return (root?.children ?? []).filter((n) => n.type === "heading" && n.tag === "h2").map((n) => ({ title: textOf(n), id: slugify(textOf(n)) }));
}

// Headings get an id (the slug of their text) so the table of contents can link to them.
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = (["h2", "h3", "h4"].includes(node.tag) ? node.tag : "h2") as "h2" | "h3" | "h4";
    return <Tag id={slugify(textOf(node as LexicalNode))}>{nodesToJSX({ nodes: node.children })}</Tag>;
  },
});

export function PostDetail({ post, more }: { post: Post; more: Post[] }) {
  const cover = typeof post.cover === "object" ? (post.cover as Media) : null;
  const minutes = readingMinutes(post.content);
  const topic = topicLabel(post.topic);
  const toc = sections(post.content);

  return (
    <>
      <article>
        <Reveal className={`${wrap} flex max-w-[calc(1180px+8%)] flex-col gap-7 pt-[clamp(3rem,7vw,6rem)] pb-[clamp(2.25rem,4vw,3.5rem)]`}>
          <RevealItem as="p" className="flex flex-wrap gap-2.5 font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            <Link href="/" transitionTypes={["nav-back"]} className="transition-colors hover:text-base-content">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <Link href="/influlab" transitionTypes={["nav-back"]} className="transition-colors hover:text-base-content">
              Blog
            </Link>
            {topic && (
              <>
                <span aria-hidden>/</span>
                <Link href={`/influlab?tema=${post.topic}`} transitionTypes={["nav-back"]} className="text-accent-cycle">
                  {topic}
                </Link>
              </>
            )}
          </RevealItem>
          <RevealItem as="h1" className="text-[clamp(2.1rem,5.6vw,5.4rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
            {post.title}
          </RevealItem>
          <RevealItem as="p" className="max-w-[720px] text-[clamp(18px,1.6vw,21px)] leading-normal text-[#c9c2d2]">
            {post.excerpt}
          </RevealItem>
          <RevealItem className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
            {post.author && <Byline author={post.author} size="lg" />}
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#8e86a0] uppercase">
              <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time> · {minutes} min de lectura
            </span>
          </RevealItem>
        </Reveal>

        {cover?.url && (
          <div className="relative h-[clamp(300px,46vw,640px)] overflow-hidden border-y border-base-300">
            <Image src={cover.url} alt={cover.alt} fill priority sizes="100vw" className="object-cover object-[50%_25%] brightness-[.8]" />
          </div>
        )}

        <div className={`${wrap} grid gap-[clamp(2rem,5vw,5rem)] py-[clamp(3rem,6vw,5.5rem)] lg:grid-cols-[minmax(220px,1fr)_minmax(0,2fr)]`}>
          <aside className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 1 && (
              <ArticleToc items={toc} />
            )}
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[11px] tracking-[0.14em] text-[#6f6880] uppercase">Compartir</h2>
              <ShareLinks title={post.title} />
            </div>
          </aside>

          <div className="min-w-0 max-w-[760px]">
            <ReadingProgress className={bodyClass}>
              <RichText data={post.content} converters={converters} />
            </ReadingProgress>
            {topic && (
              <p className="mt-10 flex gap-2">
                <Link
                  href={`/influlab?tema=${post.topic}`}
                  className="rounded-full border border-[#2a2233] px-3.5 py-2 font-mono text-[10.5px] tracking-[0.12em] text-[#a39bae] uppercase transition-colors hover:border-base-content hover:text-base-content"
                >
                  {topic}
                </Link>
              </p>
            )}
            {post.author && (
              <div className="mt-8 flex items-center gap-5 border border-base-300 bg-base-200 p-7">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10.5px] tracking-[0.12em] text-accent-cycle">ESCRITO POR</span>
                  <Byline author={post.author} size="lg" />
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-posts" className="border-t border-base-300">
          <Reveal className={`${wrap} flex flex-col gap-7 py-[clamp(3.5rem,7vw,6rem)]`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <RevealItem as="h2" className="text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
                <span id="more-posts">
                  Sigue <span className="text-accent-cycle">leyendo.</span>
                </span>
              </RevealItem>
              <RevealItem>
                <Link
                  href="/influlab"
                  transitionTypes={["nav-back"]}
                  className="border-b border-tint/60 pb-1 text-[15px] text-[#d6d0de] transition-colors hover:text-base-content"
                >
                  Todos los artículos
                </Link>
              </RevealItem>
            </div>
            <RevealItem as="ul" effect="fade" stagger className="grid gap-x-[3px] gap-y-10 md:grid-cols-3">
              {more.map((other) => (
                <RevealItem as="li" key={other.id}>
                  <PostCard post={other} />
                </RevealItem>
              ))}
            </RevealItem>
          </Reveal>
        </section>
      )}

      <NewsletterBar />
    </>
  );
}
