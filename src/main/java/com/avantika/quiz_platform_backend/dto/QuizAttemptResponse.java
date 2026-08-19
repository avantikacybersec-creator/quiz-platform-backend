package com.avantika.quiz_platform_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttemptResponse {

    private Long attemptId;

    private Long quizId;

    private String quizTitle;

    private Integer score;

    private Integer totalQuestions;

    private Integer percentage;
}