package com.mulmeong.event.member;

import com.mulmeong.member.profile.dto.in.ProfileImgUpdateRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class MemberProfileImgUpdateEvent {
    private String memberUuid;
    private String profileImgUrl;

    public static MemberProfileImgUpdateEvent toEvent(ProfileImgUpdateRequestDto profileImgUpdateRequestDto) {
        return MemberProfileImgUpdateEvent.builder()
                .memberUuid(profileImgUpdateRequestDto.getMemberUuid())
                .profileImgUrl(profileImgUpdateRequestDto.getProfileImgUrl())
                .build();
    }
}
