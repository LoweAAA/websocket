package websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import websocket.model.Curnow;
import websocket.model.Recordabc;
import websocket.service.AccountCurd;
import websocket.service.CurnowService;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class LoweController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private AccountCurd accountCurd;

    @Autowired
    private CurnowService curnowService;

    @MessageMapping("/toclient")
    public void toclient(Message message){

        Date dt=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String currentTime = sdf.format(dt);
        Recordabc account = new Recordabc(currentTime,message.getIp(),"客服001",1,message.getText());
        accountCurd.save(account);
        System.out.print(message.getText());
        simpMessagingTemplate.convertAndSend("/topic/client-"+message.getIp(),message);
    }

    @MessageMapping("/tocustomer")
    public void tocustomer(Message message){
        if(!message.getText().equals("ini")){
            Date dt=new Date();
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String currentTime = sdf.format(dt);
            Recordabc account = new Recordabc(currentTime,message.getIp(),"客服001",0,message.getText());
            accountCurd.save(account);
        }
        Curnow cn=new Curnow();
        cn.setIp(message.getIp());
        curnowService.save(cn);
        System.out.print(message.getIp());
        System.out.print(message.getText());
        simpMessagingTemplate.convertAndSend("/topic/customer",message);
    }

    @MessageMapping("/customerinitialize")
    public void customerinitialize(Message message){
        simpMessagingTemplate.convertAndSend("/topic/customer",message);
    }

    /*@MessageMapping("/resend")
    public void resend(Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getId(),"/");
    }*/

}
