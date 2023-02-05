package com.example.demo.Server;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServerService {

    private final ServerRepository serverRepository;

    @Autowired
    public ServerService(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    public List<Server> getServers(){
        return serverRepository.findAll();
    }

    public Optional<Server> getServer(Integer serverID){
        return serverRepository.findServerById(serverID);
    }

    public void addServer(Server server){
        Optional<Server> serverOptional = serverRepository.findUserByAddress(server.getAddress());
        if(serverOptional.isPresent()){
            throw new IllegalStateException("Server is already added");
        }
        serverRepository.save(server);
    }

    public void deleteServer(Integer serverID){
        Optional<Server> serverOptional = serverRepository.findById(serverID);
        if(serverOptional.isEmpty()){
            throw new IllegalStateException("No Such Server ID");
        }
        serverRepository.deleteById(serverID);
    }
    @Transactional
    public void updateUser(Integer serverID, Server server) {
        Server serverUpdate = serverRepository.findServerById(serverID).orElseThrow(()-> new IllegalStateException("Server with id " + serverID + " does not exist"));
        if(server.getAddress() == null){
            throw new IllegalStateException("address field is null");
        }
        serverUpdate.setAddress(server.getAddress());
        serverRepository.save(server);

    }


}
