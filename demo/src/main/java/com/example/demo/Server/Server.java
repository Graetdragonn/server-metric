package com.example.demo.Server;
import com.example.demo.User.User;
import jakarta.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
public class Server {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToMany(mappedBy = "servers")
    Set<User> users;
    private String address;

    public Server() {
    }

    public Server(Integer id, Set<User> users, String address) {
        this.id = id;
        this.users = users;
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Server server = (Server) o;
        return Objects.equals(id, server.id) && Objects.equals(users, server.users) && Objects.equals(address, server.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, users, address);
    }

    @Override
    public String toString() {
        return "Server{" +
                "id=" + id +
                ", users=" + users +
                ", address='" + address + '\'' +
                '}';
    }
}
