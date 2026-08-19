package com.avantika.quiz_platform_backend.service;

import com.avantika.quiz_platform_backend.dto.QuizAttemptRequest;
import com.avantika.quiz_platform_backend.dto.QuizAttemptResponse;
import com.avantika.quiz_platform_backend.entity.Question;
import com.avantika.quiz_platform_backend.entity.Quiz;
import com.avantika.quiz_platform_backend.entity.QuizAttempt;
import com.avantika.quiz_platform_backend.entity.User;
import com.avantika.quiz_platform_backend.repository.QuestionRepository;
import com.avantika.quiz_platform_backend.repository.QuizAttemptRepository;
import com.avantika.quiz_platform_backend.repository.QuizRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizAttemptServiceImpl implements QuizAttemptService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizAttemptServiceImpl(
            QuizAttemptRepository quizAttemptRepository,
            QuizRepository quizRepository,
            QuestionRepository questionRepository
    ) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public QuizAttemptResponse submitQuiz(
            QuizAttemptRequest request,
            User user
    ) {

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() ->
                        new RuntimeException("Quiz not found")
                );

        List<Question> questions =
                questionRepository.findByQuiz(quiz);

        if (questions.isEmpty()) {
            throw new RuntimeException(
                    "Quiz has no questions"
            );
        }

        int score = 0;

        for (Question question : questions) {

            String selectedAnswer =
                    request.getAnswers()
                            .get(question.getId());

            if (selectedAnswer != null &&
                    selectedAnswer.equalsIgnoreCase(
                            question.getCorrectAnswer()
                    )) {

                score++;
            }
        }

        int totalQuestions = questions.size();

        int percentage =
                (score * 100) / totalQuestions;

        QuizAttempt attempt = QuizAttempt.builder()
                .user(user)
                .quiz(quiz)
                .score(score)
                .totalQuestions(totalQuestions)
                .completedAt(
                        java.time.LocalDateTime.now()
                )
                .build();

        QuizAttempt savedAttempt =
                quizAttemptRepository.save(attempt);

        return QuizAttemptResponse.builder()
                .attemptId(savedAttempt.getId())
                .quizId(quiz.getId())
                .quizTitle(quiz.getTitle())
                .score(score)
                .totalQuestions(totalQuestions)
                .percentage(percentage)
                .build();
    }

    @Override
    public List<QuizAttempt> getMyAttempts(User user) {

        return quizAttemptRepository.findByUser(user);
    }

    @Override
    public QuizAttempt getAttemptById(Long id, User user) {

        QuizAttempt attempt = quizAttemptRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Quiz attempt not found"
                        )
                );

        if (!attempt.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return attempt;
    }
}