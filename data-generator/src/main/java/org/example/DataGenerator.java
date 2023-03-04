package org.example;
import com.google.gson.Gson;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import java.io.IOException;
import java.util.Random;

import com.example.demo.Server.Server;
import com.example.demo.Traffic.Netflow9;

public class DataGenerator {
    //TODO need to add routes that don't have security so we can generate traffic
    private final String trafficURL = "http://localhost:8080/api/v1/traffic";//"http://coms-402-sd-05.class.las.iastate.edu:8080/api/v1/traffic";
    private final String serverPostURL = "http://localhost:8080/api/v1/servers/addServer";
    private final Gson gson = new Gson();
    CloseableHttpClient httpClient;

    public DataGenerator()  {
        httpClient = HttpClientBuilder.create().build();
    }

    public String generateSingularTraffic(Netflow9 traffic) throws IOException {

        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(trafficURL);
        StringEntity postingString = new StringEntity(gson.toJson(traffic)); //gson.toJson converts class to json
        post.setEntity(postingString);
        post.setHeader("Content-type", "application/json");
        CloseableHttpResponse response = httpClient.execute(post);
        return traffic.toString();
    }

    public String generateAServer(Server server) throws IOException {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(serverPostURL);
        StringEntity postingString = new StringEntity(gson.toJson(server)); //gson.toJson converts class to json
        post.setEntity(postingString);
        post.setHeader("Content-type", "application/json");
        CloseableHttpResponse response = httpClient.execute(post);
        return server.toString();
    }



    public static String randomIPGenerator(){
        Random r = new Random();
        return r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256);
    }
}