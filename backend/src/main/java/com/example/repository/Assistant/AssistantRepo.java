package com.example.repository.Assistant;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;

import jakarta.transaction.Transactional;

import com.example.entity.RunAssistanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    @Modifying 
    @Transactional 
    @Query(value = """
          INSERT INTO run_assistance (run_assistance_id,sales_run_id,user_id,can_manage_stock,can_manage_permission,can_record_expenses,can_sell,can_view_log) VALUES (:run_assistance_id, :sales_run_id, :user_id, :can_manage_stock, :can_manage_permission, :can_record_expenses, :can_sell, :can_view_log);
     """,nativeQuery = true)
    void addRunAssistant(@Param("run_assistance_id") String run_assistance_id,
                         @Param("sales_run_id") String sales_run_id,
                         @Param("user_id") String user_id,
                         @Param ("can_manage_stock") Boolean can_manage_stock,
                         @Param ("can_manage_permission") Boolean can_manage_permission,
                         @Param ("can_record_expenses") Boolean can_record_expenses,
                         @Param ("can_sell") Boolean can_sell,
                         @Param ("can_view_log") Boolean can_view_log);

}
