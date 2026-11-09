package com.example.repository.OnGoing;


import com.example.entity.SaleRunEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface OnGoingListRepo extends JpaRepository<SaleRunEntity, String> {
// String id,
//     Boolean isOwner,
//     String title,
//     Boolean status, 
//     String booth_time_create,
//     String boothtimeEnd,
//     Double grossSales,
//     Double netSales,

//     Integer itemsCleared,
//     Integer itemsClearedMax,
//     Double soldPercentage,
//     Integer boothStaffMax,
//     Integer boothStaffList
// ต้องใช้ OR ด้วย กับ assistant_id = :uid เพราะว่า user ที่เป็น assistant ก็สามารถเข้าถึงได้เหมือนกัน
@Query(value = """
SELECT 
    CAST(sr.sale_run_id AS CHAR) AS id,
    CAST(CASE WHEN sr.host_user_id = :uid THEN 1 ELSE 0 END AS SIGNED) AS isOwner,
    CAST(sr.sale_run_name AS CHAR) AS title,
    CAST(sr.sale_run_status AS SIGNED) AS status,
    DATE_FORMAT(sr.date_created, '%Y-%m-%dT%H:%i:%s') AS booth_time_create,
    DATE_FORMAT(COALESCE(sr.date_closed, sr.date_created), '%Y-%m-%dT%H:%i:%s') AS boothtimeEnd,
    CAST(COALESCE(sl.grossSales, 0) AS DOUBLE) AS grossSales,
    CAST(COALESCE(sl.grossSales, 0) - COALESCE(el.totalExpense, 0) AS DOUBLE) AS netSales,
    CAST(COALESCE(pd.itemCleared, 0) AS SIGNED) AS itemsCleared,
    CAST(COALESCE(pd.itemClearedMax, 0) AS SIGNED) AS itemsClearedMax,
    CAST(COALESCE(pd.soldPercentage, 0) AS DOUBLE) AS soldPercentage,
    5 AS boothStaffMax,
    CAST(COALESCE(ra.boothStaffList, 0) AS SIGNED) AS boothStaffList
FROM `sale_run` sr
LEFT JOIN (
    SELECT sale_run_id, SUM(total_price) AS grossSales 
    FROM sale_logs GROUP BY sale_run_id
) sl ON sl.sale_run_id = sr.sale_run_id
LEFT JOIN (
    SELECT sale_run_id, SUM(amount) AS totalExpense 
    FROM expense_log GROUP BY sale_run_id
) el ON el.sale_run_id = sr.sale_run_id
LEFT JOIN (
    SELECT 
        sp.sales_run_id,
        SUM(GREATEST(COALESCE(p.start_stock, 0) - COALESCE(p.current_stock, 0), 0)) AS itemCleared,
        SUM(COALESCE(p.start_stock, 0)) AS itemClearedMax,
        CASE 
            WHEN SUM(COALESCE(p.start_stock, 0)) > 0 
            THEN (SUM(GREATEST(COALESCE(p.start_stock, 0) - COALESCE(p.current_stock, 0), 0)) / SUM(COALESCE(p.start_stock, 0))) * 100
            ELSE 0 
        END AS soldPercentage
    FROM supplier sp
    JOIN product p ON p.supplier_id = sp.supplier_id
    GROUP BY sp.sales_run_id
) pd ON pd.sales_run_id = sr.sale_run_id
LEFT JOIN (
    SELECT sales_run_id, COUNT(run_assistance_id) AS boothStaffList 
    FROM run_assistance GROUP BY sales_run_id
) ra ON ra.sales_run_id = sr.sale_run_id
WHERE sr.host_user_id = :uid 
   OR EXISTS (
       SELECT 1 FROM run_assistance sub_ra 
       WHERE sub_ra.sales_run_id = sr.sale_run_id AND sub_ra.user_id = :uid
   );
""", nativeQuery = true)
List<OnGoingDTO> findOnGoingListByUserId(@Param("uid") String uid);
}
