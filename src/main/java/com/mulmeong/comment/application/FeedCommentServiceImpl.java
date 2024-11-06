package com.mulmeong.comment.application;

import com.mulmeong.comment.common.exception.BaseException;
import com.mulmeong.comment.common.response.BaseResponseStatus;
import com.mulmeong.comment.common.utils.CursorPage;
import com.mulmeong.comment.dto.in.FeedCommentDeleteDto;
import com.mulmeong.comment.dto.in.FeedCommentRequestDto;
import com.mulmeong.comment.dto.in.FeedCommentUpdateDto;
import com.mulmeong.comment.dto.out.FeedCommentResponseDto;
import com.mulmeong.comment.entity.FeedComment;
import com.mulmeong.comment.infrastructure.FeedCommentRepository;
import com.mulmeong.comment.infrastructure.FeedCommentRepositoryCustom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class FeedCommentServiceImpl implements FeedCommentService {
    private final FeedCommentRepository feedCommentRepository;
    private final FeedCommentRepositoryCustom feedCommentRepositoryCustom;

    @Override
    public void createFeedComment(FeedCommentRequestDto requestDto) {

        feedCommentRepository.save(requestDto.toEntity());
    }

    @Override
    public void updateFeedComment(FeedCommentUpdateDto updateDto) {
        FeedComment feedComment = feedCommentRepository.findByCommentUuid(updateDto.getCommentUuid()).orElseThrow(
                () -> new BaseException(BaseResponseStatus.NO_EXIST_COMMENT));

        feedCommentRepository.save(updateDto.toEntity(feedComment));
    }

    @Override
    public void deleteFeedComment(String commentUuid) {
        FeedComment feedComment = feedCommentRepository.findByCommentUuid(commentUuid).orElseThrow(
                () -> new BaseException(BaseResponseStatus.NO_EXIST_COMMENT));

        feedCommentRepository.save(FeedCommentDeleteDto.toEntity(feedComment));
    }

    @Override
    public CursorPage<FeedCommentResponseDto> getFeedComments(String feedUuid, Integer pageSize, Integer page) {

        return feedCommentRepositoryCustom.getFeedComments(feedUuid, pageSize, page);
    }

}
