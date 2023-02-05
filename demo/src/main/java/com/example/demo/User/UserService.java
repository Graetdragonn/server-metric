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

    public Optional<User> getUser(Integer userID){
        return userRepository.findUserById(userID);
    }

    public void addUser(User user){
        Optional<User> userOptional = userRepository.findUserByUserEmail(user.getUserEmail());
        if(userOptional.isPresent()){
            throw new IllegalStateException("Email is already taken");
        }
        userRepository.save(user);
    }

    public void deleteUser(Integer userID){
        Optional<User> userOptional = userRepository.findById(userID);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("No Such User Id");
        }
        userRepository.deleteById(userID);
    }
    @Transactional
    public void updateUser(Integer userID, User user) {
        User userUpdate = userRepository.findUserById(userID).orElseThrow(()-> new IllegalStateException("user with id" + userID + "does not exist"));
        if(user.getUserEmail() == null){
            throw new IllegalStateException("userEmail field is null");
        }else if(user.getUserPassword() == null ){
            throw new IllegalStateException("userPassword field is null");
        } else if (user.getUserType() == null) {
            throw new IllegalStateException("userType field is null");
        }
        userUpdate.setUserEmail(user.getUserEmail());
        userUpdate.setUserPassword(user.getUserPassword());
        userUpdate.setUserType(user.getUserType());
        userUpdate.setServers(user.getServers());
        userRepository.save(user);

    }

    public void addServer(Integer userID, Server server){
        User userUpdate = userRepository.findUserById(userID).orElseThrow(()-> new IllegalStateException("user with id" + userID + "does not exist"));
        userUpdate.addServer(server);
        userRepository.save(userUpdate);
    }

    public void removeServer(Integer userID, Server server){
        User userUpdate = userRepository.findUserById(userID).orElseThrow(()-> new IllegalStateException("user with id" + userID + "does not exist"));
        userUpdate.removeServer(server);
        userRepository.save(userUpdate);
    }

    public List<User> getAllUsersConnectedToServer(int serverID) {
        List<User> allUsers = userRepository.findAll();
        List<User> allUsersConnectedToServer = new ArrayList<>();
        for (User currentUser : allUsers) {
            for (int j = 0; j < currentUser.servers.size(); j++) {
                Server currentServer = currentUser.servers.get(j);
                if (currentServer.getId() == serverID) {
                    allUsersConnectedToServer.add(currentUser);
                }
            }
        }
        return  allUsersConnectedToServer;
    }
}
