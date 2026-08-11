package com.avantika.quiz_platform_backend.controller;


import com.avantika.quiz_platform_backend.dto.AuthResponse;
import com.avantika.quiz_platform_backend.dto.LoginRequest;
import com.avantika.quiz_platform_backend.dto.RegisterRequest;
import com.avantika.quiz_platform_backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        String message = authService.register(request);

        return ResponseEntity.ok(
                Map.of("message", message)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}