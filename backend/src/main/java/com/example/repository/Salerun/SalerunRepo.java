package com.example.repository.Salerun;


import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.entity.SaleRunEntity;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalerunRepo extends JpaRepository<SaleRunEntity, String> {

    @Query(value = """
       UPDATE sale_run SET SaleRun_Status = 0 WHERE id = :sale_id;
       UPDATE sale_run SET SaleRun_EndTime = CURRENT_TIMESTAMP WHERE id = :sale_id;
    """,nativeQuery = true)
    void endSaleRun(@Param("sale_id") String sale_id);
    @Modifying 
    @Transactional 
   @Query(value = """
        INSERT INTO sale_run (sale_run_id,date_closed,date_created,host_user_id,sale_run_status,booth_location,sale_run_name) VALUES (:sale_run_id, :date_closed, :date_created, :host_user_id, :sale_run_status, :booth_location, :sale_run_name);
    """,nativeQuery = true)
    void createSaleRun(@Param("sale_run_id") String sale_run_id,
                       @Param("date_closed") String date_closed,
                       @Param("date_created") String date_created,
                       @Param("host_user_id") String host_user_id,
                       @Param("sale_run_status") boolean sale_run_status,
                       @Param("booth_location") String booth_location,
                       @Param("sale_run_name") String sale_run_name);



   
}
