package com.giftfeelgood.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class OrderRequestDto {

    private Long userId;

    private List<OrderItemDto> items;

    private Double totalAmount;

    private String fullName;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;

    private String paymentMethod;

    private String occasion;
    private String personalMessage;
    private LocalDate deliveryDate;

    private Boolean giftSelf;
}