package com.giftfeelgood.backend.controller;

import com.giftfeelgood.backend.model.Gift;
import com.giftfeelgood.backend.service.GiftService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class GiftController {

    private final GiftService giftService;

    public GiftController(GiftService giftService) {
        this.giftService = giftService;
    }

    @GetMapping
    public Page<Gift> getAllGifts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String occasion,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        return giftService.getAllGifts(category, occasion, minPrice, maxPrice, sort, page, size);
    }

    @GetMapping("/{id}")
    public Gift getGiftById(@PathVariable Long id) {
        return giftService.getGiftById(id);
    }
}