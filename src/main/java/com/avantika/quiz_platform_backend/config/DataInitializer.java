package com.avantika.quiz_platform_backend.config;

import com.avantika.quiz_platform_backend.entity.User;
import com.avantika.quiz_platform_backend.enums.Role;
import com.avantika.quiz_platform_backend.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            String adminEmail = "admin@quiz.com";

            if (!userRepository.existsByEmail(adminEmail)) {

                User admin = User.builder()
                        .name("Quiz Admin")
                        .email(adminEmail)
                        .password(
                                passwordEncoder.encode("Admin@123")
                        )
                        .role(Role.ADMIN)
                        .enabled(true)
                        .build();

                userRepository.save(admin);

                System.out.println(
                        "Default admin account created: " + adminEmail
                );
            }
        };
    }
}