package com.mulmeong.comment.application;

import com.mulmeong.comment.common.utils.CursorPage;
import com.mulmeong.comment.dto.in.ShortsRecommentRequestDto;
import com.mulmeong.comment.dto.in.ShortsRecommentUpdateDto;
import com.mulmeong.comment.dto.out.ShortsRecommentResponseDto;

import java.util.List;

public interface ShortsRecommentService {
    void createShortsRecomment(ShortsRecommentRequestDto requestDto);

    void updateShortsRecomment(ShortsRecommentUpdateDto updateDto);

    void deleteShortsRecomment(String recommentUuid);

    CursorPage<ShortsRecommentResponseDto> getShortsRecommets(
            String commentUuid, String sortBy, Long lastId, Integer pageSize, Integer pageNo);
}