package com.giftfeelgood.backend.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long giftId;
    private Integer quantity;
}