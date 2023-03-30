package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;

import lombok.*;

//Class to take in json Netflow v9 information
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Netflow9 {

    //Represents router information
    private List<Object> client;

    //Netflow v9 header
    private Header header; 

    //Netflow v9 flows
    private List<Map<String, Object>> flows;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class Header {
        private int version; //Netflow version
        private int count; //Flowsets within packet
        private long uptime; //Uptime of router
        private long timestamp; //Timestamp of Netflow packet
        private long sequence; //Netflow packet sequence number
        private long source_id; //ID to uniquely identify Netflow packets from a specfic device
    }
}
