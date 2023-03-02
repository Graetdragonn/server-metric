package org.example;

import java.io.IOException;
import java.util.Optional;

public class Main {

    public static void main(String[] args) throws IOException {
        DataGenerator dataGenerator = new DataGenerator();
        for(int i = 0; i < 10; i++){
            //System.out.println(dataGenerator.generateAServer());
        }
        System.out.println(dataGenerator.generateSingularTraffic(Optional.empty(), Optional.empty(), Optional.empty(),
                Optional.empty()));
    }
}