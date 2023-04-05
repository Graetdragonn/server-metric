package com.example.demo.User;

import com.example.demo.Server.Server;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

//User stores 5 variables:
//Integer id: is used as the primary key so a user can be uniquely identified.
//String userEmail: email along with password will be used for sign in and email will also be used for notifying in the future.
//String userPassword: used for verification of user at sign in.
//List Servers: contains all servers that the user is connected to. Implemented using a many-to-many relationship with servers
@Entity
public class User implements UserDetails {
    @Id
    @Column(name = "userEmail")
    private String username;
    @Column(name = "userPassword")
    private String password;
    @Enumerated(EnumType.STRING)
    private UserType userType;
    private String userFirstName;
    private String userLastName;
    private String phoneNumber;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_servers", joinColumns = @JoinColumn(name = "userEmail"), inverseJoinColumns = @JoinColumn(name = "address"))
    List<Server> servers;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "sp_clients")
    private List<User> clients;

    //basic User constructor
    public User() {
    }

    //User constructor with all private variables being assigned
    public User(String username, String password, UserType userType, String userFirstName, String userLastName, String phoneNumber, List<Server> servers, List<User> clients) {
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.phoneNumber = phoneNumber;
        this.servers = servers;
        this.clients = clients;
    }

    public User(String username, String password, UserType userType, String userFirstName, String userLastName, String phoneNumber) {
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.phoneNumber = phoneNumber;
    }

    //getUserEmail() returns a users email
    @Override
    public String getUsername() {
        return username;
    }

    //setUserEmail() sets a users email
    public void setUsername(String userEmail) {
        this.username = userEmail;
    }

    //getUserPassword() returns a users password
    @Override
    public String getPassword() {
        return password;
    }

    //setUserPassword() sets a users password
    public void setPassword(String userPassword) {
        this.password = userPassword;
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
        servers.remove(server);
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<User> getClients() {
        return clients;
    }

    public void setClients(List<User> clients) {
        this.clients = clients;
    }

    public void addClientToUser(User client){
        this.clients.add(client);
    }

    public void removeClientFromUser(User client){
        clients.remove(client);
    }

    public void addClientsToUser(List<User> users) {
        clients.addAll(users);
    }

    public void removeClientsFromUser(List<User> users) {
        for (User user : users) {
            clients.remove(user);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password, userType, userFirstName, userLastName, servers, clients);
    }

    @Override
    public String toString() {
        return "User{" +
                "userEmail='" + username + '\'' +
                ", userPassword='" + password + '\'' +
                ", userType=" + userType +
                ", userFirstName='" + userFirstName + '\'' +
                ", userLastName='" + userLastName + '\'' +
                ", servers=" + servers +
                ", clients=" + clients +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
