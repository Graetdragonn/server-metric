package com.example.demo.Traffic;

import java.util.ArrayList;
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
   
   public void addTraffic(Netflow9 netflow) {
      for (Map<String, Object> flow : netflow.getFlows()) {
         // Optional<Server> server = serverRepository.findServerByAddress((String) flow.get("IPV4_SRC_ADDR"));
         // if (!server.isPresent()) {
         //    continue;
         // }
         if (flow.get("ICMP_TYPE") != null) {
            continue;
         }

         Traffic t = new Traffic();
         t.setTime(netflow.getHeader().getTimestamp());
         t.setSrcIP((String) flow.get("IPV4_SRC_ADDR"));
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

    public List<Traffic> getReceivedTrafficListByServer(String serverAddress) {
      List<Traffic> allTraffic = trafficRepository.findAll();
      List<Traffic> allTrafficFromServer = new ArrayList<>();
       for (Traffic traffic : allTraffic) {
          if (traffic.getDstIP().equals(serverAddress)) {
             allTrafficFromServer.add(traffic);
          }
       }
      return allTrafficFromServer;
    }

   public List<Traffic> getSentTrafficListByServer(String serverAddress) {
      List<Traffic> allTraffic = trafficRepository.findAll();
      List<Traffic> allTrafficFromServer = new ArrayList<>();
      for (Traffic traffic : allTraffic) {
         if (traffic.getSrcIP().equals(serverAddress)) {
            allTrafficFromServer.add(traffic);
         }
      }
      return allTrafficFromServer;
   }

   public List<Traffic> getTrafficListByServer(String serverAddress){
      List<Traffic> allTraffic = trafficRepository.findAll();
      List<Traffic> allTrafficFromServer = new ArrayList<>();
      for (Traffic traffic : allTraffic) {
         if (traffic.getDstIP().equals(serverAddress)) {
            allTrafficFromServer.add(traffic);
         } else if (traffic.getSrcIP().equals(serverAddress)) {
            allTrafficFromServer.add(traffic);
         }
      }
      return allTrafficFromServer;
   }
}
