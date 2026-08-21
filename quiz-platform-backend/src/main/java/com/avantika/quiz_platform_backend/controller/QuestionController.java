package com.avantika.quiz_platform_backend.controller;

import com.avantika.quiz_platform_backend.dto.QuestionRequest;
import com.avantika.quiz_platform_backend.entity.Question;
import com.avantika.quiz_platform_backend.service.QuestionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(
            @RequestBody QuestionRequest request
    ) {

        Question question = questionService.createQuestion(
                request.getQuestionText(),
                request.getOptionA(),
                request.getOptionB(),
                request.getOptionC(),
                request.getOptionD(),
                request.getCorrectAnswer(),
                request.getQuizId()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(question);
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<Question>> getQuestionsByQuiz(
            @PathVariable Long quizId
    ) {

        return ResponseEntity.ok(
                questionService.getQuestionsByQuizId(quizId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                questionService.getQuestionById(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(
            @PathVariable Long id
    ) {

        questionService.deleteQuestion(id);

        return ResponseEntity.noContent().build();
    }
}