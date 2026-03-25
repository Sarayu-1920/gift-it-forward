package com.giftfeelgood.backend.repository;

import com.giftfeelgood.backend.model.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface GiftRepository extends JpaRepository<Gift, Long>, JpaSpecificationExecutor<Gift> {
}