package com.giftfeelgood.backend.controller;

import com.giftfeelgood.backend.dto.OrderRequestDto;
import com.giftfeelgood.backend.model.ImpactRecord;
import com.giftfeelgood.backend.model.Order;
import com.giftfeelgood.backend.model.User;
import com.giftfeelgood.backend.repository.UserRepository;
import com.giftfeelgood.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private final UserRepository userRepository;

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequestDto dto,
                            Authentication authentication) {

        System.out.println("Auth object: " + authentication);

        if (authentication == null) {
            throw new RuntimeException("No authentication found!");
        }

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderService.placeOrder(dto, user);
    }

    @GetMapping("/user")
    public List<Order> getUserOrders(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderService.getOrdersByUser(user.getId());
    }

    @GetMapping("/impact/{orderId}")
    public List<ImpactRecord> getImpact(@PathVariable Long orderId) {
        return orderService.getImpactByOrder(orderId);
    }
}