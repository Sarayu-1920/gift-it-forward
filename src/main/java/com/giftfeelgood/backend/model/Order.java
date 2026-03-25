package com.giftfeelgood.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // user who placed order
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double totalAmount;

    private String occasion;

    private String senderName;
    private String receiverName;

    private String personalMessage;

    private LocalDate deliveryDate;

    private Boolean giftSelf = false;

    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;

    private String paymentMethod;

    private LocalDateTime orderDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}