package com.avantika.quiz_platform_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/api/student/test")
    public Map<String, String> studentTest() {

        return Map.of(
                "message",
                "Student access granted"
        );
    }

    @GetMapping("/api/admin/test")
    public Map<String, String> adminTest() {

        return Map.of(
                "message",
                "Admin access granted"
        );
    }
}