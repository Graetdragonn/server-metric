package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TrafficService {
   private final TrafficRepository trafficRepository;

   @Autowired
   public TrafficService(TrafficRepository trafficRepository) {
      this.trafficRepository = trafficRepository;
   }
   
   public void addTraffic(Map<String, Netflow9> traffic) {
      Netflow9 netflow = (Netflow9) traffic.values().toArray()[0]; //new ObjectMapper().readValue(json, Netflow9.class);
      System.out.println(")))))))))))))))))))))))))))))))))))Client: " + (String) netflow.client().get(0));
      for (Map<String, Object> flow : netflow.flows()) {
         if (flow.get("ICMP_TYPE") != null)
            continue;
         Traffic t = new Traffic();
         t.setTime(netflow.header().timestamp());
         t.setSrcIP((String) flow.get("IPV4_SRC_ADDR"));
         t.setSrcPort((int) flow.get("L4_SRC_PORT"));
         t.setDstIP((String) flow.get("IPV4_DST_ADDR"));
         t.setDstPort((int) flow.get("L4_DST_PORT"));
         System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + t.toString());
         trafficRepository.save(t);
      }
   }

   public List<Traffic> getTrafficList() {
      return trafficRepository.findAll();
   }
}
