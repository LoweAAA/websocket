package websocket.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="recordabc")
public class Recordabc {

    @Id
    private int id;
    private String time;
    private String userip;
    private String csname;
    private int curspeak;
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getCurspeak() {
        return curspeak;
    }

    public void setCurspeak(int curspeak) {
        this.curspeak = curspeak;
    }

    public Recordabc(String time, String userip, String csname,int curspeak,String text) {
        this.time = time;
        this.userip = userip;
        this.csname = csname;
        this.curspeak=curspeak;
        this.text=text;
    }
    public Recordabc() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getUserip() {
        return userip;
    }

    public void setUserip(String userip) {
        this.userip = userip;
    }

    public String getCsname() {
        return csname;
    }

    public void setCsname(String csname) {
        this.csname = csname;
    }
}

