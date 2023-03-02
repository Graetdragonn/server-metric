package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;

import lombok.*;

@Getter @Setter @NoArgsConstructor
public class Netflow9 {
    private List<Object> client;
    private Header header; 
    private List<Map<String, Object>> flows;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class Header {
        private int version;
        private int count;
        private long uptime;
        private long timestamp;
        private long sequence;
        private long source_id;
    }
}
