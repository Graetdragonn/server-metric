package com.example.demo.GeoLoc;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
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

    public Geo getGeo(String IP) {
        InetAddress IPaddr;
        try {
            IPaddr = InetAddress.getByName(IP);
            CityResponse response = dbReader.city(IPaddr);

            Location loc = response.getLocation();

            return new Geo(IP,
                    response.getCountry().getName(),
                    response.getCity().getName(),
                    loc.getLatitude(),
                    loc.getLongitude());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.err.println(IP);
            return null;
        }
    }

    public Geo[][] getServerGeos(String IP) throws IOException, GeoIp2Exception {
        List<Traffic> sentList = trafficService.getCurSentByServer(IP);
        List<Traffic> receivedList = trafficService.getCurReceivedByServer(IP);

        ArrayList<Geo> sentGeos = new ArrayList<>();
        Geo temp; 
        for (int i = 0 ; i < sentList.size(); i += sentList.size()/100) {
            temp = getGeo(sentList.get(i).getDstIP());
            if(sentGeos.size() >= 100){
                break;
            }
            if (temp != null){
                sentGeos.add(temp);
            }

        }

        ArrayList<Geo> receivedGeos = new ArrayList<>();
        for (int i = 0 ; i < receivedList.size(); i += receivedList.size()/100) {
            temp = getGeo(receivedList.get(i).getSrcIP());
            if(receivedGeos.size() >= 100){
                break;
            }
            if (temp != null){
                receivedGeos.add(temp);
            }

        }
        
        return new Geo[][] {sentGeos.toArray(new Geo[0]), receivedGeos.toArray(new Geo[0])};
    }
}
