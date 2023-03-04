package com.example.demo.User;
import com.example.demo.Server.Server;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(String userEmail){
        return userRepository.findUserByUsername(userEmail);
    }

    public void addUser(User user){
        Optional<User> userOptional = userRepository.findUserByUsername(user.getUsername());
        if(userOptional.isPresent()){
            throw new IllegalStateException("Email is already taken");
        }
        user.setPassword(user.getPassword());
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String userEmail){
        Optional<User> userOptional = userRepository.findUserByUsername(userEmail);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("No Such User");
        }
        userRepository.deleteUserByUsername(userEmail);
    }
    @Transactional
    public void updateUser(String userEmail, User user) {
        User userToUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        if(user.getPassword() != null ){
            userToUpdate.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getUserType() != null) {
            userToUpdate.setUserType(user.getUserType());
        }
        if(user.getUserFirstName() != null){
            userToUpdate.setUserFirstName(user.getUserFirstName());
        }
        if(user.getUserLastName() != null){
            userToUpdate.setUserLastName(user.getUserLastName());
        }
        if(user.getServers() != null){
            userToUpdate.setServers(user.getServers());
        }
        if(user.getClients() != null){
            userToUpdate.setClients(user.getClients());
        }
        userRepository.save(userToUpdate);
    }

    public void addServer(String userEmail, Server server){
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        userUpdate.addServer(server);
        userRepository.save(userUpdate);
    }

    public void removeServer(String userEmail, Server server){
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
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

    public void addClient(String userEmail, User user) {
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        User userClient = userRepository.findUserByUsername(user.getUsername()).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        userUpdate.addClientToUser(userClient);
        userRepository.save(userUpdate);
    }

    public void removeClient(String userEmail, User user) {
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        userUpdate.removeClientFromUser(user);
        userRepository.save(userUpdate);
    }

    public void addClients(String userEmail, List<User> users) {
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        List<User> actualUsers = new ArrayList<>();
        for (User user : users) {
            User userToAdd = userRepository.findUserByUsername(user.getUsername()).orElseThrow(() -> new IllegalStateException("user with email " + userEmail + " does not exist"));
            actualUsers.add(userToAdd);
        }
        userUpdate.addClientsToUser(actualUsers);
        userRepository.save(userUpdate);
    }

    public void removeClients(String userEmail, List<User>  users) {
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
        userUpdate.removeClientsFromUser(users);
        userRepository.save(userUpdate);
    }

    public void removeClientByEmail(String userEmail, String clientEmail) {
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(() -> new IllegalStateException("user with email " + userEmail + " does not exist"));
        User client = userRepository.findUserByUsername(clientEmail).orElseThrow(() -> new IllegalStateException("user with email " + clientEmail + " does not exist"));
        userUpdate.removeClientFromUser(client);
        userRepository.save(userUpdate);
    }


    public void addClientByEmail(String userEmail, String clientEmail) {
        User userUpdate = userRepository.findUserByUsername(userEmail).orElseThrow(() -> new IllegalStateException("user with email " + userEmail + " does not exist"));
        User client = userRepository.findUserByUsername(clientEmail).orElseThrow(() -> new IllegalStateException("user with email " + clientEmail + " does not exist"));
        userUpdate.addClientToUser(client);
        userRepository.save(userUpdate);
    }
}
