import type { Datetime } from "@/types/common";

export interface GetMemberProfileByNicknameReq {
  nickname: string;
}

export interface GetMemberProfileByUuidReq {
  memberUuid: string;
}

export interface GetMemberCompactProfileReq {
  memberUuid: string;
}

export interface Badge {
  badgeId: number;
  badgeName: string;
  badgeImageUrl: string;
  badgeDescription: string;
}

export interface MemberCompactProfile {
  memberUuid: string;
  nickname: string;
  profileImageUrl: string;
  point: number;
  grade: string;
  equippedBadge: Badge;
}

export interface MemberProfileStat {
  followerCount: number;
  followingCount: number;
  feedCount: number;
  shortsCount: number;
}

export interface MemberProfile extends MemberCompactProfile, MemberProfileStat {
  createdAt: Datetime;
}
