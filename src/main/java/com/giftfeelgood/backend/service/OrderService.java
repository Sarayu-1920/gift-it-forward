package com.giftfeelgood.backend.service;

import com.giftfeelgood.backend.dto.OrderRequestDto;
import com.giftfeelgood.backend.dto.OrderItemDto;
import com.giftfeelgood.backend.model.*;
import com.giftfeelgood.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final GiftRepository giftRepository;
    private final ImpactRecordRepository impactRecordRepository;

    public Order placeOrder(OrderRequestDto dto, User user) {

        Order order = new Order();

        order.setUser(user);
        order.setTotalAmount(dto.getTotalAmount());
        order.setOccasion(dto.getOccasion());

        order.setSenderName(user.getName());
        order.setReceiverName(dto.getFullName());

        if (Boolean.TRUE.equals(dto.getGiftSelf())) {
            order.setReceiverName(user.getName());
        }

        order.setPersonalMessage(dto.getPersonalMessage());
        order.setDeliveryDate(dto.getDeliveryDate());

        order.setPhone(dto.getPhone());
        order.setAddress(dto.getAddress());
        order.setCity(dto.getCity());
        order.setState(dto.getState());
        order.setPincode(dto.getPincode());

        order.setPaymentMethod(dto.getPaymentMethod());
        order.setOrderDate(LocalDateTime.now());

        // Items
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemDto itemDto : dto.getItems()) {
            Gift gift = giftRepository.findById(itemDto.getGiftId())
                    .orElseThrow(() -> new RuntimeException("Gift not found"));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setGift(gift);
            item.setQuantity(itemDto.getQuantity());

            orderItems.add(item);
        }

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // Impact
        String cause = mapOccasionToCause(dto.getOccasion());
        Double impactAmount = savedOrder.getTotalAmount() * 0.1;

        ImpactRecord impact = new ImpactRecord();
        impact.setOrder(savedOrder);
        impact.setCause(cause);
        impact.setImpactAmount(impactAmount);

        impactRecordRepository.save(impact);

        return savedOrder;
    }

    private String mapOccasionToCause(String occasion) {
        return switch (occasion.toLowerCase()) {
            case "birthday" -> "Children's Education";
            case "anniversary" -> "Tree Plantation";
            case "wedding" -> "Clean Water";
            case "graduation" -> "Skill Development";
            case "festival" -> "Hunger Relief";
            case "thank you" -> "Women Empowerment";
            case "farewell" -> "Elder Care";
            case "baby shower" -> "Child Health";
            default -> "General Cause";
        };
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<ImpactRecord> getImpactByOrder(Long orderId) {
        return impactRecordRepository.findByOrderId(orderId);
    }

}