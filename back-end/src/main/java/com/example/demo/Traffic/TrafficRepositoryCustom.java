package com.example.demo.Traffic;

import java.util.List;

public interface TrafficRepositoryCustom {
    List<Traffic> findTraffic(Traffic criteria) throws IllegalArgumentException, IllegalAccessException;
}