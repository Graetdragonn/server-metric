package com.example.demo.Traffic;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Traffic {

    @Id
    @SequenceGenerator(name = "traffic_id_sequence", sequenceName = "traffic_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "traffic_id_sequence")
    private Long id;
    private Long time;
    private String srcIP;
    private String dstIP;
    private Integer srcPort, dstPort;

    public Traffic() {}

    public Traffic(Long id, Long time, String srcIP, String dstIP, int srcPort, int dstPort) {
        this.id = id;
        this.time = time;
        this.srcIP = srcIP;
        this.dstIP = dstIP;
        this.srcPort = srcPort;
        this.dstPort = dstPort;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public String getSrcIP() {
        return srcIP;
    }

    public void setSrcIP(String srcIP) {
        this.srcIP = srcIP;
    }

    public String getDstIP() {
        return dstIP;
    }

    public void setDstIP(String dstIP) {
        this.dstIP = dstIP;
    }

    public int getSrcPort() {
        return srcPort;
    }

    public void setSrcPort(int srcPort) {
        this.srcPort = srcPort;
    }

    public int getDstPort() {
        return dstPort;
    }

    public void setDstPort(int dstPort) {
        this.dstPort = dstPort;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((time == null) ? 0 : time.hashCode());
        result = prime * result + ((srcIP == null) ? 0 : srcIP.hashCode());
        result = prime * result + ((dstIP == null) ? 0 : dstIP.hashCode());
        result = prime * result + srcPort;
        result = prime * result + dstPort;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Traffic other = (Traffic) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (time == null) {
            if (other.time != null)
                return false;
        } else if (!time.equals(other.time))
            return false;
        if (srcIP == null) {
            if (other.srcIP != null)
                return false;
        } else if (!srcIP.equals(other.srcIP))
            return false;
        if (dstIP == null) {
            if (other.dstIP != null)
                return false;
        } else if (!dstIP.equals(other.dstIP))
            return false;
        if (srcPort != other.srcPort)
            return false;
        if (dstPort != other.dstPort)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Traffic [id=" + id + ", time=" + time + ", srcIP=" + srcIP + ", dstIP=" + dstIP + ", srcPort=" + srcPort
                + ", dstPort=" + dstPort + "]";
    }
    
}