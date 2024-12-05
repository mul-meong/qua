"use client";

import { useSearchParams } from "next/navigation";
import { useGetFeedsInfiniteQuery } from "@/hooks";
import { FeedCardArticle } from "@/components/feed/organisms/FeedCardArticle";
import type { GetFeedsReq } from "@/types/feed/feed-read-service";
import { FeedListOptionGroup } from "../organisms/FeedListOptionGroup";

export default function FeedListSection() {
  const searchParams = useSearchParams();

  const sortBy: GetFeedsReq["sortBy"] =
    searchParams.get("sortBy") === "likes" ? "likes" : "latest";

  const { data } = useGetFeedsInfiniteQuery({ sortBy });

  return (
    <div className="relative pt-[5rem]">
      <FeedListOptionGroup />
      <section className="flex flex-col pb-16 md:pb-16 md:pt-0">
        {data?.pages.map((page) =>
          page.content.map((feed) => (
            <FeedCardArticle key={feed.feedUuid} {...feed} />
          )),
        )}
      </section>
    </div>
  );
}
