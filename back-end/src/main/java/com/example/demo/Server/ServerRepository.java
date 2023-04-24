package com.example.demo.Server;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServerRepository extends JpaRepository<Server, Integer> {
    Optional<Server> findByAddress(String address);
    Optional<Server> deleteByAddress(String address);
    List<Server> findByDeviceType(DeviceType device);
}
