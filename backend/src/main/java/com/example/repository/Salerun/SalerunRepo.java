package com.example.repository.Salerun;


import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.entity.SaleRunEntity;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalerunRepo extends JpaRepository<SaleRunEntity, String> {
    @Modifying
    @Transactional
    @Query(value = """
       UPDATE sale_run SET sale_run_status = 0,date_closed = :timestamp WHERE sale_run_id = :sale_id;
       
    """,nativeQuery = true)
    void endSaleRun(@Param("sale_id") String sale_id, @Param("timestamp") LocalDateTime timestamp);
    @Modifying 
    @Transactional 
   @Query(value = """
        INSERT INTO sale_run (sale_run_id,date_closed,date_created,host_user_id,sale_run_status,booth_location,sale_run_name,code_join) VALUES (:sale_run_id, :date_closed, :date_created, :host_user_id, :sale_run_status, :booth_location, :sale_run_name, :code_join);
    """,nativeQuery = true)
    void createSaleRun(@Param("sale_run_id") String sale_run_id,
                       @Param("date_closed") LocalDateTime date_closed,
                       @Param("date_created") LocalDateTime date_created,
                       @Param("host_user_id") String host_user_id,
                       @Param("sale_run_status") boolean sale_run_status,
                       @Param("booth_location") String booth_location,
                       @Param("code_join") String code_join,
                       @Param("sale_run_name") String sale_run_name);
    @Query(value = """
        SELECT sale_run_id FROM sale_run WHERE code_join = :code_join AND sale_run_status = 1
    """, nativeQuery = true)
    String existsByCode_JoinId(@Param("code_join") String code_join);

    @Query (value = """
        SELECT COALESCE(COUNT(sale_run_id),0) AS totalActive FROM sale_run WHERE host_user_id = :host_user_id AND sale_run_status = 1
        """,nativeQuery = true)
        Long getTotalActiveSaleRunByHostId(@Param("host_user_id") String host_user_id);



   
}
