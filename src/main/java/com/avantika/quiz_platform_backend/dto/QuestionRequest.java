package com.avantika.quiz_platform_backend.dto;


import lombok.Data;

@Data
public class QuestionRequest {

    private String questionText;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctAnswer;

    private Long quizId;
}