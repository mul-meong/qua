import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getMemberProfileByNickname } from "@/actions/member-read-service";
import { getMemberNickname } from "@/actions/member-service";
import { options } from "@/app/api/auth/[...nextauth]/authOption";
import ProfilePage from "@/components/@new/profile/ProfilePage";

export default async function page({
  params: { nickname: _nickname },
}: {
  params: {
    nickname: string;
  };
}) {
  const nickname = decodeURI(_nickname);
  const session = await getServerSession(options);
  if (session?.user) {
    const { memberUuid } = session.user as { memberUuid: string };
    const sessionNickname = await getMemberNickname({ memberUuid });
    if (nickname === sessionNickname) redirect("/my");
  }

  const profile = await getMemberProfileByNickname({ nickname });

  return <ProfilePage {...profile} />;
}
