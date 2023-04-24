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

    public List<Server> getAllDevices() {
        return serverRepository.findAll();
    }

    public List<Server> getServers(){
        return serverRepository.findByDeviceType(DeviceType.SERVER);
    }

    public List<Server> getRouters(){
        return serverRepository.findByDeviceType(DeviceType.ROUTER);
    }

    public Optional<Server> getServer(String serverAddress){
        return serverRepository.findByAddress(serverAddress);
    }

    public void addServer(Server server){
        Optional<Server> serverOptional = serverRepository.findByAddress(server.getAddress());
        if(serverOptional.isPresent()){
            throw new IllegalStateException("Server is already added");
        }
        try {
            server.setGeolocation(geoService.getGeo(server.getAddress()));
        } catch (IOException | GeoIp2Exception e) {
            e.printStackTrace();
        }
        server.setDeviceType(DeviceType.SERVER);
        serverRepository.save(server);
    }

    @Transactional
    public void deleteDevice(String address){
        Optional<Server> serverOptional = serverRepository.findByAddress(address);
        if(serverOptional.isEmpty()){
            throw new IllegalStateException("No Such Server ID");
        }
        serverRepository.deleteByAddress(address);
    }
    @Transactional
    public void updateDevice(String address, Server device) {
        Server serverUpdate = serverRepository.findByAddress(address).orElseThrow(()-> new IllegalStateException("Server with address " + address + " does not exist"));
        serverUpdate.setAddress(device.getAddress());
        serverUpdate.setDeviceType(device.getDeviceType());
        serverRepository.save(serverUpdate);

    }
}
