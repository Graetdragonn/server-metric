package org.example;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;
import java.util.concurrent.locks.Lock;

import lombok.AllArgsConstructor;

@AllArgsConstructor
//Seperate thread to continuously generate traffic data
public class TrafficThread extends Thread {
    private final DataGenerator sender;
    private final Netflow9Builder builder;
    private final Lock lock;

    @Override
    public void run() {
        while(!Thread.currentThread().isInterrupted()) {
            try {
                lock.lock();
                //Automatically generate flow packet data (src & dst IP, src & dst ports etc.)
                builder.getHeader().setTimestamp(Instant.now().getEpochSecond());
                sender.generateSingularTraffic(builder.setFlows().build());
                lock.unlock();
//                Thread.sleep(1000);
                Thread.sleep(10000);
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
                break;
            }
        }
    }
}
