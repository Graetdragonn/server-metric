package com.example.demo.Server;
import com.example.demo.Traffic.Traffic;
import com.example.demo.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

//Servers stores 2 variables:
//Integer id: is used as the primary key so a server can be uniquely identified.
//Integer address: is the ip address of the server, which is used for connecting servers to the traffic table.
//List users: this list is used as a many-to-many relationship with servers to users
@Entity
public class Server {

    @Id
    @Column(name = "address")
    private String address;
    private String serverName = "";

    @JsonIgnore
    @ManyToMany(mappedBy = "servers", cascade = CascadeType.ALL)
    List<User> users = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    Set<Traffic> traffic;

    //basic Server constructor
    public Server() {
    }

    //Server constructor with all private variables being assigned
    public Server(String address, List<User> users){
        this.address = address;
        this.users = users;
    }
    //getAddress() returns a servers address
    public String getAddress() {
        return address;
    }

    //setAddress() sets a servers Address.
    public void setAddress(String address) {
        this.address = address;
    }

    //getUsers() returns all users connected to a server
    public List<User> getUsers() {
        return users;
    }

    //setUsers() returns all users connected to a server
    public void setUsers(List<User> users) {
        this.users = users;
    }

    //addUser() adds a user to the current list of a servers users
    public void addUser(User user){
        this.users.add(user);
    }

    //removeUser() removes a user from the current list of a servers users
    public void removeUser(User user){
        this.users.remove(user);
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Server server = (Server) o;
        return Objects.equals(address, server.address) && Objects.equals(serverName, server.serverName) && Objects.equals(users, server.users) && Objects.equals(traffic, server.traffic);
    }

    @Override
    public int hashCode() {
        return Objects.hash(address, serverName, users, traffic);
    }

    @Override
    public String toString() {
        return "Server{" +
                "address='" + address + '\'' +
                ", serverName='" + serverName + '\'' +
                ", users=" + users +
                ", traffic=" + traffic +
                '}';
    }
}
