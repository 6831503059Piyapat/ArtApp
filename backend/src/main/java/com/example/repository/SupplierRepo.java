package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.System.SupplierFindDTO;
import com.example.entity.SupplierEntity;
import java.util.List;
@Repository
public interface SupplierRepo extends JpaRepository<SupplierEntity, String> {

   @Query (value = """
       SELECT supplier_id FROM supplier WHERE sales_run_id = :Sale_run_Id
    """,nativeQuery = true)
    List<String> findSupplierBySaleRunId(String Sale_run_Id);

     @Query (value = """
        SELECT COALESCE(SUM(quantity_sold), 0) AS quantity,
               COALESCE(SUM(total_price), 0) AS total_products
        FROM `sale_logs`
        WHERE supplier_id = :Supplier_Id
    """, nativeQuery = true)
    SupplierFindDTO findBySaleRunIdAndProductName(@Param("Supplier_Id") String Sale_run_Id);
}
