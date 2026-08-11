package com.avantika.quiz_platform_backend.repository;


import com.avantika.quiz_platform_backend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long>
{
}