package com.example.demo.Server;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ServerRepository extends JpaRepository<Server, Integer> {
    Optional<Server> findServerByAddress(String address);
    Optional<Server> deleteServerByAddress(String address);
}
