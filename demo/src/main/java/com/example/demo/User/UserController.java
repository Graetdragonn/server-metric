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
    @GetMapping("getUserByID/{userID}")
    public Optional<User> getUser(@PathVariable("userID") Integer userID) {
        return userService.getUser(userID);
    }

    //this mapping gets all users connected to a specific server using the servers ID
    @GetMapping("getAllUsersConnectedToServer/{serverID}")
    public List<User> getAllUsersConnectedToServer(@PathVariable("serverID") int serverID){
        return userService.getAllUsersConnectedToServer(serverID);
    }

    //this mapping adds a user
    @PostMapping("addUser")
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    //this mapping deletes a user using a users id
    @DeleteMapping("deleteUser/{userID}")
    public void deleteUser(@PathVariable("userID") Integer userID){
        userService.deleteUser(userID);
    }

    //this mapping updates a user using a specific users id
    @PutMapping("updateUser/{userID}")
    public void updateUser(@PathVariable("userID") Integer userID, @RequestBody User user){
        userService.updateUser(userID, user);
    }

    //this mapping adds a server to the current user server list using a specific users id
    @PostMapping("{userID}/addServer")
    public void addServerToUser(@PathVariable("userID") Integer userID, @RequestBody Server server){
        userService.addServer(userID, server);
    }

    //this mapping removes a server from the current user server list using a specific user id
    @DeleteMapping("{userID}/removeServer")
    public void removeServerFromUser(@PathVariable("userID") Integer userID, @RequestBody Server server){
        userService.removeServer(userID, server);
    }
}
