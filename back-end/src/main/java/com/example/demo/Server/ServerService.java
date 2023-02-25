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

    public Optional<Server> getServer(String serverAddress){
        return serverRepository.findServerByAddress(serverAddress);
    }

    public void addServer(Server server){
        Optional<Server> serverOptional = serverRepository.findServerByAddress(server.getAddress());
        if(serverOptional.isPresent()){
            throw new IllegalStateException("Server is already added");
        }
        serverRepository.save(server);
    }

    public void deleteServer(String serverAddress){
        Optional<Server> serverOptional = serverRepository.findServerByAddress(serverAddress);
        if(serverOptional.isEmpty()){
            throw new IllegalStateException("No Such Server ID");
        }
        serverRepository.deleteServerByAddress(serverAddress);
    }
    @Transactional
    public void updateServer(String serverAddress, Server server) {
        Server serverUpdate = serverRepository.findServerByAddress(serverAddress).orElseThrow(()-> new IllegalStateException("Server with address " + serverAddress + " does not exist"));
        serverUpdate.setAddress(server.getAddress());
        serverUpdate.setServerName(server.getServerName());
        serverRepository.save(serverUpdate);

    }
}
