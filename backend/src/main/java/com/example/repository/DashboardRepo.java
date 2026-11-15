package com.example.repository;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.DashboardTotalDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface DashboardRepo extends JpaRepository<UserEntity, String> {




//Total_create:number;
// Total_complete:number;
// Total_active:number;
// Total_item_sold:number;
// Best_revenue:number;
    @Query(value = """
       
SELECT
    COUNT(sr.sale_run_id) AS Total_create,

    COUNT(
        CASE WHEN sr.sale_run_status = FALSE
        THEN 1 END
    ) AS Total_complete,

    COUNT(
        CASE WHEN sr.sale_run_status = TRUE
        THEN 1 END
    ) AS Total_active,

    COALESCE(
        SUM(run_summary.Total_item_sold), 0
    ) AS Total_item_sold,

    COALESCE(
        MAX(run_summary.Total_Revenue), 0
    ) AS Best_revenue

FROM sale_run sr

LEFT JOIN (
    SELECT
        sale_run_id,

        SUM(quantity_sold) AS Total_item_sold,

        SUM(quantity_sold * product_unit_price)
            AS Total_Revenue

    FROM sale_logs
    GROUP BY sale_run_id

) run_summary
    ON sr.sale_run_id = run_summary.sale_run_id

WHERE sr.host_user_id =
    :uid;

    """,nativeQuery = true)
    List<DashboardTotalDTO> findTotalDashboardByUserId(@Param("uid") String uid);

// List_Run:
// {
// Id:number;
// Total_stock:number;
// Total_Items_sold:number;
// Date_create:string;(Date)
// Date_Closed:string;(Date)
// isActive:boolean;
// Gross_sale:number;
// }[];
    @Query(value = """
    SELECT 
        CAST(sr.sale_run_id AS CHAR) AS Id,
        sr.sale_run_name AS Sale_run_name,
        COALESCE(stock_summary.Total_stock, 0) AS Total_stock,
        COALESCE(sales_summary.Total_Items_sold, 0) AS Total_Items_sold,
        CAST(sr.date_created AS DATETIME) AS Date_created,
        CAST(COALESCE(sr.date_closed, sr.date_created) AS DATETIME) AS Date_closed,
        sr.sale_run_status AS isActive,
        CAST(COALESCE(sales_summary.Gross_sale, 0) AS DOUBLE) AS Gross_sale
    FROM sale_run sr
    LEFT JOIN (
        SELECT 
            sup.sales_run_id,
            SUM(p.Start_stock) AS Total_stock
        FROM supplier sup
        JOIN product p ON sup.supplier_id = p.supplier_id
        GROUP BY sup.sales_run_id
    ) stock_summary ON sr.sale_run_id = stock_summary.sales_run_id
    LEFT JOIN (
        SELECT 
            sl.sale_run_id,
            SUM(sl.quantity_sold) AS Total_Items_sold,
            SUM(sl.quantity_sold * sl.product_unit_price) AS Gross_sale
        FROM sale_logs sl
        GROUP BY sl.sale_run_id
    ) sales_summary ON sr.sale_run_id = sales_summary.sale_run_id
    WHERE sr.host_user_id = :uid
    ORDER BY sr.date_created DESC;
    """, nativeQuery = true)
List<List_RunDTO> findDashboardListByUserId(@Param("uid") String uid);
    
   
}
