package org.example;

import java.util.List;
import java.util.Map;

import com.example.demo.Traffic.Netflow9;

public class Netflow9Builder {    
    private List<Object> client ;
    private Netflow9.Header header;
    private List<Map<String, Object>> flows;

    public Netflow9Builder setClient() {

        return this;
    }
}
