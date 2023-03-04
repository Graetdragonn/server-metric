package org.example;

import java.io.IOException;
import java.util.concurrent.locks.Lock;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class TrafficThread extends Thread {
    private final DataGenerator sender;
    private final Netflow9Builder builder;
    private final Lock lock;

    @Override
    public void run() {
        while(!Thread.currentThread().isInterrupted()) {
            try {
                lock.lock();
                sender.generateSingularTraffic(builder.setFlows().build());
                lock.unlock();
                Thread.sleep(1000);
            } catch (IOException | InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                break;
            }
        }
    }
}
