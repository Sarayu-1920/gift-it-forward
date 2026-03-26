package com.giftfeelgood.backend.repository;

import com.giftfeelgood.backend.model.ImpactRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ImpactRecordRepository extends JpaRepository<ImpactRecord, Long> {
    List<ImpactRecord> findByOrderId(Long orderId);
}