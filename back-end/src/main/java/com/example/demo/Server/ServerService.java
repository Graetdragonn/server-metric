package com.example.demo.Server;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.GeoLoc.GeoService;
import com.maxmind.geoip2.exception.GeoIp2Exception;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ServerService {

    private final ServerRepository serverRepository;
    private final GeoService geoService;

    @Autowired
    public ServerService(ServerRepository serverRepository, GeoService geoService) {
        this.serverRepository = serverRepository;
        this.geoService = geoService;
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
        server.setGeolocation(geoService.getGeo(server.getAddress()));
        serverRepository.save(server);
    }

    @Transactional
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
        serverRepository.save(serverUpdate);

    }
}
