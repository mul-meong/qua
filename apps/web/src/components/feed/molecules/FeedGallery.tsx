import Link from 'next/link';
import type { Feed } from '@/types/feed/feed-read-service';
import { FeedGalleryItem } from '../atoms/FeedGalleryItem';

interface FeedGalleryProps extends Pick<Feed, 'feedUuid' | 'mediaList'> {
  link?: boolean;
}

export function FeedGallery({ feedUuid, mediaList, link }: FeedGalleryProps) {
  if (mediaList.length === 0) return null;

  return (
    <div className="">
      {mediaList.map((media) => {
        if (link)
          return (
            <Link href={`/feeds/${feedUuid}`} key={media.mediaUuid}>
              <FeedGalleryItem
                media={media}
                className="rounded-lg overflow-hidden"
              />
            </Link>
          );
        return (
          <FeedGalleryItem
            key={media.mediaUuid}
            media={media}
            className="rounded-lg overflow-hidden"
          />
        );
      })}
    </div>
  );
}
