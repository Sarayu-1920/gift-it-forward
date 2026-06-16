package com.giftfeelgood.backend.model;

import jakarta.persistence.*;
import java.util.List;
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

    @ElementCollection
    private List<String> images;

    private String impactType;
    private String impactDescription;

    private boolean inStock;

//    private Double rating;
//    private Integer reviewCount;
    // Getters & Setters by Lombok
}