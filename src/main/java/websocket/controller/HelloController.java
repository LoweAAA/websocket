package websocket.controller;


//import model.Recordabc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import websocket.model.Recordabc;
import websocket.service.AccountCurd;

import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.List;
//import service.AccountCurd;


@RestController
public class HelloController {

    @Autowired
    private AccountCurd accountCurd;

    @RequestMapping("/select")
    public List<Recordabc> selectAll() {
        return accountCurd.findAll();
    }


    @RequestMapping("/add")
    public String addAccount(/*String time,String userip,String csname*/){
        Date dt=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String currentTime = sdf.format(dt);
        Recordabc account = new Recordabc(currentTime,"112.1","57",0,"123");
        accountCurd.save(account);
        return "success";
    }

// @RequestMapping("/delete")
//    public String deleteAccount(@RequestParam("id") int id){
//        accountCurd.delete(id);
//        return "success";
//    }
//
//
//@RequestMapping("/")
//    public String home(){
//        return "Hello World";
//    }

}
