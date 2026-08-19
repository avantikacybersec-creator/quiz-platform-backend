package com.avantika.quiz_platform_backend.service;


import com.avantika.quiz_platform_backend.dto.QuizAttemptRequest;
import com.avantika.quiz_platform_backend.dto.QuizAttemptResponse;
import com.avantika.quiz_platform_backend.entity.QuizAttempt;
import com.avantika.quiz_platform_backend.entity.User;

import java.util.List;

public interface QuizAttemptService {

    QuizAttemptResponse submitQuiz(
            QuizAttemptRequest request,
            User user
    );

    List<QuizAttempt> getMyAttempts(User user);

    QuizAttempt getAttemptById(Long id, User user);
}