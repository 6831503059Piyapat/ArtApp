package com.example.repository.Assistant;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import com.example.dto.response.Assistant.AssistantPermissionCheckDTO;
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
import com.example.dto.response.Assistant.AssistantDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface AssistantRepo extends JpaRepository<RunAssistanceEntity, String> {
    @Query(value = """
       SELECT us.display_name ,ra.run_assistance_id, ra.can_manage_stock, ra.can_manage_permission, ra.can_record_expenses, ra.can_sell, ra.can_view_log FROM `run_assistance` ra LEFT JOIN `users` us ON `ra`.user_id = us.user_id WHERE ra.sales_run_id = :Sales_id
    """,nativeQuery = true)
    List<AssistantDTO> findListAssistantBySalesId(@Param("Sales_id") String Sales_id);
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
    @Modifying 
    @Transactional 
    @Query(value = """
          UPDATE run_assistance SET can_manage_stock = :can_manage_stock, can_manage_permission = :can_manage_permission, can_record_expenses = :can_record_expenses, can_sell = :can_sell, can_view_log = :can_view_log WHERE run_assistance_id = :run_assistance_id;
     """,nativeQuery = true)
    void updateRunAssistant(@Param("run_assistance_id") String run_assistance_id,
                            @Param ("can_manage_stock") Boolean can_manage_stock,
                            @Param ("can_manage_permission") Boolean can_manage_permission,
                            @Param ("can_record_expenses") Boolean can_record_expenses,
                            @Param ("can_sell") Boolean can_sell,
                            @Param ("can_view_log") Boolean can_view_log);
   @Query(
        value= """
        SELECT EXISTS(SELECT 1 FROM run_assistance WHERE user_id = :user_id AND sales_run_id = :sale_run_id) AS is_exist
        """, nativeQuery = true)
    Long checkAssistant(@Param("user_id") String user_id, @Param("sale_run_id") String sale_run_id);

    @Query (value = """
        SELECT sale_run_id FROM sale_run WHERE code_join = :code_join AND sale_run_status = 1
           """,nativeQuery = true)
    String findSaleRunIdByCodeJoin(@Param("code_join") String code_join);
    
    @Query (value = """
        SELECT can_manage_stock, can_manage_permission, can_record_expenses, can_sell, can_view_log FROM run_assistance WHERE sales_run_id = :sale_run_id AND user_id = :user_id
           """,nativeQuery = true)
    AssistantPermissionCheckDTO findPermissionByUser_idAndSaleRun_id(@Param("user_id") String user_id, @Param("sale_run_id") String sale_run_id);

}

