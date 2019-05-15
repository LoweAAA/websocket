package websocket.servicetest;


import websocket.InitTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import websocket.model.Curnow;
import websocket.service.AccountCurd;
import websocket.service.CurnowService;
@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class CurnowServiceTest extends InitTest {
    @Autowired
    private CurnowService CurnowService;

    @Autowired
    private AccountCurd accountCurd;

    @Test
    public void getIp(){;
        String a=CurnowService.findAll().get(0).getIp();
        System.out.println(a);
    }

    @Test
    public void save(){
        Curnow curnow=new Curnow();
        curnow.setIp("2526");
        CurnowService.save(curnow);
    }
}
