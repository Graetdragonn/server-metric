package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/traffic")
public class TrafficController {
    private final TrafficService trafficService;

    @Autowired
    public TrafficController(TrafficService trafficService) {
        this.trafficService = trafficService; 
    }

    @GetMapping
    @CrossOrigin
    public List<Traffic> getTrafficList(@RequestParam Optional<String> srcIP,
                                        @RequestParam Optional<String> dstIP,
                                        @RequestParam Optional<Integer> srcPort,
                                        @RequestParam Optional<Integer> dstPort){
       return trafficService.getTrafficList();
    }

    @PostMapping
    @CrossOrigin
    public void addTraffic(@RequestBody Map<String, Netflow9> traffic) {
        trafficService.addTraffic(traffic);
    }
}
