package com.avantika.quiz_platform_backend.service;

import com.avantika.quiz_platform_backend.dto.AuthResponse;
import com.avantika.quiz_platform_backend.dto.LoginRequest;
import com.avantika.quiz_platform_backend.dto.RegisterRequest;
import com.avantika.quiz_platform_backend.entity.User;
import com.avantika.quiz_platform_backend.enums.Role;
import com.avantika.quiz_platform_backend.repository.UserRepository;
import com.avantika.quiz_platform_backend.security.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public String register(RegisterRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException(
                    "Email is already registered"
            );
        }

        User user = User.builder()
                .name(request.getName().trim())
                .email(email)
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(Role.STUDENT)
                .enabled(true)
                .build();

        userRepository.save(user);

        return "Registration successful";
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                request.getPassword()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        String token =
                jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
