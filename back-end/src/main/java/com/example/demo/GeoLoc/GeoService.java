package com.example.demo.GeoLoc;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;

import org.springframework.stereotype.Service;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import com.maxmind.geoip2.record.Location;

@Service
public class GeoService {
    private DatabaseReader dbReader;
    public GeoService() throws IOException {
        File database = new File("srv/GeoLite2-City.mmdb");
        dbReader = new DatabaseReader.Builder(database).build();
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

}
