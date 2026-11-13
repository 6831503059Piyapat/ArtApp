package com.example.repository.JoinSale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.System.SupplierFindDTO;
import com.example.entity.RunAssistanceEntity;
import com.example.entity.SupplierEntity;

import jakarta.transaction.Transactional;

import java.util.List;
@Repository
public interface JoinSaleRepo extends JpaRepository<RunAssistanceEntity, String> {

   @Modifying 
   @Transactional 
   @Query (value = """
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
    @Query(
        value= """
        SELECT EXISTS(SELECT 1 FROM run_assistance WHERE user_id = :user_id AND sales_run_id = :sale_run_id) AS is_exist
        """, nativeQuery = true)
        
    Long checkUserInSale(@Param("user_id") String user_id, @Param("sale_run_id") String sale_run_id);

}
