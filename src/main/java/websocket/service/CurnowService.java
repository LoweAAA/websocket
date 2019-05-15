package websocket.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import websocket.model.Curnow;
import websocket.model.Recordabc;

@Repository
public interface CurnowService extends JpaRepository<Curnow,String> {
}
