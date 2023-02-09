package com.example.demo.User;
import com.example.demo.Server.Server;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(String userEmail){
        return userRepository.findUserByUserEmail(userEmail);
    }

    public void addUser(User user){
        Optional<User> userOptional = userRepository.findUserByUserEmail(user.getUserEmail());
        if(userOptional.isPresent()){
            throw new IllegalStateException("Email is already taken");
        }
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String userEmail){
        Optional<User> userOptional = userRepository.findUserByUserEmail(userEmail);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("No Such User");
        }
        userRepository.deleteUserByUserEmail(userEmail);
    }
    @Transactional
    public void updateUser(String userEmail, User user) {
        User userUpdate = userRepository.findUserByUserEmail(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        if(user.getUserPassword() != null ){
            userUpdate.setUserPassword(user.getUserPassword());
        }
        if (user.getUserType() != null) {
            userUpdate.setUserType(user.getUserType());
        }
        if(user.getUserFirstName() != null){
            userUpdate.setUserFirstName(user.getUserFirstName());
        }
        if(user.getUserLastName() != null){
            userUpdate.setUserLastName(user.getUserLastName());
        }
        if(user.getServers() != null){
            userUpdate.setServers(user.getServers());
        }
        userRepository.save(userUpdate);
    }

    public void addServer(String userEmail, Server server){
        User userUpdate = userRepository.findUserByUserEmail(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        userUpdate.addServer(server);
        userRepository.save(userUpdate);
    }

    public void removeServer(String userEmail, Server server){
        User userUpdate = userRepository.findUserByUserEmail(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + "does not exist"));
        userUpdate.removeServer(server);
        userRepository.save(userUpdate);
    }

    public List<User> getAllUsersConnectedToServer(String serverAddress) {
        List<User> allUsers = userRepository.findAll();
        List<User> allUsersConnectedToServer = new ArrayList<>();
        for (User currentUser : allUsers) {
            for (int j = 0; j < currentUser.servers.size(); j++) {
                Server currentServer = currentUser.servers.get(j);
                if (currentServer.getAddress().equals(serverAddress)) {
                    allUsersConnectedToServer.add(currentUser);
                }
            }
        }
        return  allUsersConnectedToServer;
    }
}
