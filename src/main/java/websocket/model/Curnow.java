package websocket.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "curnow")
public class Curnow {
    private String ip;

    @Id
    @Column(name = "ip")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Curnow curnow = (Curnow) o;
        return Objects.equals(ip, curnow.ip);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ip);
    }
}
