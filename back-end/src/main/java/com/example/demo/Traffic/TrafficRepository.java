package com.example.demo.Traffic;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficRepository extends JpaRepository<Traffic, Integer> {
    Optional<Traffic> findTrafficById(int id);
    Optional<Traffic> findTrafficBySrcIP(String srcIP);
    Optional<Traffic> findTrafficByDstIP(String dstIP);
    Optional<Traffic> findTrafficBySrcPort(int srcPort);
    Optional<Traffic> findTrafficByDstPort(int dstPort);
}