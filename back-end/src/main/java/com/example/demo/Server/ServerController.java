package com.example.demo.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/v1/servers")
public class ServerController {

    private final ServerService serverService;
    @Autowired
    public ServerController (ServerService serverService){
        this.serverService = serverService;
    }

    //Returns all ip devices from database
    @GetMapping("getAllDevices")
    @CrossOrigin
    public List<Server> getDevices(){
        return serverService.getAllDevices();
    }

    //this mapping gets all servers from the database
    @GetMapping("getAllServers")
    @CrossOrigin
    public List<Server> getServers(){
        return serverService.getServers();
    }

    //this mapping gets all servers from the database
    @GetMapping("getAllRouters")
    @CrossOrigin
    public List<Server> getRouters(){
        return serverService.getRouters();
    }

    //this mapping gets a specific server by the servers id
    @GetMapping("getServerByAddress/{serverAddress}")
    @CrossOrigin
    public Optional<Server> getServer(@PathVariable("serverAddress") String serverAddress){
       return serverService.getServer(serverAddress);
    }

    //this mapping adds a server to the database
    @PostMapping("addServer")
    @CrossOrigin
    public void addServer(@RequestBody Server server){
        serverService.addServer(server);
    }

    //this mapping deletes a server from the database using the servers id
    @DeleteMapping("delete/{serverAddress}")
    @CrossOrigin
    public void deleteDevice(@PathVariable("serverAddress") String address){
        serverService.deleteDevice(address);
    }

    //this mapping updates a specific server using a servers id
    @PutMapping("update/{serverAddress}")
    @CrossOrigin
    public void updateDevice(@PathVariable("serverAddress") String address, @RequestBody Server device){
        serverService.updateDevice(address, device);
    }
}
