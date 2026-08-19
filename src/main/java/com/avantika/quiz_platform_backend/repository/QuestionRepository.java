package com.avantika.quiz_platform_backend.repository;


import com.avantika.quiz_platform_backend.entity.Question;
import com.avantika.quiz_platform_backend.entity.Quiz;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    List<Question> findByQuiz(Quiz quiz);

    List<Question> findByQuizId(Long quizId);
}