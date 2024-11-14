package com.mulmeong.feed.api.vo.in;

import com.mulmeong.feed.api.domain.model.Hashtag;
import java.util.List;
import lombok.Getter;

@Getter
public class UpdateFeedRequestVo {

    private String title;
    private String content;
    private Long categoryId;
    private List<Hashtag> hashtags;

}
