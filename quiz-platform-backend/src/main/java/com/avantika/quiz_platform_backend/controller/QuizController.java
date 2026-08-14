package com.avantika.quiz_platform_backend.controller;



import com.avantika.quiz_platform_backend.dto.QuizRequest;
import com.avantika.quiz_platform_backend.entity.Quiz;
import com.avantika.quiz_platform_backend.service.QuizService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(
            @RequestBody QuizRequest request
    ) {

        Quiz quiz = quizService.createQuiz(
                request.getTitle(),
                request.getDescription(),
                request.getCategoryId()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(quiz);
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {

        return ResponseEntity.ok(
                quizService.getAllQuizzes()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuiz(
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

        Quiz quiz = quizService.updateQuiz(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getCategoryId()
        );

        return ResponseEntity.ok(quiz);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(
            @PathVariable Long id
    ) {

        quizService.deleteQuiz(id);

        return ResponseEntity.noContent().build();
    }
}