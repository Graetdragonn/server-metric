package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/traffic")
public class TrafficController {
    private final TrafficService trafficService;

    @Autowired
    public TrafficController(TrafficService trafficService) {
        this.trafficService = trafficService; 
    }

    //GET request for filtered traffic data
    @GetMapping
    @CrossOrigin
    public List<Traffic> getTrafficList(@RequestParam Optional<Long> timestamp,
                                        @RequestParam Optional<String> srcIP,
                                        @RequestParam Optional<String> dstIP,
                                        @RequestParam Optional<Integer> srcPort,
                                        @RequestParam Optional<Integer> dstPort){
        Traffic t = new Traffic();
        timestamp.ifPresent(time -> t.setTime(time));
        srcIP.ifPresent(src -> t.setSrcIP(src));
        srcPort.ifPresent(src -> t.setSrcPort(src));
        dstIP.ifPresent(dst -> t.setDstIP(dst));
        dstPort.ifPresent(dst -> t.setDstPort(dst));

        return trafficService.getTrafficList(t);
    }

    //Get all traffic data by served
    @GetMapping("getAllTrafficByServer/{serverAddress}")
    @CrossOrigin
    public List<Traffic> getAllTrafficByServer(@PathVariable("serverAddress") String serverAddress){
        return trafficService.getTrafficListByServer(serverAddress);
    }

    //Get all traffic data sent by server
    @GetMapping("getAllSentTrafficByServer/{serverAddress}")
    @CrossOrigin
    public List<Traffic> getAllSentTrafficByServer(@PathVariable("serverAddress") String serverAddress){
        return trafficService.getSentTrafficListByServer(serverAddress);
    }

    //Get all traffic data received by server
    @GetMapping("getAllReceivedTrafficByServer/{serverAddress}")
    @CrossOrigin
    public List<Traffic> getAllReceivedTrafficByServer(@PathVariable("serverAddress") String serverAddress){
        return trafficService.getReceivedTrafficListByServer(serverAddress);
    }

    //Get all traffic sent by all servers of a user
    @GetMapping("getMapOfServersAndPacketsSentByUser/{userEmail}")
    @CrossOrigin
    public Map<String, Integer> getMapOfServersAndPacketsSentByUser(@PathVariable("userEmail") String userEmail){
        return trafficService.getUsersServersAndPacketsSent(userEmail);
    }

    //Get all traffic received by all servers of a user
    @GetMapping("getMapOfServersAndPacketsReceivedByUser/{userEmail}")
    @CrossOrigin
    public Map<String, Integer> getMapOfServersAndPacketsReceivedByUser(@PathVariable("userEmail") String userEmail){
        return trafficService.getUsersServersAndPacketsReceived(userEmail);
    }

    //Get all src ports used by an address
    @GetMapping("getMapOfPortsSentByAddress/{serverAddress}")
    @CrossOrigin
    public Map<Integer, Integer> getMapOfPortsSentByAddress(@PathVariable("serverAddress") String serverAddress){
        return trafficService.getServerPortsSent(serverAddress);
    }

    //Get all dst ports used by an address
    @GetMapping("getMapOfPortsReceivedByAddress/{serverAddress}")
    @CrossOrigin
    public Map<Integer, Integer> getMapOfPortsReceivedByAddress(@PathVariable("serverAddress") String serverAddress){
        return trafficService.getServerPortsReceived(serverAddress);
    }

    //Post Netflow traffic
    @PostMapping
    @CrossOrigin
    public void addTraffic(@RequestBody Netflow9 traffic) {
        trafficService.addTraffic(traffic);
    }


    //Get the newest Traffic By address
    @GetMapping("getLatestTrafficByAddress/{serverAddress}")
    @CrossOrigin
    public long getLatestTrafficByAddress(@PathVariable("serverAddress") String serverAddress){
        return trafficService.getLatestTraffic(serverAddress);
    }
}
