package com.example.demo.Traffic;

import java.util.List;
import java.util.Map;

public record Netflow9(List<Object> client,
                        Header header,
                        List<Map<String, Object>> flows) {

    public static record Header(int version,
                        int count,
                        long uptime,
                        long timestamp,
                        long sequence,
                        long source_id) {}
}
