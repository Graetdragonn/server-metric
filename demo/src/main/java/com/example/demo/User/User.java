package com.example.demo.User;

import com.example.demo.Server.Server;
import jakarta.persistence.*;
import java.util.Objects;
import java.util.Set;

enum UserType {
    CLIENT, SERVICE_PROVIDER, ADMIN, SERVER_MANAGER
}
@Entity
public class User {
    @Id
    @SequenceGenerator(name = "user_id_sequence", sequenceName = "user_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_sequence")

    private Integer id;

    @ManyToMany
    @JoinTable(name = "user_servers", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "server_id"))
    Set<Server> servers;
    private String userEmail;
    private String userPassword;
    private UserType userType;

    public User() {
    }

    public User(Integer id, Set<Server> servers, String userEmail, String userPassword, UserType userType) {
        this.id = id;
        this.servers = servers;
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

    public Set<Server> getServers() {
        return servers;
    }

    public void setServers(Set<Server> servers) {
        this.servers = servers;
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

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(servers, user.servers) && Objects.equals(userEmail, user.userEmail) && Objects.equals(userPassword, user.userPassword) && userType == user.userType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, servers, userEmail, userPassword, userType);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", servers=" + servers +
                ", userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userType=" + userType +
                '}';
    }
}
