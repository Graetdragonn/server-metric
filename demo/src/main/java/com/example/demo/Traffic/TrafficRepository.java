package com.example.demo.Traffic;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TrafficRepository extends JpaRepository<Traffic, Integer> {
    Optional<Traffic> findTrafficById(Integer id);
}