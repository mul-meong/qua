package com.mulmeong.notification.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum BaseResponseStatus {
    /*
     * 응답 코드와 메시지 표준화하는 ENUM.
     * Http 상태코드, 성공 여부, 응답 메시지, 커스텀 응답 코드, 데이터를 반환.
     */

    // 200: 요청 성공.
    SUCCESS(HttpStatus.OK, true, 200, "요청에 성공하였습니다."),
    // 400 : 사용자 요청 오류
    ILLEGAL_ARGUMENT(HttpStatus.BAD_REQUEST, false, 400, "잘못된 요청입니다."),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, false, 401, "적절하지 않은 요청값입니다."),
    NO_SIGN_IN(HttpStatus.UNAUTHORIZED, false, 402, "로그인을 먼저 진행해주세요"),

    // 900 : 기타 에러
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, false, 900, "요청 처리 중 에러가 발생하였습니다."),

    NO_NOTIFICATION_STATUS(HttpStatus.BAD_REQUEST, false, 4200, "회원의 알림 상태가 존재하지 않습니다."),
    NO_NOTIFICATION_HISTORY(HttpStatus.BAD_REQUEST, false, 4201, "회원의 알림 내역이 존재하지 않습니다."),
    NO_NOTIFICATION_HISTORY_AUTHORITY(HttpStatus.BAD_REQUEST, false, 4202, "알림 내역 접근 권한이 없습니다.");

    private final HttpStatus httpStatusCode;
    private final boolean isSuccess;
    private final int code;
    private final String message;
}

