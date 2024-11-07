package com.mulmeong.comment.application;

import com.mulmeong.comment.common.exception.BaseException;
import com.mulmeong.comment.common.response.BaseResponseStatus;
import com.mulmeong.comment.dto.in.FeedRecommentRequestDto;
import com.mulmeong.comment.dto.in.FeedRecommentUpdateDto;
import com.mulmeong.comment.dto.out.FeedRecommentResponseDto;
import com.mulmeong.comment.entity.FeedRecomment;
import com.mulmeong.comment.infrastructure.FeedRecommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedRecommentServiceImpl implements FeedRecommentService {

    private final FeedRecommentRepository feedRecommentRepository;

    @Override
    public void createFeedComment(FeedRecommentRequestDto requestDto) {
        feedRecommentRepository.save(requestDto.toEntity());
    }

    @Override
    public void updateFeedComment(FeedRecommentUpdateDto updateDto) {
        FeedRecomment feedRecomment = feedRecommentRepository.findByRecommentUuid(updateDto.getRecommentUuid())
                .orElseThrow(() -> new BaseException(BaseResponseStatus.NO_EXIST_RE_COMMENT));
        feedRecommentRepository.save(updateDto.toEntity(feedRecomment));
    }

    @Override
    public void deleteFeedComment(String recommentUuid) {
        FeedRecomment feedRecomment = feedRecommentRepository.findByRecommentUuid(recommentUuid)
                .orElseThrow(() -> new BaseException(BaseResponseStatus.NO_EXIST_RE_COMMENT));
        feedRecommentRepository.delete(feedRecomment);
    }

    @Override
    public List<FeedRecommentResponseDto> getFeedRecomments(String commentUuid) {
        return feedRecommentRepository.findByCommentUuid(commentUuid).stream()
                .map(FeedRecommentResponseDto::toDto).toList();
    }
}
