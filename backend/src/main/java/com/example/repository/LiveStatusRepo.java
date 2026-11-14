package com.example.repository;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleLogsEntity;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import com.example.dto.LiveStatsDTO;
import com.example.dto.SupplierLiveDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import com.example.dto.response.Live.LiveTitleDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LiveStatusRepo extends JpaRepository<SaleLogsEntity, String> {


    // @Query(value = """
    //    Query here
    // """,nativeQuery = true)
    // LiveStatsDTO findLiveStatusBySalesId(@Param("Saleid") String Saleid);
    @Query (value = """
      SELECT sale_logs_id AS Sale_logs_Id,product_name AS Product_name,run_assistant_name AS Assistant_name,sale_run_id AS Sale_run_id,total_price AS Price,quantity_sold AS Quantity,time_stamp AS Time_Stamp,supplier_name AS Supplier_name,product_unit_price AS Unit_price FROM sale_logs WHERE sale_run_id = :sale_id ORDER BY Time_Stamp DESC LIMIT 0,5
      """,nativeQuery = true)
    List<SaleLogsDTO> findSaleLogsBySaleRun_SaleId(@Param("sale_id") String Saleid);
    @Query (value = """
       
SELECT
    s.supplier_id AS Id_supplier,
    s.supplier_name AS Name_supplier,

    COALESCE(sl.gross_sales, 0) AS gross_sales,
    COALESCE(p.total_stock, 0) AS total_stock,
    COALESCE(sl.total_sale, 0) AS total_sale

FROM supplier s

LEFT JOIN (
    SELECT
        sale_run_id,
        supplier_id,
        SUM(total_price) AS gross_sales,
        SUM(quantity_sold) AS total_sale
    FROM sale_logs
    GROUP BY sale_run_id, supplier_id
) sl
    ON sl.sale_run_id = s.sales_run_id
    AND sl.supplier_id = s.supplier_id

LEFT JOIN (
    SELECT
        supplier_id,
        SUM(start_stock) AS total_stock
    FROM product
    GROUP BY supplier_id
) p
    ON p.supplier_id = s.supplier_id

WHERE s.sales_run_id = :sale_id;

    """,nativeQuery = true)
    List<SupplierLiveDTO> findSupplierBySaleRun_SaleId(@Param("sale_id") String Saleid);

   @Query (value = """
      SELECT sale_run_id AS Sale_run_Id,sale_run_name AS Sale_run_Name,date_created AS Date_Created FROM sale_run WHERE sale_run_id = :sale_id
      """,nativeQuery = true)
    LiveTitleDTO findSaleRunBySaleRunId(@Param("sale_id") String Saleid);


    @Query (value = """
SELECT CASE
    WHEN EXISTS (
        SELECT 1
        FROM Sale_Run
        WHERE sale_run_id = :sale_id
          AND sale_run_status = TRUE
    )
    THEN 1
    ELSE 0
END  
""",nativeQuery = true)
   Long isSaleRunActive(@Param("sale_id") String Saleid);
}
