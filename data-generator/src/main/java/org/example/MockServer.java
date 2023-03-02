package org.example;

import java.util.List;
import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor 
public class MockServer {
   private String address;
   private List<Integer> openPorts;
   private long MAC; 
}
