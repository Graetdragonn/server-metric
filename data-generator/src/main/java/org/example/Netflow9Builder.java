package org.example;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import com.example.demo.Traffic.Netflow9;

import lombok.Getter;

@Getter
public class Netflow9Builder {
    private List<Object> router;
    private Netflow9.Header header;
    private List<Map<String, Object>> flows;
    private List<MockServer> servers;
    private List<String> clients;

    public Netflow9Builder() {
        this.servers = new ArrayList<>();
        this.clients = new ArrayList<>();
    }

    public Netflow9Builder(List<MockServer> servers) {
        this.servers = servers;
        this.clients = new ArrayList<>();
    }

    public Netflow9Builder setServers(List<MockServer> servers) {
        this.servers = servers;
        return this;
    }

    public Netflow9Builder setClients(List<String> clients) {
        this.clients = clients;
        return this;
    }

    public Netflow9Builder setRouter(Optional<String> routerIP) {
        // Set client/router
        Random rand = new Random();
        router = new ArrayList<>();
        router.add(routerIP.orElse("127.0.0.1"));
        router.add(rand.nextInt(NetConst.MIN_EPH_PORT, NetConst.MAX_PORT));
        return this;
    }

    public Netflow9Builder setHeader(Optional<Integer> numFlows) {
        Random rand = new Random();
        int sourceID = rand.nextInt();
        // Set Header
        long timestamp = Instant.now().getEpochSecond();
        header = new Netflow9.Header(9, numFlows.map(n -> n * 2).orElse(20),
                rand.nextLong(timestamp),
                timestamp, 1, sourceID);
        return this;
    }

    public Netflow9Builder setFlows() {
        Random rand = new Random();
        flows = new ArrayList<>();
        if (servers.isEmpty()) {
            for (int i = 0; i < 5; i++) {
                MockServer mock = new MockServer(DataGenerator.randomIPGenerator(), Arrays.asList(80, 443, 22, 25, 115),
                        rand.nextLong(NetConst.MAX_MAC));
                servers.add(mock);
            }
        }

        for (int i = 0; i < header.getCount()/2; i++) {
            // Set Flows
            Map<String, Object> flow = new HashMap<>();
            MockServer server = servers.get(rand.nextInt(servers.size()));
            List<Integer> ports = server.getOpenPorts();


            if (rand.nextBoolean()) {
                flow.put("IPV4_SRC_ADDR", server.getAddress());
                flow.put("L4_SRC_PORT", ports.get(rand.nextInt(ports.size())));
                flow.put("IPV4_DST_ADDR", clients.isEmpty() ? DataGenerator.randomIPGenerator()
                        : clients.get(rand.nextInt(clients.size())));
                flow.put("L4_DST_PORT", rand.nextInt(NetConst.MIN_EPH_PORT, NetConst.MAX_PORT));
            } else {
                flow.put("IPV4_SRC_ADDR", clients.isEmpty() ? DataGenerator.randomIPGenerator()
                        : clients.get(rand.nextInt(clients.size())));
                flow.put("L4_SRC_PORT", rand.nextInt(NetConst.MIN_EPH_PORT, NetConst.MAX_PORT));
                flow.put("IPV4_DST_ADDR", server.getAddress());
                flow.put("L4_DST_PORT", ports.get(rand.nextInt(ports.size())));
            }
            flows.add(flow);
        }

        return this;
    }

    public Netflow9 build() {
        return new Netflow9(router, header, flows);
    }
}
