package com.avantika.quiz_platform_backend.dto;


import lombok.Data;

@Data
public class QuizRequest {

    private String title;

    private String description;

    private Long categoryId;
}
