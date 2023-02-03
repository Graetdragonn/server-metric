package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrafficService {
   private final TrafficRepository trafficRepository;

   @Autowired
   public TrafficService(TrafficRepository trafficRepository) {
      this.trafficRepository = trafficRepository;
   }
   
   public void addTraffic(Netflow9 flows) {
      for (Map<String, Object> flow : flows.tag().flows()) {
         Traffic t = new Traffic();
         t.setSrcIP((String) flow.get("IPV4_SRC_ADDR"));
         trafficRepository.save(t);
      }
   }

   public List<Traffic> getTrafficList() {
      return trafficRepository.findAll();
   }
}
