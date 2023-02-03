package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;

public record Netflow9(InnerNetflow9 tag) {
    public record InnerNetflow9(Map<String, Object> client,
                                Header header,
                                List<Map<String, Object>> flows) {} 

    public record Header(int version,
                        int count,
                        long uptime,
                        long timestamp,
                        long sequence,
                        long source_id) {}
}
