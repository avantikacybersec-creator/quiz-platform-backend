package com.avantika.quiz_platform_backend.service;


import com.avantika.quiz_platform_backend.dto.LoginRequest;
import com.avantika.quiz_platform_backend.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    String login(LoginRequest request);
}