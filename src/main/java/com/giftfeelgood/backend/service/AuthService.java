package com.giftfeelgood.backend.service;

import com.giftfeelgood.backend.dto.*;
import com.giftfeelgood.backend.model.User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public AuthResponse login(LoginRequest request) {
        // temporary mock (we’ll connect DB later)
        User user = new User();
        user.setId(1L);
        user.setName("Demo User");
        user.setEmail(request.getEmail());
        user.setRole("USER");

        String token = "mock-jwt-token";

        return new AuthResponse(token, user);
    }

    public AuthResponse signup(SignupRequest request) {
        // temporary mock
        User user = new User();
        user.setId(1L);
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole("USER");

        String token = "mock-jwt-token";

        return new AuthResponse(token, user);
    }
}