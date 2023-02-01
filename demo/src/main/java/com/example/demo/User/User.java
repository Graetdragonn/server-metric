package com.example.demo.User;

import jakarta.persistence.*;

import java.util.Objects;
enum UserTypes {
    CLIENT, SERVICE_PROVIDER, ADMIN, SERVER_MANAGER
}
@Entity
public class User {
    @Id
    @SequenceGenerator(name = "user_id_sequence", sequenceName = "user_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_sequence")
    private Integer id;
    private String userEmail;
    private String userPassword;
    private UserTypes userType;

    public User() {
    }

    public User(Integer id, String userEmail, String userPassword, UserTypes userType) {
        this.id = id;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userType = userType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public UserTypes getUserType() {
        return userType;
    }

    public void setUserType(UserTypes userType) {
        this.userType = userType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(userEmail, user.userEmail) && Objects.equals(userPassword, user.userPassword) && userType == user.userType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userEmail, userPassword, userType);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userType=" + userType +
                '}';
    }
}
