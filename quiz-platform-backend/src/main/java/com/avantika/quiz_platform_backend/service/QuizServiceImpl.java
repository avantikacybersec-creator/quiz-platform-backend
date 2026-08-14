package com.avantika.quiz_platform_backend.service;


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
    public Quiz createQuiz(
            String title,
            String description,
            Long categoryId
    ) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new RuntimeException("Category not found")
                );

        Quiz quiz = Quiz.builder()
                .title(title)
                .description(description)
                .category(category)
                .build();

        return quizRepository.save(quiz);
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Quiz not found")
                );
    }

    @Override
    public Quiz updateQuiz(
            Long id,
            String title,
            String description,
            Long categoryId
    ) {

        Quiz quiz = getQuizById(id);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new RuntimeException("Category not found")
                );

        quiz.setTitle(title);
        quiz.setDescription(description);
        quiz.setCategory(category);

        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        Quiz quiz = getQuizById(id);
        quizRepository.delete(quiz);
    }
}