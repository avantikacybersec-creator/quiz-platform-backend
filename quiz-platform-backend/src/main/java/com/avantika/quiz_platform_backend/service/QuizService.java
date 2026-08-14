package com.avantika.quiz_platform_backend.service;

import com.avantika.quiz_platform_backend.entity.Quiz;

import java.util.List;

public interface QuizService {

    Quiz createQuiz(
            String title,
            String description,
            Long categoryId
    );

    List<Quiz> getAllQuizzes();

    Quiz getQuizById(Long id);

    Quiz updateQuiz(
            Long id,
            String title,
            String description,
            Long categoryId
    );

    void deleteQuiz(Long id);
}