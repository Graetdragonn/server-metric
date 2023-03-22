package com.example.demo.Traffic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.Server.Server;
import com.example.demo.Server.ServerRepository;
import com.example.demo.User.User;
import com.example.demo.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TrafficService {
   private final TrafficRepository trafficRepository;
   private final UserRepository userRepository;

   private final ServerRepository serverRepository;
   @Autowired
   public TrafficService(TrafficRepository trafficRepository, UserRepository userRepository, ServerRepository serverRepository) {
      this.trafficRepository = trafficRepository;
      this.userRepository = userRepository;
      this.serverRepository = serverRepository;
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

   public Map<String, Integer> getUsersServersAndPacketsSent(String userEmail){
      User user = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
      List<Server> userServers = user.getServers();
      List<Traffic> allTraffic = trafficRepository.findAll();
      Map<String, Integer> map = new HashMap<String, Integer>();
      for(Server server: userServers){
         map.put(server.getAddress(), 0);
      }
      for(Traffic traffic: allTraffic){
         if(map.containsKey(traffic.getSrcIP())){
            map.put(traffic.getSrcIP(), map.get(traffic.getSrcIP()) + 1);
         }
      }

      return map;

   }

   public Map<String, Integer> getUsersServersAndPacketsReceived(String userEmail){
      User user = userRepository.findUserByUsername(userEmail).orElseThrow(()-> new IllegalStateException("user with email " + userEmail + " does not exist"));
      List<Server> userServers = user.getServers();
      List<Traffic> allTraffic = trafficRepository.findAll();
      Map<String, Integer> map = new HashMap<String, Integer>();
      for(Server server: userServers){
         map.put(server.getAddress(), 0);
      }
      for(Traffic traffic: allTraffic){
         if(map.containsKey(traffic.getDstIP())){
            map.put(traffic.getSrcIP(), map.get(traffic.getSrcIP()) + 1);
         }
      }

      return map;

   }

   public Map<Integer, Integer> getServerPortsSent(String serverAdddress){
      List<Traffic> allTraffic = trafficRepository.findAll();
      Map<Integer, Integer> map = new HashMap<>();
      for(Traffic traffic: allTraffic){
        if(traffic.getSrcIP().equals(serverAdddress)){
           if(map.containsKey(traffic.getSrcPort())){
              map.put(traffic.getSrcPort(), map.get(traffic.getSrcPort()) + 1);
           }else{
              map.put(traffic.getSrcPort(), 1);
           }
        }
      }

      return map;

   }

   public Map<Integer, Integer> getServerPortsReceived(String serverAdddress){
      List<Traffic> allTraffic = trafficRepository.findAll();
      Map<Integer, Integer> map = new HashMap<>();
      for(Traffic traffic: allTraffic){
         if(traffic.getDstIP().equals(serverAdddress)){
            if(map.containsKey(traffic.getDstPort())){
               map.put(traffic.getDstPort(), map.get(traffic.getDstPort()) + 1);
            }else{
               map.put(traffic.getDstPort(), 1);
            }
         }
      }

      return map;

   }
}
