package com.example.repository.Salerun;


import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.entity.SaleRunEntity;

import org.springframework.data.jpa.repository.JpaRepository;
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

   



   
}
