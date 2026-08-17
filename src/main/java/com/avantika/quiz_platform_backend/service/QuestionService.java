package com.avantika.quiz_platform_backend.service;

import com.avantika.quiz_platform_backend.entity.Question;

import java.util.List;

public interface QuestionService {

    Question createQuestion(
            String questionText,
            String optionA,
            String optionB,
            String optionC,
            String optionD,
            String correctAnswer,
            Long quizId
    );

    List<Question> getQuestionsByQuizId(Long quizId);

    Question getQuestionById(Long id);

    void deleteQuestion(Long id);
}