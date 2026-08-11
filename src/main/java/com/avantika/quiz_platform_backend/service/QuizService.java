package com.avantika.quiz_platform_backend.service;

import com.avantika.quiz_platform_backend.dto.QuizRequest;
import com.avantika.quiz_platform_backend.entity.Quiz;

import java.util.List;

public interface QuizService {

    Quiz createQuiz(QuizRequest request);

    List<Quiz> getAllQuizzes();

    Quiz getQuizById(Long id);

    Quiz updateQuiz(Long id, QuizRequest request);

    void deleteQuiz(Long id);
}