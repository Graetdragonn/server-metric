package com.example.demo.GeoLoc;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maxmind.geoip2.exception.GeoIp2Exception;

@RestController
@CrossOrigin
@RequestMapping("api/v1/geolocation")
public class GeoController {
    private GeoService geoService;

    @Autowired
    public GeoController(GeoService geoService) {
        this.geoService = geoService;
    }

    //GET request for a given IP address
    @GetMapping
    public Geo getGeo(@RequestParam String ip) throws IOException, GeoIp2Exception {
        return geoService.getGeo(ip);
    }
}
