package websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import websocket.service.CurnowService;

@Component
public class Init implements ApplicationRunner {


    @Autowired
    private CurnowService CurnowService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("------清空之前存在的连接------");
        CurnowService.deleteAll();
    }
}
