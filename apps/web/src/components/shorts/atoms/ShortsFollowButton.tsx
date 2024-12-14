"use client";

import { cn } from "@repo/ui/lib/utils";
import { useSessionContext } from "@/context/SessionContext";
import {
  useFollowMutation,
  useFollowStatusQuery,
} from "@/hooks/utility-service/follow-service";

interface ShortsFollowButtonProp {
  memberUuid: string;
}

export function ShortsFollowButton({ memberUuid }: ShortsFollowButtonProp) {
  const { isAuthenticated } = useSessionContext();

  const { data: followStatus } = useFollowStatusQuery({
    targetUuid: memberUuid,
  });

  const { mutate } = useFollowMutation({
    targetUuid: memberUuid,
  });

  function handleClick() {
    if (isAuthenticated) mutate(!followStatus);
  }

  return (
    <button
      type="button"
      className={cn(
        "w-[5rem] py-[0.25rem] rounded-xl",
        followStatus
          ? "bg-[rgba(255,255,255,0.20)] text-white"
          : "bg-white text-black",
      )}
      onClick={handleClick}
    >
      {followStatus ? "구독중" : "구독"}
    </button>
  );
}
