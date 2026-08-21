package com.avantika.quiz_platform_backend.controller;


import com.avantika.quiz_platform_backend.dto.StudentQuestionResponse;
import com.avantika.quiz_platform_backend.entity.Question;
import com.avantika.quiz_platform_backend.entity.Quiz;
import com.avantika.quiz_platform_backend.repository.QuestionRepository;
import com.avantika.quiz_platform_backend.repository.QuizRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/quizzes")
public class StudentQuestionController {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    public StudentQuestionController(
            QuestionRepository questionRepository,
            QuizRepository quizRepository
    ) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
    }

    @GetMapping("/{quizId}/questions")
    public ResponseEntity<List<StudentQuestionResponse>> getQuestions(
            @PathVariable Long quizId
    ) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() ->
                        new RuntimeException("Quiz not found")
                );

        List<Question> questions =
                questionRepository.findByQuiz(quiz);

        List<StudentQuestionResponse> response =
                questions.stream()
                        .map(question ->
                                StudentQuestionResponse.builder()
                                        .id(question.getId())
                                        .questionText(question.getQuestionText())
                                        .optionA(question.getOptionA())
                                        .optionB(question.getOptionB())
                                        .optionC(question.getOptionC())
                                        .optionD(question.getOptionD())
                                        .build()
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }
}