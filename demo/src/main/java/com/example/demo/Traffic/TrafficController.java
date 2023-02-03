package com.example.demo.Traffic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/traffic")
public class TrafficController {
    private final TrafficService trafficService;

    @Autowired
    public TrafficController(TrafficService trafficService) {
        this.trafficService = trafficService; 
    }

    @GetMapping
    public List<Traffic> getTrafficList(){
       return trafficService.getTrafficList();
    }

    @PostMapping
    public void addTraffic(@RequestBody Netflow9 flows) {
        trafficService.addTraffic(flows);
    }
}
