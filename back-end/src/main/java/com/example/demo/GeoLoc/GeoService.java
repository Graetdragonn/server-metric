package com.example.demo.GeoLoc;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Traffic.Traffic;
import com.example.demo.Traffic.TrafficService;
import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import com.maxmind.geoip2.record.Location;

@Service
public class GeoService {
    //Database Reader to query from database
    private DatabaseReader dbReader;
    private TrafficService trafficService;

    @Autowired
    public GeoService(TrafficService trafficService) throws IOException {
        //Binary database file with Geolocation information
        File database = new File("srv/GeoLite2-City.mmdb");
        dbReader = new DatabaseReader.Builder(database).build();
        this.trafficService = trafficService;
    }

    public Geo getGeo(String IP) throws IOException, GeoIp2Exception{
        InetAddress IPaddr = InetAddress.getByName(IP);
        CityResponse response = dbReader.city(IPaddr); 

        Location loc = response.getLocation();

        return new Geo(IP,
                        response.getCountry().getName(),
                        response.getCity().getName(),
                        loc.getLatitude(),
                        loc.getLongitude()
                        );
    }

    public Geo[][] getServerGeos(String IP) throws IOException, GeoIp2Exception {
        List<Traffic> sentList = trafficService.getSentTrafficListByServer(IP);
        List<Traffic> receivedList = trafficService.getReceivedTrafficListByServer(IP);

        ArrayList<Geo> sentGeos = new ArrayList<>();
        for (Traffic traffic : sentList) {
            sentGeos.add(getGeo(traffic.getDstIP()));
        }

        ArrayList<Geo> receivedGeos = new ArrayList<>();
        for (Traffic traffic : receivedList) {
            receivedGeos.add(getGeo(traffic.getSrcIP()));
        }
        
        return new Geo[][] {sentGeos.toArray(new Geo[0]), receivedGeos.toArray(new Geo[0])};
    }
}
