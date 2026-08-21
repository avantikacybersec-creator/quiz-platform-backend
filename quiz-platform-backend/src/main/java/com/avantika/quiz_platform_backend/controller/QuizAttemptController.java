package com.avantika.quiz_platform_backend.controller;

import com.avantika.quiz_platform_backend.dto.QuizAttemptRequest;
import com.avantika.quiz_platform_backend.dto.QuizAttemptResponse;
import com.avantika.quiz_platform_backend.entity.QuizAttempt;
import com.avantika.quiz_platform_backend.entity.User;
import com.avantika.quiz_platform_backend.repository.UserRepository;
import com.avantika.quiz_platform_backend.service.QuizAttemptService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/attempts")
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;
    private final UserRepository userRepository;

    public QuizAttemptController(
            QuizAttemptService quizAttemptService,
            UserRepository userRepository
    ) {
        this.quizAttemptService = quizAttemptService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<QuizAttemptResponse> submitQuiz(
            @RequestBody QuizAttemptRequest request,
            Authentication authentication
    ) {

        User user = getAuthenticatedUser(authentication);

        QuizAttemptResponse response =
                quizAttemptService.submitQuiz(
                        request,
                        user
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<QuizAttempt>> getMyAttempts(
            Authentication authentication
    ) {

        User user = getAuthenticatedUser(authentication);

        return ResponseEntity.ok(
                quizAttemptService.getMyAttempts(user)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizAttempt> getAttemptById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        User user = getAuthenticatedUser(authentication);

        return ResponseEntity.ok(
                quizAttemptService.getAttemptById(id, user)
        );
    }

    private User getAuthenticatedUser(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }
}