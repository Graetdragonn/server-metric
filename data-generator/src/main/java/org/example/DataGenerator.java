package org.example;
import com.google.gson.Gson;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import com.example.demo.Server.Server;
import com.example.demo.Traffic.Netflow9;

public class DataGenerator {
    //TODO need to add routes that don't have security so we can generate traffic
    private final String trafficURL = "http://localhost:8080/api/v1/traffic";//"http://coms-402-sd-05.class.las.iastate.edu:8080/api/v1/traffic";
    private final String serverPostURL = "http://localhost:8080/api/v1/servers/addServer";
    private final Gson gson = new Gson();

    public DataGenerator()  {

    }


    public String generateSingularTraffic(Optional<String> routerIP, 
                                          Optional<Integer> numFlows,
                                          Optional<List<MockServer>> servers,
                                          Optional<List<String>> clients) throws IOException {
        //TODO need to fill in all the fields for traffic (randomly generated like generate a server below)
        Netflow9 traffic = new Netflow9();

        //Set client/router
        Random rand = new Random();
        List<Object> router = new ArrayList<>();
        router.add(routerIP.orElse("127.0.0.1"));
        router.add(rand.nextInt(1024,65535));
        traffic.setClient(router);

        int sourceID = rand.nextInt();
        // Set Header
        long timestamp = Instant.now().getEpochSecond();
        Netflow9.Header header = new Netflow9.Header(9, numFlows.map(n -> n * 2).orElse(20), rand.nextLong(timestamp),
                timestamp, 1, sourceID);
        traffic.setHeader(header);

        List<Map<String, Object>> flows = new ArrayList<>();
        List<MockServer> serverList;
        if (servers.isPresent()) {
            serverList = servers.get();
        } else {
            serverList = new ArrayList<>();
            for (int i = 0; i < 5; i++) {
                MockServer mock = new MockServer(randomIPGenerator(), Arrays.asList(80, 443, 22, 25, 115), rand.nextLong());
                serverList.add(mock);
            }
        }

        for (int i = 0; i < header.getCount(); i++) {
            //Set Flows
            Map<String, Object> flow = new HashMap<>();
            MockServer server = serverList.get(rand.nextInt(serverList.size()));
            List<Integer> ports = server.getOpenPorts();

            flow.put("IPV4_SRC_ADDR", server.getAddress());
            flow.put("L4_SRC_PORT", ports.get(rand.nextInt(ports.size())));
            flow.put("IPV4_DST_ADDR", clients.map(c -> c.get(rand.nextInt(c.size()))).orElse(randomIPGenerator()));
            flow.put("L4_DST_PORT", rand.nextInt(1024, 65535));
            flows.add(flow);
        }
        traffic.setFlows(flows);

        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(trafficURL);
        StringEntity postingString = new StringEntity(gson.toJson(traffic)); //gson.toJson converts class to json
        post.setEntity(postingString);
        post.setHeader("Content-type", "application/json");
        CloseableHttpResponse response = httpClient.execute(post);
        return traffic.toString();
    }

    public String generateAServer() throws IOException {
        Server server = new Server(randomIPGenerator(), "");
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(serverPostURL);
        StringEntity postingString = new StringEntity(gson.toJson(server)); //gson.toJson converts class to json
        post.setEntity(postingString);
        post.setHeader("Content-type", "application/json");
        CloseableHttpResponse response = httpClient.execute(post);
        return server.toString();
    }



    public String randomIPGenerator(){
        Random r = new Random();
        return r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256);
    }
}