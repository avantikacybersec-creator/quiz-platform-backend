package com.avantika.quiz_platform_backend.controller;


import com.avantika.quiz_platform_backend.dto.QuizRequest;
import com.avantika.quiz_platform_backend.entity.Quiz;
import com.avantika.quiz_platform_backend.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(
            @RequestBody QuizRequest request
    ) {
        return ResponseEntity.ok(
                quizService.createQuiz(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(
                quizService.getAllQuizzes()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                quizService.getQuizById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(
            @PathVariable Long id,
            @RequestBody QuizRequest request
    ) {
        return ResponseEntity.ok(
                quizService.updateQuiz(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(
            @PathVariable Long id
    ) {
        quizService.deleteQuiz(id);

        return ResponseEntity.noContent().build();
    }
}