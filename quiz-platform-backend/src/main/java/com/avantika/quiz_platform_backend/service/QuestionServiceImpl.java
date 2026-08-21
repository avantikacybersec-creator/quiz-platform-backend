package com.avantika.quiz_platform_backend.service;


import com.avantika.quiz_platform_backend.entity.Question;
import com.avantika.quiz_platform_backend.entity.Quiz;
import com.avantika.quiz_platform_backend.repository.QuestionRepository;
import com.avantika.quiz_platform_backend.repository.QuizRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    public QuestionServiceImpl(
            QuestionRepository questionRepository,
            QuizRepository quizRepository
    ) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public Question createQuestion(
            String questionText,
            String optionA,
            String optionB,
            String optionC,
            String optionD,
            String correctAnswer,
            Long quizId
    ) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() ->
                        new RuntimeException("Quiz not found")
                );

        Question question = Question.builder()
                .questionText(questionText)
                .optionA(optionA)
                .optionB(optionB)
                .optionC(optionC)
                .optionD(optionD)
                .correctAnswer(correctAnswer)
                .quiz(quiz)
                .build();

        return questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestionsByQuizId(Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Question not found")
                );
    }

    @Override
    public void deleteQuestion(Long id) {
        Question question = getQuestionById(id);
        questionRepository.delete(question);
    }
}