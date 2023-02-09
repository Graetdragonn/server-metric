package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Server.Server;
import com.example.demo.Server.ServerRepository;


@Service
public class TrafficService {
   private final TrafficRepository trafficRepository;
   private final ServerRepository serverRepository;

   @Autowired
   public TrafficService(TrafficRepository trafficRepository, ServerRepository serverRepository) {
      this.trafficRepository = trafficRepository;
      this.serverRepository = serverRepository;
   }
   
   public void addTraffic(Map<String, Netflow9> traffic) {
      Netflow9 netflow = (Netflow9) traffic.values().toArray()[0]; 
      for (Map<String, Object> flow : netflow.flows()) {
         Optional<Server> server = serverRepository.findServerByAddress((String) flow.get("IPV4_SRC_ADDR"));
         if (!server.isPresent()) {
            continue;
      }
         if (flow.get("ICMP_TYPE") != null) {
            continue;
         }

         Traffic t = new Traffic();
         t.setTime(netflow.header().timestamp());
         t.setSrcIP(server.get());
         t.setSrcPort((int) flow.get("L4_SRC_PORT"));
         t.setDstIP((String) flow.get("IPV4_DST_ADDR"));
         t.setDstPort((int) flow.get("L4_DST_PORT"));
         trafficRepository.save(t);
      }
   }

   public List<Traffic> getTrafficList(Traffic criteria) {
      try {
         return trafficRepository.findTraffic(criteria);
      } catch (IllegalArgumentException | IllegalAccessException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      return null;
   }
}
