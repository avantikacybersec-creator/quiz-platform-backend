package com.avantika.quiz_platform_backend.dto;


import lombok.Data;

import java.util.Map;

@Data
public class QuizAttemptRequest {

    private Long quizId;

    /*
     * Question ID -> Selected Answer
     *
     * Example:
     * {
     *   "1": "A",
     *   "2": "C",
     *   "3": "B"
     * }
     */
    private Map<Long, String> answers;
}