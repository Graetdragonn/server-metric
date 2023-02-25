package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Server.Server;

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
    public List<Traffic> getTrafficList(@RequestParam Optional<Long> timestamp,
                                        @RequestParam Optional<String> srcIP,
                                        @RequestParam Optional<String> dstIP,
                                        @RequestParam Optional<Integer> srcPort,
                                        @RequestParam Optional<Integer> dstPort){
        Traffic t = new Traffic();
        timestamp.ifPresent(time -> t.setTime(time));
        srcIP.ifPresent(src -> t.setSrcIP(new Server(src, "", null, null)));
        srcPort.ifPresent(src -> t.setSrcPort(src));
        dstIP.ifPresent(dst -> t.setDstIP(dst));
        dstPort.ifPresent(dst -> t.setDstPort(dst));

        return trafficService.getTrafficList(t);
    }

    @PostMapping
    @CrossOrigin
    public void addTraffic(@RequestBody Map<String, Netflow9> traffic) {
        trafficService.addTraffic(traffic);
    }
}
