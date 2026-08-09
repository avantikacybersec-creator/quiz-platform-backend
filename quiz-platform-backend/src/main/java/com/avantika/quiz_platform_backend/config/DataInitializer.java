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
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            String email = "admin@gmail.com";

            if (!userRepository.existsByEmail(email)) {

                User admin = User.builder()
                        .name("Admin")
                        .email(email)
                        .password(
                                passwordEncoder.encode("Admin@123")
                        )
                        .role(Role.ADMIN)
                        .enabled(true)
                        .build();

                userRepository.save(admin);

                System.out.println(
                        "ADMIN USER CREATED: " + email
                );
            }
        };
    }
}