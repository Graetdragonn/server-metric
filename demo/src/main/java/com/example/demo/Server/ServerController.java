package com.example.demo.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/servers")
public class ServerController {

    private final ServerService serverService;
    @Autowired
    public ServerController (ServerService serverService){
        this.serverService = serverService;
    }

    //this mapping gets all servers from the database
    @GetMapping("getAllServers")
    public List<Server> getServers(){
        return serverService.getServers();
    }

    //this mapping gets a specific server by the servers id
    @GetMapping("getServerByID/{serverID}")
    public Optional<Server> getServer(@PathVariable("serverID") int serverID){
       return serverService.getServer(serverID);
    }

    //this mapping adds a server to the database
    @PostMapping("addServer")
    public void addServer(@RequestBody Server server){
        serverService.addServer(server);
    }

    //this mapping deletes a server from the database using the servers id
    @DeleteMapping("delete/{serverID}")
    public void deleteServer(@PathVariable("serverID") Integer serverID){
        serverService.deleteServer(serverID);
    }

    //this mapping updates a specific server using a servers id
    @PutMapping("update/{serverID}")
    public void updateServer(@PathVariable("serverID") Integer serverID, @RequestBody Server server){
        serverService.updateUser(serverID, server);
    }
}
