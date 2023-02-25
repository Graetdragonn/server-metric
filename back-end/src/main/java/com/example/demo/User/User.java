package com.example.demo.User;

import com.example.demo.Server.Server;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnJava;

import java.util.*;

//User stores 5 variables:
//Integer id: is used as the primary key so a user can be uniquely identified.
//String userEmail: email along with password will be used for sign in and email will also be used for notifying in the future.
//String userPassword: used for verification of user at sign in.
//List Servers: contains all servers that the user is connected to. Implemented using a many-to-many relationship with servers
@Entity
public class User {
    @Id
    @Column(name = "userEmail")
    private String userEmail;
    private String userPassword;
    private UserType userType;
    private String userFirstName;
    private String userLastName;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_servers", joinColumns = @JoinColumn(name = "userEmail"), inverseJoinColumns = @JoinColumn(name = "address"))
    List<Server> servers = new ArrayList<>();

//    @ManyToOne
//    @JsonIgnore
//    private User serviceProvider;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "sp_clients")
    private Set<User> clients;

    //basic User constructor
    public User() {
    }

    //User constructor with all private variables being assigned
    public User(String userEmail, String userPassword, UserType userType, String userFirstName, String userLastName, List<Server> servers, User serviceProvider, Set<User> clients) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userType = userType;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.servers = servers;
//        this.serviceProvider = serviceProvider;
        this.clients = clients;
    }

    //getUserEmail() returns a users email
    public String getUserEmail() {
        return userEmail;
    }

    //setUserEmail() sets a users email
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    //getUserPassword() returns a users password
    public String getUserPassword() {
        return userPassword;
    }

    //setUserPassword() sets a users password
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    //getUserType() returns a users type
    public UserType getUserType() {
        return userType;
    }

    //setUserType() sets a users type
    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    //getServers() returns a list of servers connected to the user
    public List<Server> getServers() {
        return servers;
    }

    //setServers() sets a list of servers connected to the user
    public void setServers(List<Server> servers) {
        this.servers = servers;
    }

    //addServer() adds a server to the current users server list
    public void addServer(Server server){
        this.servers.add(server);
    }

    //removeServer() removes a server from the current users server list
    public void removeServer(Server server){
        this.servers.remove(server);
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public Set<User> getClients() {
        return clients;
    }

    public void setClients(Set<User> clients) {
        this.clients = clients;
    }

    public void addClient(User client){
        this.clients.add(client);
    }

    public void removeClient(User client){
        this.clients.remove(client);
    }

    public void addClients(List<User> users) {
        users.forEach((user) -> addClient(user));
    }

    public void removeClients(List<User> users) {
        users.forEach((user) -> removeClient(user));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userEmail, user.userEmail) && Objects.equals(userPassword, user.userPassword) && userType == user.userType && Objects.equals(userFirstName, user.userFirstName) && Objects.equals(userLastName, user.userLastName) && Objects.equals(servers, user.servers) && Objects.equals(clients, user.clients);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userEmail, userPassword, userType, userFirstName, userLastName, servers, clients);
    }

    @Override
    public String toString() {
        return "User{" +
                "userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userType=" + userType +
                ", userFirstName='" + userFirstName + '\'' +
                ", userLastName='" + userLastName + '\'' +
                ", servers=" + servers +
                ", clients=" + clients +
                '}';
    }


}
