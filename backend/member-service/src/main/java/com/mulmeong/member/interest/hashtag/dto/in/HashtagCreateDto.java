package com.mulmeong.member.interest.hashtag.dto.in;

import com.mulmeong.member.interest.hashtag.domain.InterestHashtag;
import com.mulmeong.member.interest.hashtag.vo.in.Hashtag;
import com.mulmeong.member.interest.hashtag.vo.in.HashtagCreateVo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HashtagCreateDto {

    private String memberUuid;
    private List<String> hashtagNames;

    public static HashtagCreateDto toDto(String memberUuid, HashtagCreateVo requestVo) {
        return HashtagCreateDto.builder()
                .memberUuid(memberUuid)
                // VO -> DTO : List<Hashtag> -> List<String>
                .hashtagNames(requestVo.getHashtags().stream().map(Hashtag::getName).toList())
                .build();
    }

    public List<InterestHashtag> toEntities() {
        return hashtagNames.stream()
                .map(hashtagName -> InterestHashtag.builder()
                        .memberUuid(memberUuid)
                        .hashtagName(hashtagName)
                        .build())
                .toList();
    }
}
