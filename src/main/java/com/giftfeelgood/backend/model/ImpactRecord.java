package com.giftfeelgood.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "impact_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImpactRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String cause;

    private Double impactAmount;
}