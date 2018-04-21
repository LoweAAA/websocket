package websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class LoweController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/toclient")
    public void toclient(Message message){
        System.out.print(message.getText());
        simpMessagingTemplate.convertAndSend("/topic/client-"+message.getIp(),message);
    }

    @MessageMapping("/tocustomer")
    public void tocustomer(Message message){
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
