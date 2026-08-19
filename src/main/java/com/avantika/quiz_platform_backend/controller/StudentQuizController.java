package com.avantika.quiz_platform_backend.controller;


import com.avantika.quiz_platform_backend.entity.Quiz;
import com.avantika.quiz_platform_backend.repository.QuizRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/quizzes")
public class StudentQuizController {

    private final QuizRepository quizRepository;

    public StudentQuizController(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAvailableQuizzes() {
        return ResponseEntity.ok(
                quizRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuiz(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                quizRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Quiz not found")
                        )
        );
    }
}