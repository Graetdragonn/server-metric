package com.example.demo.User;

import com.example.demo.Server.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController (UserService userService){
        this.userService = userService;
    }

    //this mapping gets all users in the database using
    @GetMapping("getAllUsers")
    @CrossOrigin
    public List<User> getUsers(){
       return userService.getUsers();
    }

    //this mapping gets a single user by ID from the database
    @GetMapping("getUserByEmail/{userEmail}")
    @CrossOrigin
    public Optional<User> getUser(@PathVariable("userEmail") String userEmail) {
        return userService.getUser(userEmail);
    }

    @GetMapping("getAllUserEmails")
    @CrossOrigin
    public List<String> getAllUserEmails() {
        return userService.getAllUserEmails();
    }

    //this mapping gets all users connected to a specific server using the servers ID
    @GetMapping("getAllUsersConnectedToServer/{serverAddress}")
    @CrossOrigin
    public List<User> getAllUsersConnectedToServer(@PathVariable("serverAddress") String serverAddress){
        return userService.getAllUsersConnectedToServer(serverAddress);
    }

    //this mapping adds a user
    @PostMapping("addUser")
    @CrossOrigin
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    //this mapping deletes a user using a users id
    @DeleteMapping("deleteUser/{userEmail}")
    @CrossOrigin
    public void deleteUser(@PathVariable("userEmail") String userEmail){
        userService.deleteUser(userEmail);
    }

    //this mapping updates a user using a specific users id
    @PutMapping("updateUser/{userEmail}")
    @CrossOrigin
    public void updateUser(@PathVariable("userEmail") String userEmail, @RequestBody User user){
        userService.updateUser(userEmail, user);
    }

    //this mapping updates a user using a specific users id
    @PutMapping("updateUserPassword/{userEmail}")
    @CrossOrigin
    public void updateUserPassword(@PathVariable("userEmail") String userEmail, @RequestBody User user){
        userService.updateUserPassword(userEmail, user);
    }

    //this mapping adds a server to the current user server list using a specific users id
    @PostMapping("{userEmail}/addServer")
    @CrossOrigin
    public void addServerToUser(@PathVariable("userEmail") String userEmail, @RequestBody Server server){
        userService.addServer(userEmail, server);
    }

    //this mapping removes a server from the current user server list using a specific user id
    @DeleteMapping("{userEmail}/removeServer")
    @CrossOrigin
    public void removeServerFromUser(@PathVariable("userEmail") String userEmail, @RequestBody Server server){
        userService.removeServer(userEmail, server);
    }

    @PutMapping("{userEmail}/addClient")
    @CrossOrigin
    public void addClientToUser(@PathVariable("userEmail") String userEmail, @RequestBody User user){
        userService.addClient(userEmail, user);
    }

    @DeleteMapping("{userEmail}/removeClient")
    @CrossOrigin
    public void removeClientFromUser(@PathVariable("userEmail") String userEmail, @RequestBody User user){
        userService.removeClient(userEmail, user);
    }

    @PutMapping("{userEmail}/addClients")
    @CrossOrigin
    public void addClientsToUser(@PathVariable("userEmail") String userEmail,  @RequestBody List<User> users){
        userService.addClients(userEmail, users);
    }

    @DeleteMapping("{userEmail}/removeClients")
    @CrossOrigin
    public void removeClientsFromUser(@PathVariable("userEmail") String userEmail, @RequestBody List<User> users){
        userService.removeClients(userEmail, users);
    }

    @PutMapping("{serviceProviderEmail}/addClient/{clientEmail}")
    @CrossOrigin
    public void addClientToUserByEmail(@PathVariable("serviceProviderEmail") String userEmail, @PathVariable("clientEmail") String clientEmail){
        userService.addClientByEmail(userEmail, clientEmail);
    }
    @DeleteMapping("{serviceProviderEmail}/removeClient/{clientEmail}")
    @CrossOrigin
    public void removeClientFromUserByEmail(@PathVariable("serviceProviderEmail") String userEmail, @PathVariable("clientEmail") String clientEmail){
        userService.removeClientByEmail(userEmail, clientEmail);
    }
}
