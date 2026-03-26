package com.giftfeelgood.backend.service;

import com.giftfeelgood.backend.model.Gift;
import com.giftfeelgood.backend.repository.GiftRepository;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class GiftService {

    private final GiftRepository giftRepository;

    public GiftService(GiftRepository giftRepository) {
        this.giftRepository = giftRepository;
    }

    public Page<Gift> getAllGifts(
            String category,
            String occasion,
            Double minPrice,
            Double maxPrice,
            String sort,
            int page,
            int size
    ) {

        Pageable pageable;

        if ("price_asc".equals(sort)) {
            pageable = PageRequest.of(page, size, Sort.by("price").ascending());
        } else if ("price_desc".equals(sort)) {
            pageable = PageRequest.of(page, size, Sort.by("price").descending());
        } else {
            pageable = PageRequest.of(page, size);
        }

        Specification<Gift> spec = (root, query, cb) -> cb.conjunction();

        if (category != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category"), category));
        }

        if (occasion != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("occasion"), occasion));
        }

        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        return giftRepository.findAll(spec, pageable);
    }

    public Gift getGiftById(Long id) {
        return giftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gift not found"));
    }
}