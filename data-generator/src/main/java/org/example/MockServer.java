package org.example;

import java.util.List;
import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor 
public class MockServer {
   private String address;
   private List<Integer> openPorts;
   private long MAC;

   @Override
   public String toString() {
      return "Server: [address=" + address + ", openPorts=" + openPorts + ", MAC=" + MAC + "]";
   } 
}
