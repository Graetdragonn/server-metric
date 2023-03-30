package com.example.demo.GeoLoc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

//Geolocation information
public class Geo {
    private String IP, country, city;
    private double latitude, longitude;
}
