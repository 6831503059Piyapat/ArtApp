package com.example.repository.Assistant;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import com.example.entity.RunAssistanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import com.example.dto.response.OnGoingID.OnGoingIDProductDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.response.OnGoingID.ProductDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface AssistantRepo extends JpaRepository<RunAssistanceEntity, String> {
    @Query(value = """
       SELECT us.display_name FROM `run_assistance` ra LEFT JOIN `users` us ON `ra`.user_id = us.user_id WHERE ra.sales_run_id = :Sales_id
    """,nativeQuery = true)
    List<String> findListAssistantBySalesId(@Param("Sales_id") String Sales_id);
    
}
