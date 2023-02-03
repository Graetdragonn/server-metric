package com.example.demo.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public void addUser(User user){
        Optional<User> userOptional = userRepository.findUserByUserEmail(user.getUserEmail());
        if(userOptional.isPresent()){
            throw new IllegalStateException("Email is already taken");
        }
        userRepository.save(user);
    }

    public void deleteUser(Integer userID){
        Optional<User> userOptional = userRepository.findById(userID);
        if(!userOptional.isPresent()){
            throw new IllegalStateException("No Such User Id");
        }
        userRepository.deleteById(userID);
    }
    @Transactional
    public void updateUser(Integer userID, User user) {
        User userUpdate = userRepository.findUserById(userID).orElseThrow(()-> new IllegalStateException("user with id" + userID + "does not exist"));
        userUpdate.setServers(user.getServers());
        userUpdate.setUserEmail(user.getUserEmail());
        userUpdate.setUserPassword(user.getUserPassword());
        userUpdate.setUserType(user.getUserType());
        userRepository.save(user);

    }
}
