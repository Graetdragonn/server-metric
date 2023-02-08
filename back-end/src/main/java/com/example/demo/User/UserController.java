package com.example.demo.User;

import com.example.demo.Server.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController (UserService userService){
        this.userService = userService;
    }

    //this mapping gets all users in the database using
    @GetMapping("getAllUsers")
    public List<User> getUsers(){
       return userService.getUsers();
    }

    //this mapping gets a single user by ID from the database
    @GetMapping("getUserByEmail/{userEmail}")
    public Optional<User> getUser(@PathVariable("userEmail") String userEmail) {
        return userService.getUser(userEmail);
    }

    //this mapping gets all users connected to a specific server using the servers ID
    @GetMapping("getAllUsersConnectedToServer/{serverAddress}")
    public List<User> getAllUsersConnectedToServer(@PathVariable("serverAddress") String serverAddress){
        return userService.getAllUsersConnectedToServer(serverAddress);
    }

    //this mapping adds a user
    @PostMapping("addUser")
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    //this mapping deletes a user using a users id
    @DeleteMapping("deleteUser/{userEmail}")
    public void deleteUser(@PathVariable("userEmail") String userEmail){
        userService.deleteUser(userEmail);
    }

    //this mapping updates a user using a specific users id
    @PutMapping("updateUser/{userEmail}")
    public void updateUser(@PathVariable("userEmail") String userEmail, @RequestBody User user){
        userService.updateUser(userEmail, user);
    }

    //this mapping adds a server to the current user server list using a specific users id
    @PostMapping("{userEmail}/addServer")
    public void addServerToUser(@PathVariable("userEmail") String userEmail, @RequestBody Server server){
        userService.addServer(userEmail, server);
    }

    //this mapping removes a server from the current user server list using a specific user id
    @DeleteMapping("{userEmail}/removeServer")
    public void removeServerFromUser(@PathVariable("userEmail") String userEmail, @RequestBody Server server){
        userService.removeServer(userEmail, server);
    }
}