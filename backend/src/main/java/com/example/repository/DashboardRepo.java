package com.example.repository;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
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
        SELECT COUNT(sr.Sale_run_id) AS Total_create,COUNT(CASE WHEN sr.Is_active = FALSE THEN 1 END) AS Total_complete,
    COUNT(CASE WHEN sr.Is_active = TRUE THEN 1 END) AS Total_active,
    COALESCE(SUM(sl.quantity), 0) AS Total_item_sold,
    COALESCE(MAX(run_summary.Total_Revenue), 0) AS Best_revenue
    FROM SaleRun sr
    LEFT JOIN Sale_logs sl 
    ON sr.Sale_run_id = sl.Sale_run_id
    LEFT JOIN (
    SELECT 
        Sale_run_id, 
        SUM(quantity * Unit_price) AS Total_Revenue
    FROM Sale_logs
    WHERE User_id = :uid
    GROUP BY Sale_run_id
) run_summary 
    ON sr.Sale_run_id = run_summary.Sale_run_id;
    """,nativeQuery = true)
    List<DashboardDTO> findTotalDashboardByUserId(@Param("uid") String uid);

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
    sr.Sale_run_id AS Id,
    COALESCE(SUM(p.Start_stock), 0) AS Total_stock,
    COALESCE(SUM(sl.quantity), 0) AS Total_Items_sold,

    sr.Date_created,
    sr.Date_closed,
    sr.Is_active,

    COALESCE(SUM(sl.quantity * sl.Unit_price), 0) AS Gross_sale

FROM SaleRun sr WHERE sr.User_id = :uid
LEFT JOIN Supplier sup 
    ON sr.Sale_run_id = sup.Sale_run_id
LEFT JOIN Product p 
    ON sup.Supplier_id = p.Supplier_id
LEFT JOIN Sale_logs sl 
    ON sr.Sale_run_id = sl.Sale_run_id

GROUP BY 
    sr.Sale_run_id, 
    sr.Date_created, 
    sr.Date_closed, 
    sr.Is_active
ORDER BY 
    sr.Date_created DESC;
    """, nativeQuery = true)
    List<List_RunDTO> findDashboardListByUserId(@Param("uid") String uid);
    
   
}
