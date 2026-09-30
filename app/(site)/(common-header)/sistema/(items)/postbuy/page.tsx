import type { Metadata } from "next";
import { PostbuySlide } from "@/components/system/postbuy/PostbuySlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Postbuy | Influmedia",
};

export default function PostbuyPage() {
  return (
    <PageTransition>
      <PostbuySlide />
    </PageTransition>
  );
}
