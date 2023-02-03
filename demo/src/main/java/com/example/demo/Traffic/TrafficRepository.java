package com.example.demo.Traffic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class TrafficRepository {
    private List<Traffic> list = new ArrayList<Traffic>();

    public Traffic save(Traffic t) {
        list.add(t);
        return t;
    }

    public List<Traffic> findAll() {
        return list;
    }
}
