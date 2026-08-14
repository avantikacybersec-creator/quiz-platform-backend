package com.avantika.quiz_platform_backend.repository;


import com.avantika.quiz_platform_backend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long>
{
}


