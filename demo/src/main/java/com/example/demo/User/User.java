package com.example.demo.User;

import com.example.demo.Server.Server;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_servers", joinColumns = @JoinColumn(name = "userEmail"), inverseJoinColumns = @JoinColumn(name = "address"))
    List<Server> servers = new ArrayList<>();

    //basic User constructor
    public User() {
    }

    //User constructor with all private variables being assigned
    public User(String userEmail, String userPassword, UserType userType, List<Server> servers) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userType = userType;
        this.servers = servers;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userEmail, user.userEmail) && Objects.equals(userPassword, user.userPassword) && userType == user.userType && Objects.equals(servers, user.servers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userEmail, userPassword, userType, servers);
    }

    @Override
    public String toString() {
        return "User{" +
                "userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userType=" + userType +
                ", servers=" + servers +
                '}';
    }
}
