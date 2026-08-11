package com.avantika.quiz_platform_backend.service;


import com.avantika.quiz_platform_backend.dto.QuizRequest;
import com.avantika.quiz_platform_backend.entity.Category;
import com.avantika.quiz_platform_backend.entity.Quiz;
import com.avantika.quiz_platform_backend.repository.CategoryRepository;
import com.avantika.quiz_platform_backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final CategoryRepository categoryRepository;

    public QuizServiceImpl(
            QuizRepository quizRepository,
            CategoryRepository categoryRepository
    ) {
        this.quizRepository = quizRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Quiz createQuiz(QuizRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Quiz quiz = new Quiz();

        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCategory(category);

        return quizRepository.save(quiz);
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz getQuizById(Long id) {

        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    @Override
    public Quiz updateQuiz(Long id, QuizRequest request) {

        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCategory(category);

        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long id) {

        if (!quizRepository.existsById(id)) {
            throw new RuntimeException("Quiz not found");
        }

        quizRepository.deleteById(id);
    }
}