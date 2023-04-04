package org.example;

//Constant
public class NetConst {
   //Maximum mac address
   public static final long MAX_MAC = 281474976710655l; 

   //Max and min ephemeral ports
   public static final int MAX_PORT = 65535; 
   public static final int MIN_EPH_PORT = 1024; 

   //First octet of reserved IP ranges
   public static final int MAX_NETWORK = 223;
   public static final Integer[] RESERVED_NETWORKS = {10, 100, 127, 172, 192, 198, 203};
}
