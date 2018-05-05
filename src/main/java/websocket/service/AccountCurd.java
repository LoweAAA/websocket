package websocket.service;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import websocket.model.Recordabc;

@Repository
public interface AccountCurd extends JpaRepository<Recordabc,Integer>{
    //泛型分别是对应的实体类，该表对应的主键的类型
}
