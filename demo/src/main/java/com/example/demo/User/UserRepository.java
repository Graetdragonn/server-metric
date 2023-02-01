package com.example.demo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserById(Integer id);
    Optional<User> findUserByUserEmail(String userEmail);
}
