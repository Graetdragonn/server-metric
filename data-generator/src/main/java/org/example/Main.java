package org.example;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
import java.util.Random;
import java.util.Scanner;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import com.example.demo.Server.Server;

public class Main {
    private static DataGenerator dataGenerator;
    private static ArrayList<Netflow9Builder> builders;
    private static ArrayList<Lock> locks;
    private static ArrayList<TrafficThread> trafficList;
    private static ArrayList<MockServer> servers;

    public static void main(String[] args) throws IOException {
        dataGenerator = new DataGenerator();
        builders = new ArrayList<>();
        locks = new ArrayList<>();
        trafficList = new ArrayList<>();
        servers = new ArrayList<>();
        Scanner scan = new Scanner(System.in);

        while (true) {
           System.out.print("Input number option below:\n" +
                              "1: Add Servers\n" +
                              "2: List Servers\n" +
                              "3: Generate Traffic Stream\n" +
                              "4: List Traffic Streams\n" +
                              "5: End Traffic Stream\n" +
                              "6: Quit\n\n" +
                              "Option: "); 
            int input = scan.nextInt();
            switch (input) {
                case 1:
                System.out.println("Input servers:\n" + 
                                   "Specify: -s <IP> -p <Port>,<Port>...\n" +
                                   "Random: -r <Number of Servers>\n" + 
                                   "Use ';' to end input\n" +
                                   "Ex. -s 127.0.0.1 -p 22,80,443;\n");
                while(parseServer(scan.nextLine()));
                for (MockServer ms : servers) {
                    Server mock = new Server(ms.getAddress(), "");
                    dataGenerator.generateAServer(mock);
                }
                break;

                case 2:
                printServers();
                break;

                case 3:

                builders.add(new Netflow9Builder().setRouter(Optional.empty())
                                                  .setHeader(Optional.empty()));
                printServers();
                System.out.println("Choose server numbers from the list to generate traffic from:\n" + 
                                   "Specify: <Server 1>, <Server 2>... \n" +
                                   "Example: 0,1,2,6 \n");
                scan.nextLine();
                String[] str = scan.nextLine().split("[, ]+");
                for (String token : str) {
                    if (token.matches("\\d+")) {
                        int i = Integer.parseInt(token);
                        if (i < servers.size())
                            builders.get(builders.size()-1).getServers().add(servers.get(i));
                    } 
                }
                
                locks.add(new ReentrantLock());
                trafficList.add(new TrafficThread(dataGenerator, builders.get(builders.size()-1), locks.get(locks.size()-1)));
                trafficList.get(trafficList.size()-1).start();
                break;

                case 4:
                printTrafficStreams();
                break;

                case 5:
                printTrafficStreams();
                System.out.print("Choose traffic stream to stop:");
                input = scan.nextInt();
                if (input < trafficList.size() && input > -1) {
                    System.out.printf("Removing %d\n", input);
                    trafficList.get(input).interrupt(); 
                    trafficList.remove(input);
                    builders.remove(input);
                    locks.remove(input);
                } else 
                    System.out.println("Invalid Input.");
                break;

                case 6:
                trafficList.forEach(t -> t.interrupt());
                scan.close();
                return;
                default:
                break;
            }
        }
    }

    private static boolean parseServer(String input) {
        String[] str = input.split("[, ]+|((?<=(-s|-p|-r|;.))|(?=(-s|-p|-r|;)))");
        String token;
        for (int i = 0; i < str.length; i++) {
            token = str[i];
            if (token.equals("-s") && ++i < str.length) {
                token = str[i];
                if (token.matches("\\d+\\.\\d+\\.\\d+\\.\\d+"))
                    servers.add(new MockServer(token, new ArrayList<>(), new Random().nextLong(NetConst.MAX_MAC)));
            }
            
            else if (token.equals("-p")) {
                while (++i < str.length) {
                    token = str[i];
                    if (token.matches("\\d+")) {
                        servers.get(servers.size() - 1).getOpenPorts().add(Integer.parseInt(token));
                    } else {
                        i--;
                        break;
                    }
                }
            }

            else if (token.equals("-r") && ++i < str.length) {
                token = str[i];
                if (token.matches("\\d+")) {
                    Random rand = new Random();
                    for (int j = 0; j < Integer.parseInt(token); j++)
                    servers.add(new MockServer(DataGenerator.randomIPGenerator(), Arrays.asList(80, 443, 22, 25, 115),
                        rand.nextLong(NetConst.MAX_MAC))) ;
                }
            
            }

            else if (token.equals(";"))
                return false;
        }
        return true;
    }

    private static void printTrafficStreams() {
        for (int i = 0; i < trafficList.size(); i++) {
            System.out.printf("%d:\n",i);
            builders.get(i).getServers().forEach(s -> System.out.println(s));
        }
    }

    private static void printServers() {
        for (int i = 0; i < servers.size(); i++) {
            System.out.printf("%d: %s\n",i , servers.get(i));
        }
    }
}