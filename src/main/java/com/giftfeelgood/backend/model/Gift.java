package com.giftfeelgood.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "gifts")
public class Gift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    private String category;
    private String occasion;

    private String imageUrl;

    private String impactType;
    private String impactDescription;

    private boolean inStock;

}