package com.example.demo.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/servers")
public class ServerController {

    private final ServerService serverService;

    @Autowired
    public ServerController (ServerService serverService){
        this.serverService = serverService;
    }

    @GetMapping
    public List<Server> getServers(){
        return serverService.getServers();
    }

    @PostMapping
    public void addServer(@RequestBody Server server){
        serverService.addServer(server);
    }
    @DeleteMapping("delete/{serverID}")
    public void deleteServer(@PathVariable("serverID") Integer serverID){
        serverService.deleteServer(serverID);
    }

    @PutMapping("update/{serverID}")
    public void updateServer(@PathVariable("serverID") Integer serverID, @RequestBody Server server){
        serverService.updateUser(serverID, server);
    }
}
